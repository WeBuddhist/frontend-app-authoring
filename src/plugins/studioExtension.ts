import { getConfig } from '@edx/frontend-platform';

/**
 * Link to a page of the studio-extension MFE, which hosts several Studio tools and pages.
 * Each tool keeps its pages under its own first path segment, e.g. `course-from-recording/<courseId>`.
 * Returns null when STUDIO_EXTENSION_MFE_URL is not configured, so callers can hide the link.
 */
export const getStudioExtensionUrl = (path: string): string | null => {
  const baseUrl = getConfig().STUDIO_EXTENSION_MFE_URL?.replace(/\/+$/, '');
  return baseUrl ? `${baseUrl}/${path.replace(/^\/+/, '')}` : null;
};
