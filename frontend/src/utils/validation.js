import { normalizeUrl } from './cvFormatting'

const EMAIL = /^[^@\s]{1,64}@[^@\s]+\.[^@\s]{2,}$/

export const isValidEmail = (value) => !value?.trim() || EMAIL.test(value.trim())
// Digits with optional +, spaces, dashes, dots and parentheses; 7–15 digits in total.
export const isValidPhone = (value) => {
  // Arabic-Indic digits (٠-٩) are accepted too.
  const text = (value?.trim() ?? '').replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
  if (!text) return true
  const digits = text.replace(/\D/g, '').length
  return /^\+?[\d\s().-]+$/.test(text) && digits >= 7 && digits <= 15
}
export const isValidUrl = (value) => !value?.trim() || normalizeUrl(value) !== ''
export const isValidDateOrder = (start, end) => !start || !end || start <= end

export const REQUIRED_PERSONAL = ['fullName', 'email', 'phone']

/**
 * Field errors keyed by path (e.g. "personal.email", "experience.<id>.endDate").
 * Values are localization keys so messages follow the interface language.
 */
export function validateCv(cv) {
  const errors = {}
  const { personal } = cv
  // Required header fields. The form shows these only after the user tries to download the PDF.
  for (const key of REQUIRED_PERSONAL) {
    if (!personal[key]?.trim()) errors[`personal.${key}`] = 'requiredField'
  }
  if (!errors['personal.email'] && !isValidEmail(personal.email)) errors['personal.email'] = 'invalidEmail'
  if (!errors['personal.phone'] && !isValidPhone(personal.phone)) errors['personal.phone'] = 'invalidPhone'
  for (const key of ['linkedin', 'github', 'portfolio']) {
    if (!isValidUrl(personal[key])) errors[`personal.${key}`] = 'invalidUrl'
  }
  for (const e of cv.education) {
    if (!isValidDateOrder(e.startDate, e.endDate)) errors[`education.${e.id}.endDate`] = 'invalidDateOrder'
  }
  for (const e of cv.experience) {
    if (!e.current && !isValidDateOrder(e.startDate, e.endDate)) errors[`experience.${e.id}.endDate`] = 'invalidDateOrder'
  }
  for (const c of cv.certifications) {
    if (!isValidUrl(c.url)) errors[`certifications.${c.id}.url`] = 'invalidUrl'
    if (!isValidDateOrder(c.issueDate, c.expiryDate)) errors[`certifications.${c.id}.expiryDate`] = 'invalidDateOrder'
  }
  for (const p of cv.projects) {
    if (!isValidUrl(p.url)) errors[`projects.${p.id}.url`] = 'invalidUrl'
  }
  return errors
}
