
import styles from "./Home.module.css";


function Home() {


  return (
     <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome to Budget Tracker</h1>

        <p className={styles.subtitle}>
        Track your income and expenses,
        visualize your spending, 
        and stay in control of your finances
        </p>
      </div>
    </div>
  );
}

export default Home;
