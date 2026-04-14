'use client'
import styles from './page.module.css'
import dynamic from 'next/dynamic'

const HeroScene = dynamic(() => import('./components/HeroScene'), { ssr: false })

export default function Home(){
  return(
    <main>
      <HeroScene />
      {/* ========== HERO ========== */}
      <section id="hero" className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.label}>Salut, Moi c&apos;est</p>
          <h1 className={styles.h1}>Alexis Villy</h1>
          <p className={styles.heroTitre}>Développeur Full-Stack</p>
          <p className={styles.accroche}>Basé à Bordeaux, je code en Python, JavaScript, Angular, C#, et bien plus &mdash; du web à l&apos;IA en passant par le mobile et le jeu vidéo.</p>
          <div className={styles.liens}>
            <a href="https://github.com/Alexvillex" target="_blank" className={styles.btnSecondary}>GitHub</a>
            <a href="https://www.linkedin.com/in/alexis-villy/" target="_blank" className={styles.btnSecondary}>LinkedIn</a>
            <a href="mailto:alexisvilly.work@gmail.com" className={styles.btnPrimary}>Me contacter</a>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img src="/NZ6_2709.png" alt="Alexis Villy" />
        </div>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
        <div className={styles.shape3}></div>
        <div className={styles.shape4}></div>
      </section>
      {/* ========== Compétences ========== */}
      <section id="competences" className={styles.section}>
        <p className={styles.label}>CE QUE JE MAÎTRISE</p>
        <h2 className={styles.sectionTitre}>Compétences</h2>
        <div className={styles.tagsGrid}>
          <span className={styles.tag}>Python</span>
          <span className={styles.tag}>JavaScript</span>
          <span className={styles.tag}>TypeScript</span>
          <span className={styles.tag}>Angular</span>
          <span className={styles.tag}>React</span>
          <span className={styles.tag}>C#</span>
          <span className={styles.tag}>PHP</span>
          <span className={styles.tag}>SQL</span>
          <span className={styles.tag}>Docker</span>
          <span className={styles.tag}>Git</span>
          <span className={styles.tag}>Unity</span>
          <span className={styles.tag}>Figma</span>
        </div>
      </section>
      {/* ========== Expériences ========== */}
      
    </main> 
  )
}