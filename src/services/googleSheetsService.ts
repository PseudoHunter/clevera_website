import { TrainingModule } from '../types';
import { TRAINING_MODULES } from '../data/mockData';

export const GOOGLE_APPS_SCRIPT_URL = 
  "https://script.google.com/macros/s/AKfycbyMBsOnsNY0bpL_vSr_UEzZvVSgSxXCHsN9-oTHJa7kNYXj4aUe_EQXqchqHLu0D5JT/exec";
// The secret stays on the server; the proxy injects process.env.secret before forwarding.

/**
 * Maps raw rows returned by Google Sheets into clean, type-safe TrainingModule objects.
 * Merges with rich mock data definitions if module ID matches to preserve syllabus,
 * learning outcomes, and category metadata.
 */
export function mapSheetRowToModule(
  sheetItem: any, 
  fallbackCatalog: TrainingModule[] = TRAINING_MODULES
): TrainingModule {
  if (!sheetItem || typeof sheetItem !== 'object') {
    return fallbackCatalog[0];
  }

  const existing = fallbackCatalog.find(m => m.id === sheetItem.id);

  const parseList = (val: any, fallback: string[]): string[] => {
    if (Array.isArray(val) && val.length > 0) {
      return val.map(String).filter(Boolean);
    }
    if (typeof val === 'string' && val.trim()) {
      const trimmed = val.trim();
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map(String).filter(Boolean);
          }
        } catch {
          // Ignore JSON parse error and fallback to comma split
        }
      }
      return trimmed.split(',').map(s => s.trim()).filter(Boolean);
    }
    return fallback;
  };

  const parseSyllabus = (val: any, fallback: any[]) => {
    if (Array.isArray(val) && val.length > 0) return val;
    if (typeof val === 'string' && val.trim()) {
      try {
        const parsed = JSON.parse(val.trim());
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // Ignore JSON parse error and fallback
      }
    }
    return fallback;
  };

  if (existing) {
    return {
      ...existing,
      title: sheetItem.title ? String(sheetItem.title).trim() : existing.title,
      category: (sheetItem.category || existing.category) as any,
      categoryLabel: sheetItem.categoryLabel || existing.categoryLabel,
      shortDescription: sheetItem.shortDescription || sheetItem.description || existing.shortDescription,
      fullDescription: sheetItem.fullDescription || sheetItem.description || existing.fullDescription,
      duration: sheetItem.duration || existing.duration,
      grantCode: sheetItem.grantCode || sheetItem.price || existing.grantCode,
      image: sheetItem.image || existing.image,
      targetAudience: parseList(sheetItem.targetAudience, existing.targetAudience),
      keyHighlights: parseList(sheetItem.keyHighlights, existing.keyHighlights),
      learningOutcomes: parseList(sheetItem.learningOutcomes, existing.learningOutcomes),
      syllabus: parseSyllabus(sheetItem.syllabus, existing.syllabus),
      trainerSpecialty: sheetItem.trainerSpecialty || existing.trainerSpecialty,
      featured: sheetItem.featured !== undefined && sheetItem.featured !== '' 
        ? Boolean(sheetItem.featured) 
        : existing.featured,
    };
  }

  // Fallback for newly inserted row in Google Sheets
  return {
    id: sheetItem.id || `mod-${Date.now()}`,
    title: sheetItem.title || 'Untitled Module',
    category: (sheetItem.category as any) || 'retail-leadership',
    categoryLabel: sheetItem.categoryLabel || 'Retail Leadership & Operations',
    shortDescription: sheetItem.shortDescription || sheetItem.description || 'Comprehensive corporate training module.',
    fullDescription: sheetItem.fullDescription || sheetItem.description || 'Hands-on HRDC claimable training program designed for Malaysian enterprises.',
    duration: sheetItem.duration || '2 Days (14 Hours)',
    targetAudience: parseList(sheetItem.targetAudience, ['Corporate Teams', 'Department Heads', 'Team Leads']),
    hrdcScheme: sheetItem.hrdcScheme || 'SBL Khas',
    grantCode: sheetItem.grantCode || sheetItem.price || 'HRDC-SBL-GEN-2026',
    keyHighlights: parseList(sheetItem.keyHighlights, [
      '100% HRD Corp Claimable (SBL-Khas Scheme)',
      'Practical Malaysian industry case studies',
      'Immediate workplace implementation toolkit'
    ]),
    syllabus: parseSyllabus(sheetItem.syllabus, [
      {
        day: 'Day 1',
        theme: 'Core Foundations & Diagnostic Assessment',
        modules: ['Module 1: Principles & Frameworks', 'Module 2: Practical Application Workflows']
      },
      {
        day: 'Day 2',
        theme: 'Execution, Case Simulations & Action Plans',
        modules: ['Module 3: Hands-on Scenarios & Simulations', 'Module 4: Institutional Action Roadmap']
      }
    ]),
    learningOutcomes: parseList(sheetItem.learningOutcomes, [
      'Master essential core workplace competencies',
      'Deploy actionable frameworks with measurable ROI'
    ]),
    trainerSpecialty: sheetItem.trainerSpecialty || 'Senior Certified Corporate Trainer',
    featured: Boolean(sheetItem.featured),
    image: sheetItem.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop'
  };
}

/**
 * Fetches live modules array from Google Sheets.
 * Falls back to null if request fails or sheet is empty, allowing caller to use local catalog.
 */
export async function fetchLiveModulesFromGoogleSheets(): Promise<TrainingModule[] | null> {
  const primaryUrl = `${GOOGLE_APPS_SCRIPT_URL}?sheet=Modules`;
  const proxyUrl = '/api/sheets/modules';

  // Try direct fetch first (with 7s timeout)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);
    const res = await fetch(primaryUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(row => mapSheetRowToModule(row));
      }
    }
  } catch (directErr) {
    console.warn('[Google Sheets] Direct fetch notice, trying internal proxy:', directErr);
  }

  // Fallback to internal API proxy (with 5s timeout)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(proxyUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(row => mapSheetRowToModule(row));
      }
    }
  } catch (proxyErr) {
    console.warn('[Google Sheets] Proxy fetch notice:', proxyErr);
  }

  return null;
}

/**
 * Sends POST request to Google Apps Script Web App to publish updated modules array.
 */
export async function publishModulesToGoogleSheetsApi(
  modules: TrainingModule[]
): Promise<{ success: boolean; message: string }> {
  const payload = {
    sheet: 'Modules',
    action: 'updateModules',
    modules: modules.map(m => ({
      id: m.id,
      title: m.title,
      category: m.category,
      categoryLabel: m.categoryLabel,
      description: m.shortDescription || m.fullDescription,
      price: (m as any).price || m.grantCode || '',
      active: m.featured !== undefined ? m.featured : true,
      duration: m.duration,
      grantCode: m.grantCode,
      trainerSpecialty: m.trainerSpecialty,
    }))
  };

  const payloadString = JSON.stringify(payload);

  // 1. Direct POST to Google Apps Script Web App with text/plain to avoid CORS preflight blocking
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
    const directRes = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: payloadString,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (directRes.ok) {
      return { 
        success: true, 
        message: 'All module catalog updates have been published to Google Sheets successfully!' 
      };
    }
  } catch (directErr) {
    console.warn('[Google Sheets] Direct post failed or blocked by browser CORS, attempting server proxy...', directErr);
  }

  // 2. Try server-side proxy
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    const proxyRes = await fetch('/api/sheets/update-modules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payloadString,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (data && (data.status === 'success' || data.success || !data.error)) {
        return { 
          success: true, 
          message: 'All module catalog updates have been published to Google Sheets successfully!' 
        };
      }
    }
  } catch (proxyErr: any) {
    console.error('[Google Sheets] Proxy post failed:', proxyErr);
    return {
      success: false,
      message: proxyErr?.message || 'Network error communicating with Google Sheets Web App.'
    };
  }

  return {
    success: false,
    message: 'Unable to publish modules to Google Sheets. Please check your network connection.'
  };
}
