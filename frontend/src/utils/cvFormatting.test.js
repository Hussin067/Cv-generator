import { describe, expect, it } from 'vitest'
import fixtures from '../test/cv-view-fixtures.json'
import { emptyCv } from '../data/sectionDefinitions'
import { buildCvView, cvHasContent, formatRange, pdfFileName, splitList } from './cvFormatting'

describe('buildCvView', () => {
  it.each(fixtures.map((f) => [f.name, f]))('matches the expected view model: %s', (_name, fixture) => {
    expect(buildCvView(fixture.cv, fixture.language)).toEqual(fixture.expected)
  })

  it('omits all optional sections for an empty CV', () => {
    const view = buildCvView(emptyCv(), 'en')
    expect(view.sections).toEqual([])
    expect(view.header.contacts).toEqual([])
  })

  it('omits the projects section when there are no titled projects', () => {
    const cv = { ...emptyCv(), projects: [{ id: 'p', title: '  ', type: 'project', description: 'x', work: '', tools: '', outcomes: '', url: '' }] }
    expect(buildCvView(cv, 'en').sections.map((s) => s.key)).not.toContain('projects')
  })

  it('drops invalid links instead of rendering them', () => {
    const cv = { ...emptyCv(), personal: { ...emptyCv().personal, fullName: 'A', portfolio: 'javascript:alert(1)' } }
    expect(buildCvView(cv, 'en').header.contacts).toEqual([])
  })
})

describe('helpers', () => {
  it('builds safe PDF file names, including Arabic names', () => {
    expect(pdfFileName('Sara Ahmed', 'en')).toBe('Sara_Ahmed_CV_EN')
    expect(pdfFileName('سارة أحمد', 'ar')).toBe('سارة_أحمد_CV_AR')
    expect(pdfFileName('../../etc/passwd', 'en')).toBe('etcpasswd_CV_EN')
    expect(pdfFileName('***', 'en')).toBe('CV_EN')
  })

  it('formats Arabic date ranges', () => {
    expect(formatRange('2024-06', '', true, 'ar')).toBe('يونيو 2024 – حتى الآن')
  })

  it('splits lists on Arabic and Latin commas and removes duplicates', () => {
    expect(splitList('Python، python, SQL\nGit')).toEqual(['Python', 'SQL', 'Git'])
  })

  it('detects content but ignores default entry types', () => {
    expect(cvHasContent(emptyCv())).toBe(false)
    expect(cvHasContent({ ...emptyCv(), additional: [{ id: 'x', kind: 'volunteer', title: '', items: '' }] })).toBe(false)
    expect(cvHasContent({ ...emptyCv(), summary: 'Hi' })).toBe(true)
  })
})
