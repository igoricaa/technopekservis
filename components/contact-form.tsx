'use client';

import { contactFormAction } from '@/app/kontakt/actions';
import { cn } from '@/lib/utils';
import Script from 'next/script';
import { useActionState, useState } from 'react';
import { Button } from './ui/button';

declare const grecaptcha: any;

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const inputClasses =
  'group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive bg-transparent border-b border-foreground pb-2 px-1 outline-none';

export function ContactForm({ className }: { className?: string }) {
  const [captchaToken, setCaptchaToken] = useState('');
  const [state, formAction, pending] = useActionState(contactFormAction, {
    defaultValues: {
      name: '',
      email: '',
      message: '',
      recaptcha_token: '',
    },
    success: false,
    errors: null,
  });

  return (
    <>
      <form action={formAction} className={cn(className)}>
        <div className='flex flex-col gap-6'>
          <div
            className='group/field grid gap-2'
            data-invalid={!!state.errors?.name}
          >
            <input
              id='name'
              name='name'
              placeholder='Ime i prezime'
              className={inputClasses}
              aria-invalid={!!state.errors?.name}
              aria-errormessage='error-name'
              defaultValue={state.defaultValues.name}
            />
            {state.errors?.name && (
              <p id='error-name' className='text-destructive text-sm'>
                {state.errors.name}
              </p>
            )}
          </div>
          <div
            className='group/field grid gap-2'
            data-invalid={!!state.errors?.email}
          >
            <input
              id='email'
              name='email'
              placeholder='Email'
              className={inputClasses}
              aria-invalid={!!state.errors?.email}
              aria-errormessage='error-email'
              defaultValue={state.defaultValues.email}
            />
            {state.errors?.email && (
              <p id='error-email' className='text-destructive text-sm'>
                {state.errors.email}
              </p>
            )}
          </div>
          <div
            className='group/field grid gap-2'
            data-invalid={!!state.errors?.message}
          >
            <textarea
              id='message'
              name='message'
              placeholder='Vaša poruka...'
              rows={5}
              className={`resize-none ${inputClasses}`}
              aria-invalid={!!state.errors?.message}
              aria-errormessage='error-message'
              defaultValue={state.defaultValues.message}
            />
            {state.errors?.message && (
              <p id='error-message' className='text-destructive text-sm'>
                {state.errors.message}
              </p>
            )}
          </div>

          <input
            type='hidden'
            id='recaptcha_token'
            name='recaptcha_token'
            value={captchaToken}
          />
        </div>
        <div className='flex items-center gap-14 mt-10'>
          <Button
            type='submit'
            disabled={pending}
            size='lg'
            variant='secondary'
          >
            {pending ? 'Slanje...' : 'Pošalji poruku'}
          </Button>
          {state.success ? (
            <p className='text-muted-foreground flex items-center gap-2'>
              Vaša poruka je poslata.
            </p>
          ) : null}
          {state.errors &&
            (state.errors.recaptcha_token || state.errors.custom) && (
              <p className='text-destructive flex items-center gap-2'>
                {state.errors.custom ||
                  'Došlo je do greške, molimo pokušajte ponovo.'}
              </p>
            )}
        </div>
      </form>
      <Script
        id='recaptcha-load'
        strategy='lazyOnload'
        src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
        onLoad={() => {
          grecaptcha.ready(function () {
            grecaptcha
              .execute(RECAPTCHA_SITE_KEY, {
                action: 'contact',
              })
              .then(function (token: string) {
                setCaptchaToken(token);
              });
          });
        }}
      />
    </>
  );
}
