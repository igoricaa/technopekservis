export const EmailTemplate = (
  name: string,
  email: string,
  phone: string,
  country: string,
  company: string,
  message: string
) => (
  <div>
    <h1>Mejl sa kontakt forme sajta</h1>
    <p>Ime: {name}</p>
    <p>Email: {email}</p>
    <p>Telefon: {phone}</p>
    <p>Država: {country}</p>
    <p>Firma: {company}</p>
    <p>Poruka: {message}</p>
  </div>
);
