import { env } from '@/config/env';
import { simulateNetwork } from '@/services/network';
import type {
  ContactFormValues,
  ContactSubmissionResult,
} from '@/types/contact';

async function submitViaEndpoint(
  endpoint: string,
  values: ContactFormValues,
): Promise<ContactSubmissionResult> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    return {
      success: false,
      message: 'Something went wrong sending your message. Please try again.',
    };
  }
  return {
    success: true,
    message: 'Thanks — your message is in. I’ll get back to you soon.',
  };
}

async function submitSimulated(): Promise<ContactSubmissionResult> {
  await simulateNetwork(null, 600);
  return {
    success: true,
    message: `Thanks for reaching out — email me directly at ${env.contactEmail} and I’ll reply as soon as I can.`,
  };
}

export const contactService = {
  submit(values: ContactFormValues): Promise<ContactSubmissionResult> {
    if (env.contactEndpoint) {
      return submitViaEndpoint(env.contactEndpoint, values).catch(
        (): ContactSubmissionResult => ({
          success: false,
          message: 'Network error — please try again or email me directly.',
        }),
      );
    }
    return submitSimulated();
  },
};
