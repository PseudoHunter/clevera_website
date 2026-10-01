import { SiteContentPayload } from '../types';

/**
 * Service to synchronize and persist all editable website sections
 * between the React frontend and the Express backend server disk storage.
 * Ensures updates made by the admin are immediately visible to all visitors across servers.
 */

export async function fetchLiveSiteContent(): Promise<SiteContentPayload | null> {
  try {
    const res = await fetch('/api/content', {
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (!res.ok) {
      console.warn(`[siteContentService] Server returned status ${res.status}`);
      return null;
    }

    const data = await res.json();
    if (data && typeof data === 'object') {
      return data as SiteContentPayload;
    }
    return null;
  } catch (error) {
    console.warn('[siteContentService] Network error fetching live site content:', error);
    return null;
  }
}

export async function publishSiteContentToServer(
  payload: SiteContentPayload,
  updatedBy: string = 'Admin (Operations Desk)'
): Promise<{ success: boolean; message: string; timestamp?: string }> {
  try {
    const res = await fetch('/api/content/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: payload,
        updatedBy,
        secret: 'CLEVERA_SECRET_KEY_2026',
      }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      return {
        success: true,
        message: data.message || 'All edits published live to server & visitors!',
        timestamp: data.timestamp || new Date().toISOString(),
      };
    }

    return {
      success: false,
      message: data.error || 'Failed to publish to server.',
    };
  } catch (error: any) {
    console.error('[siteContentService] Publish error:', error);
    return {
      success: false,
      message: error?.message || 'Network error while publishing to live server.',
    };
  }
}

export async function updateSectionOnServer(
  section: string,
  data: any,
  updatedBy: string = 'Admin (Operations Desk)'
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch('/api/content/update-section', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        section,
        data,
        updatedBy,
        secret: 'CLEVERA_SECRET_KEY_2026',
      }),
    });

    const result = await res.json();
    return {
      success: res.ok && result.success,
      message: result.message,
    };
  } catch (error) {
    console.error(`[siteContentService] Error updating section ${section}:`, error);
    return { success: false };
  }
}

export async function resetSectionOnServer(
  section: string = 'all'
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch('/api/content/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        section,
        secret: 'CLEVERA_SECRET_KEY_2026',
      }),
    });

    const result = await res.json();
    return {
      success: res.ok && result.success,
      message: result.message || 'Reset successfully.',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || 'Network error resetting content on server.',
    };
  }
}
