// --------------------------- Page Expériences ---------------------------
// Affiche le parcours professionnel depuis data/experiences.json
// Layout timeline verticale · Tags + liste de missions par expérience
// ------------------------------------------------------------------------

import styles from './experiences.module.css'
import experiencesData from '../../data/experiences.json'

// --------------------------- Types ---------------------------

interface Experience {
  id:          number
  poste:       string
  entreprise:  string
  type:        string
  debut:       string
  fin:         string
  annee:       number
  tags?:       string[]
  description: string[]
}

// --------------------------- Composant ---------------------------

export default function Experiences() {
  const experiences = experiencesData as Experience[]

  return (
    <main>
      <section className={styles.section}>
        <p className={styles.label}>MON PARCOURS</p>
        <h1 className={styles.titre}>Expériences</h1>

        <div className={styles.timeline}>
          {experiences.map((xp) => (
            <div key={xp.id} className={styles.timelineItem}>

              {/* Date de l'expérience */}
              <div className={styles.timelineDate}>
                {xp.debut} — {xp.fin}
              </div>

              {/* Contenu principal */}
              <div className={styles.timelineContent}>
                <h2>{xp.poste}</h2>
                <p className={styles.company}>{xp.entreprise} · {xp.type}</p>

                {/* Tags optionnels */}
                {xp.tags && (
                  <div className={styles.tags}>
                    {xp.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                )}

                {/* Liste des missions */}
                <ul className={styles.descList}>
                  {xp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </section>
    </main>
  )
}