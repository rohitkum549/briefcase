export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export type ContactSubmissionStatus =
  'idle' | 'submitting' | 'success' | 'error';

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
}
