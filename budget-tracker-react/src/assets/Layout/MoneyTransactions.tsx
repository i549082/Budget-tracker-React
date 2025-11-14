import styles from './MoneyTransactions.module.css'
import { useState } from "react";

function MoneyTransactions(){
    const [transactionType, setTransactionType] = useState<string>('');
    const [accountType, setAccountType] = useState<string>('');
    return(
        
        <div className={styles.transactions}>
            <header className={styles.header}>
                <h1>Transactions</h1>
            </header>

            <section>
                <div className={styles.card}>
                    <h3>Add transactions</h3>
                    <p className={styles.transactionText}>Transaction Type</p>
                    <select 
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                        className={styles.dropdown}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>

                    <p className={styles.transactionText}>Account Type</p>

                    <select 
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                        className={styles.dropdown}
                    >
                        <option value="income">Bank</option>
                        <option value="expense">Cash</option>
                    </select>

                    <p className={styles.transactionText}>Description</p>
                </div>
            </section>
        </div>
    )
}
export default MoneyTransactions;