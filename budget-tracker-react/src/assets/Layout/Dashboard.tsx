import styles from './Dashboard.module.css';
import { useEffect, useState } from "react";
import { getUserBalance } from '../../API/PersonApi.tsx';
import { getTotalExpense } from '../../API/PersonApi.tsx';
import { getTotalIncome } from '../../API/PersonApi.tsx';

function Dashboard(){
    const [balance, setBalance] = useState<number | null>(null);
    const [totalExpense, setTotalExpense] = useState<number | null>(null);
    const [totalIncome, setTotalIncome] = useState<number | null>(null);

    useEffect(() => {
        const userId = 1; // dummy user Id
        getUserBalance(userId).then(setBalance).catch(console.error);
        getTotalExpense(userId).then(setTotalExpense).catch(console.error);
        getTotalIncome(userId).then(setTotalIncome).catch(console.error);
    }, []);


    return(
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Dashboard</h1>
            </header>
            
            <section className={styles.section}>
                <div className={styles.card}>
                    <h3>Current Balance</h3>
                    <p className={styles.balance}>${balance}</p>
                </div>
                
                <div className={styles.card}>
                    <h3>Total Income</h3>
                    <p className={styles.balance}>+${totalIncome}</p>
                </div>
                <div className={styles.card}>
                    <h3>Total Expenses</h3>
                    <p className={styles.balance}>-${totalExpense}</p>
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