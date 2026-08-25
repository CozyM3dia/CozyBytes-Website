export type ContactFields = {
  name: string
  email: string
  phone: string
  message: string
}

export type ContactFieldErrors = Partial<Record<keyof ContactFields, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[0-9\s\-()]{8,20}$/
const FIELD_ORDER: (keyof ContactFields)[] = ['name', 'email', 'phone', 'message']

/** Client-side rules mirrored from `api/contact.js` so we never POST an invalid form. */
export function validateContact(fields: ContactFields): ContactFieldErrors {
  const errors: ContactFieldErrors = {}
  const name = fields.name.trim()
  const email = fields.email.trim()
  const message = fields.message.trim()
  const phone = fields.phone.trim()

  if (name.length < 2) errors.name = 'Nama minimal 2 karakter'
  else if (name.length > 100) errors.name = 'Nama maksimal 100 karakter'

  if (!EMAIL_RE.test(email)) errors.email = 'Email tidak valid'

  if (message.length < 10) errors.message = 'Pesan minimal 10 karakter'
  else if (message.length > 2000) errors.message = 'Pesan maksimal 2000 karakter'

  if (phone && !PHONE_RE.test(phone)) errors.phone = 'Nomor WhatsApp tidak valid'

  return errors
}

export function hasContactFieldErrors(errors: Record<string, string> | ContactFieldErrors): boolean {
  return FIELD_ORDER.some((key) => Boolean(errors[key]))
}

export function firstInvalidContactField(
  errors: Record<string, string> | ContactFieldErrors,
): keyof ContactFields | undefined {
  return FIELD_ORDER.find((key) => Boolean(errors[key]))
}
