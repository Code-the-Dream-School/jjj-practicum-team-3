import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome to My Next.js App 🚀</h2>
      <p className={styles.text}>
        Start building by editing <code>src/app/page.tsx</code>.
      </p>
      <p className={styles.text}>
        These styles come from <code>page.module.css</code>.
      </p>
    </div>
  );
}
