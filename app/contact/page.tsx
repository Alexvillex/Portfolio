import styles from './contact.module.css'

export default function Contact() {
  return (
    <main>
      <section className={styles.section}>
        <p className={styles.label}>ME CONTACTER</p>
        <h1 className={styles.titre}>Contact</h1>
        <div className={styles.grid}>

          <div className={styles.infos}>
            <p className={styles.intro}>Une opportunité, un projet, une question ? Je suis disponible et ouvert à toute proposition.</p>
            <div className={styles.liens}>
              <a href="mailto:alexisvilly.work@gmail.com" className={styles.lien}>
                <span className={styles.lienLabel}>Email</span>
                <span className={styles.lienValeur}>alexisvilly.work@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/alexis-villy/" target="_blank" className={styles.lien}>
                <span className={styles.lienLabel}>LinkedIn</span>
                <span className={styles.lienValeur}>/in/alexis-villy</span>
              </a>
              <a href="https://github.com/Alexvillex" target="_blank" className={styles.lien}>
                <span className={styles.lienLabel}>GitHub</span>
                <span className={styles.lienValeur}>Alexvillex</span>
              </a>
              <div className={styles.lien}>
                <span className={styles.lienLabel}>Localisation</span>
                <span className={styles.lienValeur}>Talence, Bordeaux</span>
              </div>
              <div className={styles.lien}>
                <span className={styles.lienLabel}>Disponibilité</span>
                <span className={styles.lienValeur}>Alternance / POEI / CDI</span>
              </div>
            </div>
          </div>

          <form className={styles.form}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Nom</label>
              <input type="text" placeholder="Votre nom" className={styles.input} />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Email</label>
              <input type="email" placeholder="votre@email.com" className={styles.input} />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Message</label>
              <textarea placeholder="Votre message..." className={styles.textarea} rows={6} />
            </div>
            <button type="submit" className={styles.btnSubmit}>Envoyer le message</button>
          </form>

        </div>
      </section>
    </main>
  )
}