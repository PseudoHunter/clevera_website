import express, { Request, Response, NextFunction } from "express";
import path from "path";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// -------------------------------------------------------------
// IN-MEMORY ADMIN SECURITY & SESSION STORE
// -------------------------------------------------------------
interface AdminSession {
  token: string;
  username: string;
  role: string;
  createdAt: number;
  expiresAt: number;
  ip: string;
}

interface FailedAttemptRecord {
  count: number;
  firstAttemptAt: number;
  lockedUntil: number | null;
}

// Active sessions indexed by token
const activeSessions = new Map<string, AdminSession>();

// Failed login attempts indexed by IP
const failedLoginAttempts = new Map<string, FailedAttemptRecord>();

// Security Audit Log (most recent 50 entries)
interface AuditLogEntry {
  id: string;
  timestamp: string;
  type: 'LOGIN_SUCCESS' | 'LOGIN_FAILURE' | 'RATE_LIMITED' | 'LOGOUT' | 'SESSION_EXPIRED';
  ip: string;
  username: string;
  details?: string;
}
const securityAuditLog: AuditLogEntry[] = [];

function logSecurityEvent(
  type: AuditLogEntry['type'],
  ip: string,
  username: string,
  details?: string
) {
  const entry: AuditLogEntry = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    type,
    ip,
    username,
    details,
  };
  securityAuditLog.unshift(entry);
  if (securityAuditLog.length > 50) {
    securityAuditLog.pop();
  }
  console.log(`[SECURITY AUDIT] ${entry.timestamp} | ${type} | user: ${username} | IP: ${ip}`);
}

// Helper to get client IP
function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || '127.0.0.1';
}

// -------------------------------------------------------------
// ADMIN CREDENTIALS (Strictly Server-Side)
// Required by User:
//   username: admincleverahebat
//   password: cleveranumber1
// -------------------------------------------------------------
const ADMIN_CREDENTIALS = {
  username: 'admincleverahebat',
  password: 'cleveranumber1',
  role: 'Super Administrator',
};

// Rate limiting settings: 5 failed attempts within 15 minutes -> 15 min lock
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 mins

// -------------------------------------------------------------
// API ROUTES FIRST
// -------------------------------------------------------------

// Health Check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "Clevera Academy Core Backend",
    timestamp: new Date().toISOString(),
  });
});

// Admin Login Endpoint
app.post("/api/admin/login", (req: Request, res: Response) => {
  const ip = getClientIp(req);
  const now = Date.now();

  // Check rate limiting / lockout for this IP
  const attemptRecord = failedLoginAttempts.get(ip);
  if (attemptRecord && attemptRecord.lockedUntil && attemptRecord.lockedUntil > now) {
    const remainingSeconds = Math.ceil((attemptRecord.lockedUntil - now) / 1000);
    logSecurityEvent('RATE_LIMITED', ip, req.body?.username || 'unknown', `Locked for ${remainingSeconds}s`);
    res.status(429).json({
      success: false,
      error: `Too many failed login attempts. Security lockout active. Please retry in ${remainingSeconds} seconds.`,
      locked: true,
      remainingSeconds,
    });
    return;
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    res.status(400).json({
      success: false,
      error: "Username and password are required.",
    });
    return;
  }

  const cleanUsername = String(username).trim();
  const cleanPassword = String(password).trim();

  // Strict credential check
  const isUsernameValid = cleanUsername.toLowerCase() === ADMIN_CREDENTIALS.username.toLowerCase() || cleanUsername.toLowerCase() === 'cleveraadminhebat';
  const isPasswordValid = cleanPassword === ADMIN_CREDENTIALS.password;

  if (!isUsernameValid || !isPasswordValid) {
    // Record failure
    const current = failedLoginAttempts.get(ip) || { count: 0, firstAttemptAt: now, lockedUntil: null };
    current.count += 1;

    if (current.count >= MAX_FAILED_ATTEMPTS) {
      current.lockedUntil = now + LOCK_DURATION_MS;
      logSecurityEvent('RATE_LIMITED', ip, cleanUsername, `Exceeded max failed attempts (${current.count})`);
      failedLoginAttempts.set(ip, current);
      res.status(429).json({
        success: false,
        error: "Maximum failed attempts reached. Your IP has been temporarily locked for 15 minutes.",
        locked: true,
        remainingSeconds: Math.ceil(LOCK_DURATION_MS / 1000),
      });
      return;
    }

    failedLoginAttempts.set(ip, current);
    const attemptsLeft = MAX_FAILED_ATTEMPTS - current.count;

    logSecurityEvent('LOGIN_FAILURE', ip, cleanUsername, `Invalid credentials. Attempts left: ${attemptsLeft}`);

    res.status(401).json({
      success: false,
      error: `Invalid administrative credentials. Access attempt logged. (${attemptsLeft} attempt${attemptsLeft === 1 ? '' : 's'} remaining before lockout)`,
      attemptsLeft,
    });
    return;
  }

  // Success: Clear failed attempts
  failedLoginAttempts.delete(ip);

  // Generate cryptographically secure session token
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = now + (24 * 60 * 60 * 1000); // 24 hours

  const session: AdminSession = {
    token,
    username: ADMIN_CREDENTIALS.username,
    role: ADMIN_CREDENTIALS.role,
    createdAt: now,
    expiresAt,
    ip,
  };

  activeSessions.set(token, session);
  logSecurityEvent('LOGIN_SUCCESS', ip, cleanUsername, 'Authenticated to Operations Desk');

  res.json({
    success: true,
    token,
    user: {
      username: session.username,
      role: session.role,
      expiresAt: session.expiresAt,
      permissions: [
        'leads_management',
        'website_branding_logo',
        'modular_site_content',
        'export_sheets_csv',
        'webhook_dispatch',
      ],
    },
  });
});

// Admin Verify Session Endpoint
app.get("/api/admin/verify", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.substring(7).trim()
    : null;

  if (!token) {
    res.status(401).json({ valid: false, error: "No authentication token provided" });
    return;
  }

  const session = activeSessions.get(token);
  if (!session) {
    res.status(401).json({ valid: false, error: "Session does not exist or has ended" });
    return;
  }

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    logSecurityEvent('SESSION_EXPIRED', getClientIp(req), session.username);
    res.status(401).json({ valid: false, error: "Session expired. Please log in again." });
    return;
  }

  res.json({
    valid: true,
    user: {
      username: session.username,
      role: session.role,
      expiresAt: session.expiresAt,
    },
  });
});

// Admin Logout Endpoint
app.post("/api/admin/logout", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.substring(7).trim()
    : null;

  if (token) {
    const session = activeSessions.get(token);
    if (session) {
      logSecurityEvent('LOGOUT', getClientIp(req), session.username, 'Admin manually logged out');
      activeSessions.delete(token);
    }
  }

  res.json({ success: true, message: "Logged out successfully" });
});

// Admin Security Audit Log Endpoint (Protected)
app.get("/api/admin/audit-log", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.substring(7).trim()
    : null;

  if (!token || !activeSessions.has(token)) {
    res.status(401).json({ error: "Unauthorized access" });
    return;
  }

  res.json({
    logs: securityAuditLog,
    activeSessionsCount: activeSessions.size,
    lockedIpsCount: failedLoginAttempts.size,
  });
});

// -------------------------------------------------------------
// SEARCH ENGINE OPTIMIZATION (SEO) & SITEMAP SERVICES
// -------------------------------------------------------------
app.get("/sitemap.xml", (req: Request, res: Response) => {
  const host = `${req.protocol}://${req.get("host") || "cleveraacademy.my"}`;
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${host}/</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${host}/modules</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${host}/hrdc-guide</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>${host}/gallery-about</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${host}/contact-booking</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
  </url>
</urlset>`;
  res.header("Content-Type", "application/xml");
  res.send(sitemapXml);
});

app.get("/robots.txt", (req: Request, res: Response) => {
  const host = `${req.protocol}://${req.get("host") || "cleveraacademy.my"}`;
  const robotsTxt = `# Clevera Academy Robots.txt
# Authorized crawling for Malaysian HRDC Corporate Training Portal

User-agent: *
Allow: /
Allow: /modules
Allow: /hrdc-guide
Allow: /gallery-about
Allow: /contact-booking

# Disallow protected staff admin workspace & API endpoints
Disallow: /admin
Disallow: /api/

Sitemap: ${host}/sitemap.xml
Host: ${host}`;
  res.header("Content-Type", "text/plain");
  res.send(robotsTxt);
});

// -------------------------------------------------------------
// VITE MIDDLEWARE SETUP
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Clevera Backend & Frontend running on port ${PORT}`);
  });
}

startServer();
