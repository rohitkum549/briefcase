import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { contactService } from '@/services/contactService';
import type {
  ContactFormErrors,
  ContactFormValues,
  ContactSubmissionStatus,
} from '@/types/contact';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues: ContactFormValues = { name: '', email: '', message: '' };

function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.';
  }
  return errors;
}

export interface UseContactFormResult {
  values: ContactFormValues;
  errors: ContactFormErrors;
  status: ContactSubmissionStatus;
  handleChange: (field: keyof ContactFormValues, value: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function useContactForm(): UseContactFormResult {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactSubmissionStatus>('idle');

  /*
   * Clear a field's error as soon as it is edited.
   *
   * Validation runs on submit, which is right — nagging while someone is still
   * typing their email is worse. But the error then stayed on screen while they
   * fixed it: "Message should be at least 10 characters." sat under a field they
   * had already typed eighty characters into, until they submitted again.
   */
  const handleChange = useCallback(
    (field: keyof ContactFormValues, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        if (!prev[field]) return prev; // no re-render when nothing was wrong
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const validationErrors = validate(values);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;

      setStatus('submitting');
      contactService
        .submit(values)
        .then((result) => {
          setStatus(result.success ? 'success' : 'error');
          if (result.success) {
            toast.success(result.message);
            setValues(initialValues);
          } else {
            toast.error(result.message);
          }
        })
        .catch(() => {
          setStatus('error');
          toast.error('Something went wrong. Please try again.');
        });
    },
    [values],
  );

  return { values, errors, status, handleChange, handleSubmit };
}
