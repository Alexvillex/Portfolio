import styles from './projets.module.css'
import projets from '../../data/projets.json'

export default function Projets() {
  return (
    <main>
      <section className={styles.section}>
        <p className={styles.label}>MES RÉALISATIONS</p>
        <h1 className={styles.titre}>Projets</h1>
        <div className={styles.grid}>
          {projets.map((projets) => (
            <div key={projets.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.type}>{projets.categorie}</span>
                <span className={styles.statut}>{projets.statut}</span>
              </div>
              <h2 className={styles.cardTitre}>{projets.titre}</h2>
              <p className={styles.tagline}>{projets.tagline}</p>
              <p className={styles.description}>{projets.description}</p>
              <div className={styles.tags}>
                {projets.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <div className={styles.liens}>
                <a href={projets.github} target="_blank" className={styles.btnGithub}>GitHub</a>
                {projets.demo && (
                  <a href={projets.demo} target="_blank" className={styles.btnDemo}>Demo</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}