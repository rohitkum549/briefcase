import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StickyNote } from '@/components/ui/sticky-note';
import { useContactForm } from '@/hooks/useContactForm';
import { siteConfig } from '@/config/site';

export function Contact() {
  const { values, errors, status, handleChange, handleSubmit } =
    useContactForm();

  return (
    <section
      id="contact"
      className="relative bg-deep py-20 text-on-deep md:py-24"
    >
      <div className="pointer-events-none absolute top-[24%] left-[5%] xl:block">
        <StickyNote tone="amber" tilt={-3.5} className="max-w-[196px]">
          Fastest reply is email. I actually read it.
        </StickyNote>
      </div>
      <div className="mx-auto w-full max-w-3xl px-5 text-center md:px-10">
        <div className="mb-6 flex items-center justify-center gap-2.5">
          <span className="size-2.5 rounded-sm bg-accent-brand" />
          <span className="font-mono text-[11px] font-medium tracking-[2px] text-on-deep/70 uppercase">
            Let&apos;s talk
          </span>
        </div>
        <h2 className="mb-5 font-heading text-[32px] leading-[1.05] font-bold tracking-tight md:text-[52px]">
          Let&apos;s build something worth shipping.
        </h2>
        <p className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-on-deep/82">
          Open to remote roles (US, EU, global) in fintech, payments and
          platform engineering. The fastest way to reach me is email.
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-3.5">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-on-deep px-7 text-deep hover:bg-on-deep/90"
          >
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email} →</a>
          </Button>
        </div>

        <div className="mb-14 flex items-center justify-center font-mono text-[13px] tracking-wider">
          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 rounded-full border border-on-deep/20 bg-on-deep/5 px-4 py-2 text-on-deep transition-all hover:bg-on-deep/15 hover:border-on-deep/40"
          >
            <Phone className="size-4 flex-none" />
            <span>{siteConfig.phone}</span>
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl bg-on-deep/10 p-7 text-left backdrop-blur md:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="contact-name" className="text-on-deep/80">
                Name
              </Label>
              <Input
                id="contact-name"
                value={values.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="mt-1.5 border-on-deep/20 bg-on-deep/10 text-on-deep placeholder:text-on-deep/40"
                placeholder="Ada Lovelace"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? 'contact-name-error' : undefined
                }
                autoComplete="name"
              />
              {errors.name && (
                <p
                  id="contact-name-error"
                  role="alert"
                  className="mt-1.5 text-sm text-red-300"
                >
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="contact-email" className="text-on-deep/80">
                Email
              </Label>
              <Input
                id="contact-email"
                type="email"
                value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="mt-1.5 border-on-deep/20 bg-on-deep/10 text-on-deep placeholder:text-on-deep/40"
                placeholder="ada@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? 'contact-email-error' : undefined
                }
                autoComplete="email"
              />
              {errors.email && (
                <p
                  id="contact-email-error"
                  role="alert"
                  className="mt-1.5 text-sm text-red-300"
                >
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div className="mt-5">
            <Label htmlFor="contact-message" className="text-on-deep/80">
              Message
            </Label>
            <Textarea
              id="contact-message"
              value={values.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className="mt-1.5 min-h-32 border-on-deep/20 bg-on-deep/10 text-on-deep placeholder:text-on-deep/40"
              placeholder="What are you building?"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? 'contact-message-error' : undefined
              }
            />
            {errors.message && (
              <p
                id="contact-message-error"
                role="alert"
                className="mt-1.5 text-sm text-red-300"
              >
                {errors.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={status === 'submitting'}
            className="mt-6 w-full rounded-full bg-on-deep text-deep hover:bg-on-deep/90 disabled:opacity-60 sm:w-auto"
          >
            {status === 'submitting' ? 'Sending…' : 'Send message'}
          </Button>
        </form>
      </div>
    </section>
  );
}
