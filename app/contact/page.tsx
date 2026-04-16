// --------------------------- Page Contact ---------------------------
// Formulaire de contact + informations de disponibilité
// Grille 2 colonnes : infos gauche · formulaire droite
// Note : formulaire statique — brancher un service (Resend, Formspree)
// --------------------------------------------------------------------

import styles from './contact.module.css'

// --------------------------- Données statiques ---------------------------

const LIENS_CONTACT = [
  { label: 'Email',        valeur: 'alexisvilly.work@gmail.com',          href: 'mailto:alexisvilly.work@gmail.com' },
  { label: 'LinkedIn',     valeur: '/in/alexis-villy',                    href: 'https://www.linkedin.com/in/alexis-villy/' },
  { label: 'GitHub',       valeur: 'Alexvillex',                          href: 'https://github.com/Alexvillex' },
]

const INFOS_CONTACT = [
  { label: 'Localisation', valeur: 'Talence, Bordeaux' },
  { label: 'Disponibilité', valeur: 'Alternance / POEI / CDI' },
]

// --------------------------- Composant ---------------------------

export default function Contact() {
  return (
    <main>
      <section className={styles.section}>
        <p className={styles.label}>ME CONTACTER</p>
        <h1 className={styles.titre}>Contact</h1>

        <div className={styles.grid}>

          {/* --------------------------- Infos de contact --------------------------- */}
          <div className={styles.infos}>
            <p className={styles.intro}>
              Une opportunité, un projet, une question ? Je suis disponible et ouvert à toute proposition.
            </p>

            <div className={styles.liens}>
              {/* Liens cliquables — email, LinkedIn, GitHub */}
              {LIENS_CONTACT.map(({ label, valeur, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className={styles.lien}
                >
                  <span className={styles.lienLabel}>{label}</span>
                  <span className={styles.lienValeur}>{valeur}</span>
                </a>
              ))}

              {/* Infos statiques — localisation, disponibilité */}
              {INFOS_CONTACT.map(({ label, valeur }) => (
                <div key={label} className={styles.lien}>
                  <span className={styles.lienLabel}>{label}</span>
                  <span className={styles.lienValeur}>{valeur}</span>
                </div>
              ))}
            </div>
          </div>

          {/* --------------------------- Formulaire --------------------------- */}
        <form action="https://formspree.io/f/xgoroeyg" method="POST" className={styles.form}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Nom</label>
              <input type="text" name="nom" placeholder="Votre nom" className={styles.input} required />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Email</label>
              <input type="email" name="email" placeholder="votre@email.com" className={styles.input} required />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Message</label>
              <textarea name="message" placeholder="Votre message..." className={styles.textarea} rows={6} required />
            </div>
            <button type="submit" className={styles.btnSubmit}>
              Envoyer le message
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}