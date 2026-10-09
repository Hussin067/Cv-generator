/**
 * Builds the render-ready CV view used by the live preview and the printed PDF.
 * Every empty field, entry, and section is omitted.
 */

export const CV_HEADINGS = {
  en: {
    summary: 'Professional Summary',
    education: 'Education',
    experience: 'Experience',
    skills: 'Skills',
    certifications: 'Certifications',
    projects: 'Projects',
    research: 'Research',
    projects_research: 'Projects & Research',
    volunteer: 'Volunteer Experience',
    awards: 'Awards & Achievements',
    publications: 'Publications',
    coursework: 'Relevant Coursework',
    languages: 'Languages',
    present: 'Present',
    expected: 'Expected',
    gpa: 'GPA',
    coursework_label: 'Relevant Coursework',
    technologies: 'Technologies',
    tools: 'Tools',
    methodology: 'Methodology',
    expires: 'Expires',
  },
  ar: {
    summary: 'الملخص المهني',
    education: 'التعليم',
    experience: 'الخبرة العملية',
    skills: 'المهارات',
    certifications: 'الشهادات المهنية',
    projects: 'المشاريع',
    research: 'الأبحاث',
    projects_research: 'المشاريع والأبحاث',
    volunteer: 'الأعمال التطوعية',
    awards: 'الجوائز والإنجازات',
    publications: 'المنشورات',
    coursework: 'المقررات ذات الصلة',
    languages: 'اللغات',
    present: 'حتى الآن',
    expected: 'متوقع',
    gpa: 'المعدل',
    coursework_label: 'المقررات ذات الصلة',
    technologies: 'التقنيات',
    tools: 'الأدوات',
    methodology: 'المنهجية',
    expires: 'تنتهي',
  },
}

const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
}

const t = (lang, key) => CV_HEADINGS[lang][key]
const str = (value) => (typeof value === 'string' ? value.trim() : '')

export const listSeparator = (lang) => (lang === 'ar' ? '، ' : ', ')

export function formatMonth(value, lang) {
  if (!value || !/^\d{4}-\d{2}$/.test(value)) return ''
  const [year, month] = value.split('-')
  return `${MONTHS[lang][Number(month) - 1]} ${year}`
}

export function formatRange(start, end, current, lang) {
  const startText = formatMonth(start, lang)
  const endText = current ? t(lang, 'present') : formatMonth(end, lang)
  if (startText && endText) return `${startText} – ${endText}`
  return startText || endText
}

export function splitLines(text) {
  return (text || '')
    .split('\n')
    .map((line) => line.trim().replace(/^[•\-*–·▪]+/, '').trim())
    .filter(Boolean)
}

export function splitList(text) {
  const seen = new Set()
  const items = []
  for (const raw of (text || '').replaceAll('،', ',').replaceAll('\n', ',').split(',')) {
    const item = raw.trim()
    if (item && !seen.has(item.toLowerCase())) {
      seen.add(item.toLowerCase())
      items.push(item)
    }
  }
  return items
}

/** Adds https:// when missing; returns '' for anything that is not an http(s) URL. */
export function normalizeUrl(value) {
  const text = str(value)
  if (!text) return ''
  const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(text) ? text : `https://${text}`
  try {
    const url = new URL(candidate)
    if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.') || /\s/.test(candidate)) return ''
    return candidate
  } catch {
    return ''
  }
}

export function displayUrl(url) {
  let text = url.includes('://') ? url.split('://').slice(1).join('://') : url
  if (text.startsWith('www.')) text = text.slice(4)
  return text.replace(/\/+$/, '')
}

const join = (parts, sep) => parts.filter(Boolean).join(sep)

function contacts(personal) {
  const items = []
  const email = str(personal.email)
  if (email) items.push({ text: email, href: `mailto:${email}`, ltr: true })
  if (str(personal.phone)) items.push({ text: str(personal.phone), href: null, ltr: true })
  if (str(personal.location)) items.push({ text: str(personal.location), href: null, ltr: false })
  for (const key of ['linkedin', 'github', 'portfolio']) {
    const url = normalizeUrl(personal[key])
    if (url) items.push({ text: displayUrl(url), href: url, ltr: true })
  }
  return items
}

function educationEntries(cv, lang) {
  return cv.education
    .filter((e) => str(e.degree) || str(e.institution) || str(e.major))
    .map((e) => {
      let dates
      if (e.expected && e.endDate) {
        dates = `${t(lang, 'expected')} ${formatMonth(e.endDate, lang)}`
        if (e.startDate) dates = `${formatMonth(e.startDate, lang)} – ${dates}`
      } else {
        dates = formatRange(e.startDate, e.endDate, false, lang)
      }
      const meta = []
      if (str(e.gpa)) meta.push({ label: t(lang, 'gpa'), value: str(e.gpa), ltr: true })
      if (str(e.coursework)) {
        meta.push({ label: t(lang, 'coursework_label'), value: splitList(e.coursework).join(listSeparator(lang)), ltr: false })
      }
      return {
        title: join([str(e.degree), str(e.major)], listSeparator(lang)),
        subtitle: str(e.institution),
        dates,
        location: str(e.location),
        meta,
        description: '',
        bullets: splitLines(e.achievements),
        link: null,
      }
    })
}

function experienceEntries(cv, lang) {
  return cv.experience
    .filter((e) => str(e.company) || str(e.title))
    .map((e) => {
      const meta = []
      if (str(e.technologies)) {
        meta.push({ label: t(lang, 'technologies'), value: splitList(e.technologies).join(listSeparator(lang)), ltr: false })
      }
      return {
        title: str(e.title) || str(e.company),
        subtitle: str(e.title) ? str(e.company) : '',
        dates: formatRange(e.startDate, e.endDate, e.current, lang),
        location: str(e.location),
        meta,
        description: '',
        bullets: splitLines(e.description),
        link: null,
      }
    })
}

function certificationEntries(cv, lang) {
  return cv.certifications
    .filter((c) => str(c.name))
    .map((c) => {
      let dates = formatMonth(c.issueDate, lang)
      if (c.expiryDate) dates = join([dates, `${t(lang, 'expires')} ${formatMonth(c.expiryDate, lang)}`], ' · ')
      const url = normalizeUrl(c.url)
      return {
        title: str(c.name),
        subtitle: str(c.issuer),
        dates,
        location: '',
        meta: [],
        description: '',
        bullets: [],
        link: url ? { href: url, text: displayUrl(url) } : null,
      }
    })
}

function projectSection(cv, lang) {
  const projects = cv.projects.filter((p) => str(p.title))
  const types = new Set(projects.map((p) => p.type))
  let heading = t(lang, 'projects_research')
  if (types.size === 1 && types.has('research')) heading = t(lang, 'research')
  if (types.size === 1 && types.has('project')) heading = t(lang, 'projects')
  const entries = projects.map((p) => {
    const meta = []
    if (str(p.tools)) {
      meta.push({
        label: p.type === 'research' ? t(lang, 'methodology') : t(lang, 'tools'),
        value: splitList(p.tools).join(listSeparator(lang)),
        ltr: false,
      })
    }
    const url = normalizeUrl(p.url)
    return {
      title: str(p.title),
      subtitle: '',
      dates: '',
      location: '',
      meta,
      description: str(p.description),
      bullets: [...splitLines(p.work), ...splitLines(p.outcomes)],
      link: url ? { href: url, text: displayUrl(url) } : null,
    }
  })
  return { heading, entries }
}

export function buildCvView(cv, lang) {
  const sections = []
  if (str(cv.summary)) sections.push({ key: 'summary', heading: t(lang, 'summary'), kind: 'text', text: str(cv.summary) })

  const education = educationEntries(cv, lang)
  if (education.length) sections.push({ key: 'education', heading: t(lang, 'education'), kind: 'entries', entries: education })

  const experience = experienceEntries(cv, lang)
  if (experience.length) sections.push({ key: 'experience', heading: t(lang, 'experience'), kind: 'entries', entries: experience })

  const rows = cv.skills
    .map((s) => ({ label: str(s.category), value: splitList(s.items).join(listSeparator(lang)) }))
    .filter((row) => row.value)
  if (rows.length) sections.push({ key: 'skills', heading: t(lang, 'skills'), kind: 'skills', rows })

  const certifications = certificationEntries(cv, lang)
  if (certifications.length) {
    sections.push({ key: 'certifications', heading: t(lang, 'certifications'), kind: 'entries', entries: certifications })
  }

  const projects = projectSection(cv, lang)
  if (projects.entries.length) sections.push({ key: 'projects', heading: projects.heading, kind: 'entries', entries: projects.entries })

  for (const section of cv.additional) {
    const heading = section.kind === 'custom' ? str(section.title) : t(lang, section.kind)
    if (!heading) continue
    if (section.kind === 'languages' || section.kind === 'coursework') {
      const items = splitList(section.items)
      if (items.length) sections.push({ key: `additional-${section.id}`, heading, kind: 'inline', text: items.join(listSeparator(lang)) })
    } else {
      const items = splitLines(section.items)
      if (items.length) sections.push({ key: `additional-${section.id}`, heading, kind: 'list', items })
    }
  }

  return {
    lang,
    dir: lang === 'ar' ? 'rtl' : 'ltr',
    header: { name: str(cv.personal.fullName), title: str(cv.personal.jobTitle), contacts: contacts(cv.personal) },
    sections,
  }
}

/** "Sara Ahmed" + "en" -> "Sara_Ahmed_CV_EN" (browsers use the page title as the default PDF name). */
export function pdfFileName(fullName, lang) {
  const name = fullName
    .normalize('NFC')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/[\s-]+/g, '_')
    .slice(0, 60)
  return name ? `${name}_CV_${lang.toUpperCase()}` : `CV_${lang.toUpperCase()}`
}

const ENUM_FIELDS = new Set(['id', 'type', 'kind', 'current', 'expected'])

/** True when the CV holds any user-entered text (used for the unsaved-data warning and translate prompt). */
export function cvHasContent(cv) {
  const walk = (value) => {
    if (typeof value === 'string') return value.trim() !== ''
    if (Array.isArray(value)) return value.some(walk)
    if (value && typeof value === 'object') return Object.entries(value).some(([key, v]) => !ENUM_FIELDS.has(key) && walk(v))
    return false
  }
  return walk(cv)
}
