export type FormFields = {
  name: string;
  email: string;
  phone: string;
  country: string;
  company: string;
  subject: string;
  message: string;
  recaptcha_token: string;
};

function validateForm(data: FormFields) {
  const errors: Partial<Record<keyof FormFields, string>> = {};

  if (!data.name || data.name.length < 2 || data.name.length > 50) {
    errors.name = 'Ime mora imati između 2 i 50 karaktera';
  }

  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = 'Email adresa nije validna';
  }
  if (!data.phone || !/^\+?[\d\s-]{8,15}$/.test(data.phone)) {
    errors.phone = 'Telefon mora sadržati 8-15 cifara, razmake, + i -';
  }

  if (!data.country || data.country.length < 2 || data.country.length > 50) {
    errors.country = 'Država mora imati između 2 i 50 karaktera';
  }

  if (!data.company || data.company.length < 2 || data.company.length > 50) {
    errors.company = 'Ime firme mora imati između 2 i 50 karaktera';
  }

  if (!data.subject || !['Prodaja', 'Servis', 'Drugo'].includes(data.subject)) {
    errors.subject = 'Molimo odaberite jedno od ponuđenog.';
  }

  if (!data.message || data.message.length < 10 || data.message.length > 1000) {
    errors.message = 'Poruka mora imati između 10 i 1000 karaktera';
  }

  return errors;
}

const verifyRecaptcha = async (token: string) => {
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

  const recaptchaResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${token}`,
    { method: 'POST' }
  );

  const recaptchaData = await recaptchaResponse.json();

  return recaptchaData.success;
};

export async function contactFormAction(
  prevState: any,
  formData: FormData
): Promise<{
  defaultValues: FormFields;
  success: boolean;
  errors: any;
}> {
  const data: FormFields = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    country: formData.get('country') as string,
    company: formData.get('company') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
    recaptcha_token: formData.get('recaptcha_token') as string,
  };

  const errors = validateForm(data);

  if (Object.keys(errors).length > 0) {
    return {
      defaultValues: data,
      success: false,
      errors,
    };
  }

  // const recaptchaSuccess = await verifyRecaptcha(data.recaptcha_token);
  // if (!recaptchaSuccess) {
  //   return {
  //     defaultValues: data,
  //     success: false,
  //     errors: { recaptcha_token: 'Invalid reCAPTCHA' },
  //   };
  // }

  fetch(`/api/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      company: data.company,
      subject: data.subject,
      message: data.message,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      return res.json();
    })
    .then((result) => {
      if (!result.success) {
        return {
          defaultValues: data,
          success: false,
          errors: result.error,
        };
      }

      return {
        defaultValues: {
          name: '',
          email: '',
          phone: '',
          country: '',
          company: '',
          subject: 'Prodaja',
          message: '',
          recaptcha_token: data.recaptcha_token,
        },
        success: true,
        errors: null,
      };
    })
    .catch((error: any) => {
      return {
        defaultValues: data,
        success: false,
        errors: {
          custom: error.message,
        },
      };
    });

  return {
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      country: '',
      company: '',
      subject: 'Prodaja',
      message: '',
      recaptcha_token: data.recaptcha_token,
    },
    success: true,
    errors: null,
  };
}
