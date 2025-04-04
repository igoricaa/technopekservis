'use client';

import { contactFormAction } from '@/app/kontakt/actions';
import { cn } from '@/lib/utils';
import Script from 'next/script';
import { useActionState, useState } from 'react';
import { Button } from './ui/button';

declare const grecaptcha: any;

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const inputClasses =
  'group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive bg-transparent border-b border-foreground pb-1 px-1 outline-none';
const errorClasses = 'text-destructive text-xs absolute -bottom-5 left-1';
const inputWrapperClasses = 'grid grid-cols-2 gap-7';

export function ContactForm({ className }: { className?: string }) {
  const [captchaToken, setCaptchaToken] = useState('');
  const [state, formAction, pending] = useActionState(contactFormAction, {
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      country: '',
      company: '',
      message: '',
      recaptcha_token: '',
      subject: 'Prodaja',
    },
    success: false,
    errors: null,
  });

  return (
    <>
      <form action={formAction} className={cn(className)}>
        <div className='flex flex-col gap-7'>
          <div className={inputWrapperClasses}>
            <div
              className='group/field grid relative'
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
                <p id='error-name' className={errorClasses}>
                  {state.errors.name}
                </p>
              )}
            </div>
            <div
              className='group/field grid relative'
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
                <p id='error-email' className={errorClasses}>
                  {state.errors.email}
                </p>
              )}
            </div>
          </div>
          <div className={inputWrapperClasses}>
            <div
              className='group/field grid relative'
              data-invalid={!!state.errors?.phone}
            >
              <input
                id='phone'
                name='phone'
                placeholder='Telefon'
                className={inputClasses}
                aria-invalid={!!state.errors?.phone}
                aria-errormessage='error-phone'
                defaultValue={state.defaultValues.phone}
              />
              {state.errors?.phone && (
                <p id='error-phone' className={errorClasses}>
                  {state.errors.phone}
                </p>
              )}
            </div>
            <div
              className='group/field grid relative'
              data-invalid={!!state.errors?.country}
            >
              <input
                id='country'
                name='country'
                placeholder='Država'
                className={inputClasses}
                aria-invalid={!!state.errors?.country}
                aria-errormessage='error-country'
                defaultValue={state.defaultValues.country}
              />
              {state.errors?.country && (
                <p id='error-country' className={errorClasses}>
                  {state.errors.country}
                </p>
              )}
            </div>
          </div>
          <div
            className='group/field grid relative lg:w-[calc(50%-14px)]'
            data-invalid={!!state.errors?.company}
          >
            <input
              id='company'
              name='company'
              placeholder='Ime Firme'
              className={inputClasses}
              aria-invalid={!!state.errors?.company}
              aria-errormessage='error-company'
              defaultValue={state.defaultValues.company}
            />
            {state.errors?.company && (
              <p id='error-company' className={errorClasses}>
                {state.errors.company}
              </p>
            )}
          </div>

          <div
            className='group/field grid relative'
            data-invalid={!!state.errors?.subject}
          >
            <label className=' mb-2'>Zašto nas kontaktirate</label>
            <div className='flex gap-4'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='radio'
                  id='subject'
                  name='subject'
                  value='Prodaja'
                  className='accent-foreground'
                  defaultChecked={state.defaultValues.subject === 'Prodaja'}
                />
                Prodaja
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='radio'
                  name='subject'
                  value='Servis'
                  className='accent-foreground'
                  defaultChecked={state.defaultValues.subject === 'Servis'}
                />
                Servis
              </label>
              <label className='flex items-center gap-2 cursor-pointer text-sm'>
                <input
                  type='radio'
                  name='subject'
                  value='Drugo'
                  className='accent-foreground'
                  defaultChecked={state.defaultValues.subject === 'Drugo'}
                />
                Drugo
              </label>
            </div>
            {state.errors?.subject && (
              <p id='error-subject' className={errorClasses}>
                {state.errors.subject}
              </p>
            )}
          </div>

          <div
            className='group/field grid relative'
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
              <p id='error-message' className={errorClasses}>
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
            {pending ? 'Slanje...' : 'Pošaljite upit'}
          </Button>
          {state.success ? (
            <p className='text-accent'>
              Vaš upit je poslat, hvala vam na interesovanju.
            </p>
          ) : null}
          {state.errors &&
            (state.errors.recaptcha_token || state.errors.custom) && (
              <p className='text-destructive'>
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
