interface AppEnv {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  githubUrl: string;
  linkedinUrl: string;
  contactEndpoint: string | null;
}

const defaults: Omit<AppEnv, 'contactEndpoint'> = {
  siteName: 'Rohit Kumar Jha',
  contactEmail: 'rohitjha549@gmail.com',
  contactPhone: '+91 87945 64781',
  githubUrl: 'https://github.com/',
  linkedinUrl: 'https://www.linkedin.com/in/rohitkumarjha549/',
};

function readEnvVar(key: keyof ImportMetaEnv, fallback: string): string {
  const value = import.meta.env[key];
  if (typeof value === 'string' && value.trim().length > 0) return value;
  if (import.meta.env.DEV) {
    console.warn(`[env] "${key}" is not set, falling back to default value.`);
  }
  return fallback;
}

function buildEnv(): AppEnv {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
  return {
    siteName: readEnvVar('VITE_SITE_NAME', defaults.siteName),
    contactEmail: readEnvVar('VITE_CONTACT_EMAIL', defaults.contactEmail),
    contactPhone: readEnvVar('VITE_CONTACT_PHONE', defaults.contactPhone),
    githubUrl: readEnvVar('VITE_GITHUB_URL', defaults.githubUrl),
    linkedinUrl: readEnvVar('VITE_LINKEDIN_URL', defaults.linkedinUrl),
    contactEndpoint: endpoint && endpoint.trim().length > 0 ? endpoint : null,
  };
}

export const env: Readonly<AppEnv> = Object.freeze(buildEnv());
