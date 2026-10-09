import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'

const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

let fetchMock

beforeEach(() => {
  fetchMock = vi.fn(async () => json(404, {}))
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

async function openBuilder() {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: 'Start building' }))
  return user
}

const preview = () => screen.getAllByRole('region', { name: 'Preview' })[0]

describe('CV builder', () => {
  it('updates the preview live and omits empty sections', async () => {
    const user = await openBuilder()
    await user.type(screen.getByLabelText(/Full name/), 'Sara Ahmed')
    expect(within(preview()).getByRole('heading', { level: 1, name: 'Sara Ahmed' })).toBeInTheDocument()
    expect(within(preview()).queryByText('Experience')).not.toBeInTheDocument()
    expect(within(preview()).queryByText('Projects')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Add experience' }))
    // An entry without a company or title is still not meaningful.
    expect(within(preview()).queryByText('Experience')).not.toBeInTheDocument()
    await user.type(screen.getByLabelText('Company or organization'), 'Example Tech')
    expect(within(preview()).getByText('Experience')).toBeInTheDocument()
  })

  it('never writes CV data to browser storage or cookies', async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem')
    const cookieSetter = vi.spyOn(document, 'cookie', 'set')
    const user = await openBuilder()
    await user.type(screen.getByLabelText(/Full name/), 'Private Person')
    await user.type(screen.getByLabelText(/Email/), 'private@example.com')
    expect(setItem).not.toHaveBeenCalled()
    expect(cookieSetter).not.toHaveBeenCalled()
    expect(localStorage.length).toBe(0)
    expect(sessionStorage.length).toBe(0)
    // Nothing is sent over the network at all.
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('warns before leaving when there is unsaved content', async () => {
    const addListener = vi.spyOn(window, 'addEventListener')
    const user = await openBuilder()
    expect(addListener.mock.calls.some(([type]) => type === 'beforeunload')).toBe(false)
    await user.type(screen.getByLabelText(/Full name/), 'A')
    expect(addListener.mock.calls.some(([type]) => type === 'beforeunload')).toBe(true)
  })

  it('Clear all data asks for confirmation and resets everything', async () => {
    const user = await openBuilder()
    await user.type(screen.getByLabelText(/Full name/), 'Sara Ahmed')
    await user.type(screen.getByLabelText('Summary'), 'Graduate developer')
    await user.click(screen.getByRole('button', { name: 'Add education' }))

    await user.click(screen.getByRole('button', { name: 'Clear all data' }))
    const dialog = screen.getByRole('dialog', { name: 'Clear all CV data?' })
    await user.click(within(dialog).getByRole('button', { name: 'Clear everything' }))

    expect(screen.getByLabelText(/Full name/)).toHaveValue('')
    expect(screen.getByLabelText('Summary')).toHaveValue('')
    expect(screen.queryByLabelText('Degree or qualification')).not.toBeInTheDocument()
    expect(within(preview()).queryByText('Sara Ahmed')).not.toBeInTheDocument()
  })




  it('offers to copy the other language version', async () => {
    const user = await openBuilder()
    await user.type(screen.getByLabelText(/Full name/), 'Sara Ahmed')
    await user.type(screen.getByLabelText('Summary'), 'Graduate developer')
    const cvGroup = screen.getAllByRole('radiogroup')[1]
    await user.click(within(cvGroup).getByRole('radio', { name: 'العربية' }))
    expect(screen.getByLabelText(/Full name/)).toHaveValue('')
    await user.click(screen.getByRole('button', { name: 'Copy from English' }))
    expect(screen.getByLabelText('Summary')).toHaveValue('Graduate developer')
  })

  it('Download PDF prints the CV locally with a meaningful file name and no network request', async () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => {
      expect(document.title).toBe('Sara_Ahmed_CV_EN')
    })
    const user = await openBuilder()
    await user.click(screen.getAllByRole('button', { name: 'Download PDF' })[0])
    expect(print).not.toHaveBeenCalled() // a full name is required first

    await user.type(screen.getByLabelText(/Full name/), 'Sara Ahmed')
    await user.click(screen.getAllByRole('button', { name: 'Download PDF' })[0])
    expect(print).toHaveBeenCalledTimes(1)
    // The print-only copy of the CV is rendered outside the app root.
    expect(document.querySelector('.print-root .cv-name')).toHaveTextContent('Sara Ahmed')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('blocks printing while fields are invalid', async () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => {})
    const user = await openBuilder()
    await user.type(screen.getByLabelText(/Full name/), 'Sara Ahmed')
    await user.type(screen.getByLabelText(/Email/), 'not-an-email')
    await user.click(screen.getAllByRole('button', { name: 'Download PDF' })[0])
    expect(print).not.toHaveBeenCalled()
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
  })

  it('switches the interface to Arabic independently of the CV language', async () => {
    const user = await openBuilder()
    const [uiGroup] = screen.getAllByRole('radiogroup')
    await user.click(within(uiGroup).getByRole('radio', { name: 'العربية' }))
    expect(document.documentElement.dir).toBe('rtl')
    expect(screen.getByLabelText(/الاسم الكامل/)).toBeInTheDocument()
    const cvGroup = screen.getAllByRole('radiogroup')[1]
    expect(within(cvGroup).getByRole('radio', { name: 'English' })).toHaveAttribute('aria-checked', 'true')
  })
})
