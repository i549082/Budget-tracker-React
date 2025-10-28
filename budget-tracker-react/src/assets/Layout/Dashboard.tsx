import styles from './Dashboard.module.css';

function Dashboard(){
    return(
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Dashboard</h1>
            </header>
            <section className={styles.section}>
                <div className={styles.card}>
                    <h3>Current Balance</h3>
                    <p className={styles.balance}>$0</p>
                </div>
                <div className={styles.card}>
                    <h3>Total Income</h3>
                    <p className={styles.balance}>$0</p>
                </div>
                <div className={styles.card}>
                    <h3>Total Expenses</h3>
                    <p className={styles.balance}>$0</p>
                </div>

                <div className={styles.balanceCards}>
                    <h3>Account summary</h3>
                    <div className={styles.card}>
                    <h3>CASH</h3>
                    <p className={styles.balance}>$0</p>
                    </div>
                    <div className={styles.card}>
                    <h3>BANK</h3>
                    <p className={styles.balance}>$0</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard