import styles from './experiences.module.css'
import experiences from '../../data/experiences.json'

export default function Experiences() {
  return (
    <main>
      <section className={styles.section}>
        <p className={styles.label}>MON PARCOURS</p>
        <h1 className={styles.titre}>Expériences</h1>
        <div className={styles.timeline}>
          {experiences.map((xp) => (
            <div key={xp.id} className={styles.timelineItem}>
              <div className={styles.timelineDate}>{xp.debut} — {xp.fin}</div>
              <div className={styles.timelineContent}>
                <h2>{xp.poste}</h2>
                <p className={styles.company}>{xp.entreprise} · {xp.type}</p>
                {xp.tags && (
                  <div className={styles.tags}>
                    {xp.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                )}
                <ul className={styles.descList}>
                  {xp.description.map((item, index) => (
                    <li key={index}>{item}</li>
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