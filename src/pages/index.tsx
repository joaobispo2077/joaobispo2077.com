import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>joaobispo2077</title>
        <meta name="description" content="Crafting software for the web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <a
          className={styles.linkedin}
          href="https://linkedin.com/in/joaobispo2077"
          target="_blank"
          rel="noopener noreferrer"
        >
          @joaobispo2077
        </a>
      </main>
    </div>
  )
}

export default Home
