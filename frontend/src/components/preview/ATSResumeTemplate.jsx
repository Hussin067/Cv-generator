/**
 * The ATS resume document, shared by the live preview and the print-only copy used for the PDF.
 * Contains no editor controls or app UI.
 */

const LtrText = ({ text, ltr }) =>
  ltr ? (
    <span className="cv-ltr" dir="ltr">
      {text}
    </span>
  ) : (
    text
  )

function Entry({ entry }) {
  return (
    <div className="cv-entry">
      <div className="cv-row">
        <span className="cv-entry-title">{entry.title}</span>
        {entry.dates && <span className="cv-entry-date">{entry.dates}</span>}
      </div>
      {(entry.subtitle || entry.location) && (
        <div className="cv-row">
          <span className="cv-entry-subtitle">{entry.subtitle}</span>
          {entry.location && <span className="cv-entry-location">{entry.location}</span>}
        </div>
      )}
      {entry.description && <p className="cv-meta">{entry.description}</p>}
      {entry.meta.map((m) => (
        <p className="cv-meta" key={m.label}>
          <span className="cv-meta-label">{m.label}:</span> <LtrText text={m.value} ltr={m.ltr} />
        </p>
      ))}
      {entry.bullets.length > 0 && (
        <ul className="cv-bullets">
          {entry.bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      )}
      {entry.link && (
        <p className="cv-link">
          <a href={entry.link.href} target="_blank" rel="noopener noreferrer">
            <span className="cv-ltr" dir="ltr">
              {entry.link.text}
            </span>
          </a>
        </p>
      )}
    </div>
  )
}

function Section({ section }) {
  return (
    <section className="cv-section">
      <h2 className="cv-section-title">{section.heading}</h2>
      {section.kind === 'text' && <p className="cv-paragraph">{section.text}</p>}
      {section.kind === 'inline' && <p className="cv-inline-list">{section.text}</p>}
      {section.kind === 'list' && (
        <ul className="cv-bullets">
          {section.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      {section.kind === 'skills' &&
        section.rows.map((row, index) => (
          <p className="cv-skill-row" key={index}>
            {row.label && <span className="cv-meta-label">{row.label}:</span>} {row.value}
          </p>
        ))}
      {section.kind === 'entries' && section.entries.map((entry, index) => <Entry entry={entry} key={index} />)}
    </section>
  )
}

export default function ATSResumeTemplate({ view }) {
  const { header } = view
  return (
    <article className="cv-doc" dir={view.dir} lang={view.lang}>
      <header className="cv-header">
        <h1 className="cv-name">{header.name}</h1>
        {header.title && <p className="cv-title">{header.title}</p>}
        {header.contacts.length > 0 && (
          <p className="cv-contact">
            {header.contacts.map((contact, index) => (
              <span key={index}>
                {index > 0 && (
                  <span className="cv-contact-sep" aria-hidden="true">
                    |
                  </span>
                )}
                <span className="cv-contact-item">
                  {contact.href ? (
                    <a href={contact.href} target="_blank" rel="noopener noreferrer">
                      <LtrText text={contact.text} ltr={contact.ltr} />
                    </a>
                  ) : (
                    <LtrText text={contact.text} ltr={contact.ltr} />
                  )}
                </span>
              </span>
            ))}
          </p>
        )}
      </header>
      {view.sections.map((section) => (
        <Section section={section} key={section.key} />
      ))}
    </article>
  )
}
