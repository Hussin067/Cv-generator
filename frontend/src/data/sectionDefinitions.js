/** Factories for empty CV data and entries. All data lives only in React state. */

export const newId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID().replaceAll('-', '').slice(0, 12) : Math.random().toString(36).slice(2, 14)

export const emptyPersonal = () => ({
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  linkedin: '',
  github: '',
  portfolio: '',
})

export const newEducation = () => ({
  id: newId(),
  degree: '',
  major: '',
  institution: '',
  location: '',
  startDate: '',
  endDate: '',
  expected: false,
  gpa: '',
  coursework: '',
  achievements: '',
})

export const newExperience = () => ({
  id: newId(),
  company: '',
  title: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
  technologies: '',
})

export const newSkillCategory = (category = '') => ({ id: newId(), category, items: '' })

export const newCertification = () => ({ id: newId(), name: '', issuer: '', issueDate: '', expiryDate: '', url: '' })

export const newProject = (type = 'project') => ({
  id: newId(),
  title: '',
  type,
  description: '',
  work: '',
  tools: '',
  outcomes: '',
  url: '',
})

export const newAdditionalSection = (kind = 'custom') => ({ id: newId(), kind, title: '', items: '' })

export const emptyCv = () => ({
  personal: emptyPersonal(),
  summary: '',
  education: [],
  experience: [],
  skills: [],
  certifications: [],
  projects: [],
  additional: [],
})

/** Suggested skill category names, in each CV language. Users can also type their own. */
export const SKILL_CATEGORY_PRESETS = {
  en: [
    'Technical Skills',
    'Programming Languages',
    'Frameworks and Libraries',
    'Tools and Technologies',
    'Networking and Cybersecurity',
    'Methods and Methodologies',
    'Soft Skills',
    'Languages',
  ],
  ar: [
    'المهارات التقنية',
    'لغات البرمجة',
    'الأطر والمكتبات',
    'الأدوات والتقنيات',
    'الشبكات والأمن السيبراني',
    'المنهجيات',
    'المهارات الشخصية',
    'اللغات',
  ],
}

export const ADDITIONAL_KINDS = ['volunteer', 'awards', 'publications', 'coursework', 'languages', 'custom']

/** Editor sections, in display order. `key` matches the editor anchor ids. */
export const EDITOR_SECTIONS = ['personal', 'summary', 'education', 'experience', 'skills', 'certifications', 'projects', 'additional']
