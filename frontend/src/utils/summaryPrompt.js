/**
 * Builds a ready-to-copy prompt that asks an AI assistant (e.g. ChatGPT) to write the CV summary.
 * Nothing is sent anywhere by this app: the user copies the prompt and pastes it themselves.
 */

import { listSeparator, splitLines, splitList } from './cvFormatting'

export const SUMMARY_PROMPT_TEMPLATE = `You are a professional CV writer specializing in ATS-friendly resumes in English and Arabic.
Your task is to generate a polished, professional summary for a CV using the user's information.

USER INFORMATION

* Career level: {{career_level}}
* Field or job title: {{field}}
* Education: {{education}}
* Key skills: {{skills}}
* Work experience, internships, or projects: {{experience}}
* Top strengths: {{strengths}}
* Target job or industry: {{target_role}}
* Output language: {{language}}

REQUIRED STRUCTURE
Follow this structure for every generated summary:

1. Professional identity: Introduce the candidate's career level and professional field.
2. Background: Describe their education, specialization, and relevant knowledge.
3. Evidence: Highlight relevant skills, employment, internships, academic projects, or personal projects.
4. Strengths: Emphasize the candidate's most relevant professional strengths.
5. Career objective: Explain how the candidate can contribute to the target role or industry.

WRITING RULES

* Generate the entire summary in the requested language: English or Arabic.
* Keep the same five-part logical structure for every candidate, but adapt the wording naturally to their background.
* Write 3–5 concise sentences, ideally around 60–100 words in English or 60–100 words in Arabic.
* Use professional, clear, confident language suitable for an ATS-friendly CV.
* Naturally incorporate relevant keywords from the target job and the user's actual skills.
* Prioritize relevant qualifications, practical experience, projects, and measurable achievements when provided.
* Adapt to the candidate's career level. For students and fresh graduates, emphasize education, projects, internships, relevant skills, and willingness to develop professionally. For experienced candidates, emphasize relevant experience, expertise, and demonstrated achievements.
* Do not invent qualifications, experience, certifications, achievements, metrics, or skills.
* Do not use generic clichés, excessive adjectives, first-person pronouns, greetings, headings, bullet points, or explanations.
* If information is missing, omit it or use the remaining information naturally. Never display placeholders in the final summary.
* Return only the final professional summary as plain text, ready to paste into a CV.

Generate the summary in: {{language}}.`

/** Career levels: the prompt always receives the English value; the label follows the interface language. */
export const CAREER_LEVELS = ['Student', 'Fresh graduate', 'Entry-level', 'Mid-level', 'Senior']

export const PROMPT_FIELDS = ['career_level', 'field', 'education', 'skills', 'experience', 'strengths', 'target_role', 'language']

const NOT_PROVIDED = 'Not provided'
const clean = (text) => (text || '').replace(/\s+/g, ' ').trim()

/** Pre-fills the prompt fields from what the user already entered in the CV. */
export function promptValuesFromCv(cv, lang) {
  const sep = listSeparator(lang)

  const education = cv.education
    .filter((e) => e.degree.trim() || e.institution.trim() || e.major.trim())
    .map((e) => {
      const degree = [e.degree, e.major].map(clean).filter(Boolean).join(sep)
      const parts = [degree, clean(e.institution)].filter(Boolean).join(' — ')
      return e.gpa.trim() ? `${parts} (GPA ${clean(e.gpa)})` : parts
    })
    .join('; ')

  const skills = [...new Set(cv.skills.flatMap((s) => splitList(s.items)))].join(sep)

  const jobs = cv.experience
    .filter((e) => e.title.trim() || e.company.trim())
    .map((e) => {
      const role = [clean(e.title), clean(e.company)].filter(Boolean).join(' at ')
      const bullets = splitLines(e.description)
      return bullets.length ? `${role}: ${bullets.join('; ')}` : role
    })
  const projects = cv.projects
    .filter((p) => p.title.trim())
    .map((p) => {
      const label = `${p.type === 'research' ? 'Research' : 'Project'} "${clean(p.title)}"`
      const details = [clean(p.description), ...splitLines(p.work), ...splitLines(p.outcomes)].filter(Boolean)
      const tools = splitList(p.tools)
      return [label + (details.length ? `: ${details.join('; ')}` : ''), tools.length ? `tools: ${tools.join(sep)}` : '']
        .filter(Boolean)
        .join(' — ')
    })

  return {
    career_level: '',
    field: clean(cv.personal.jobTitle),
    education,
    skills,
    experience: [...jobs, ...projects].join(' | '),
    strengths: '',
    target_role: clean(cv.personal.jobTitle),
    language: lang === 'ar' ? 'Arabic' : 'English',
  }
}

/** Fills the template. Empty answers become "Not provided" so the AI knows to leave them out. */
export function buildSummaryPrompt(values) {
  return SUMMARY_PROMPT_TEMPLATE.replace(/\{\{(\w+)\}\}/g, (_match, key) => clean(values[key]) || NOT_PROVIDED)
}
