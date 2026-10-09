import { normalizeUrl } from './cvFormatting'

const EMAIL = /^[^@\s]{1,64}@[^@\s]+\.[^@\s]{2,}$/

export const isValidEmail = (value) => !value?.trim() || EMAIL.test(value.trim())
export const isValidUrl = (value) => !value?.trim() || normalizeUrl(value) !== ''
export const isValidDateOrder = (start, end) => !start || !end || start <= end

/**
 * Field errors keyed by path (e.g. "personal.email", "experience.<id>.endDate").
 * Values are localization keys so messages follow the interface language.
 */
export function validateCv(cv) {
  const errors = {}
  const { personal } = cv
  if (!isValidEmail(personal.email)) errors['personal.email'] = 'invalidEmail'
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
