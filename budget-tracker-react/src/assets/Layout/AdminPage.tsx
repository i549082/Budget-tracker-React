import { useEffect, useState } from "react";
import styles from "./AdminPage.module.css";
import { fetchAllUsers, fetchAllTransactions } from "../../API/AdminApi";

interface UserRow {
  id: number;
  username: string;
  email: string;
  role: string;
}
interface TransactionRow {
  id: number;
  personId: number;
  username: string; 
  email: string;  
  transactionType: string;
  accountType: string;
  description: string;
  amount: number;
  dateCreated: string;
}

  
function AdminPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [transactions, setTransactions] = useState<TransactionRow[]>([]);


  useEffect(() => {
    fetchAllUsers().then(setUsers).catch(console.error);
    fetchAllTransactions().then(setTransactions).catch(console.error);
  }, []);

  function formatDate(dateString?: string) {
  if (!dateString) return "-";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}


  return (
    <div className={styles.admin}>
      <header className={styles.header}>
        <h1>Admin Dashboard</h1>
      </header>

      <div className={styles.grid}>

        {/* USERS TABLE */}
        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Users</h2>

          <div className={styles.tableWrap}>
            <div className={styles.scrollArea}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* TRANSACTIONS TABLE */}
        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Transactions</h2>

          <div className={styles.tableWrap}>
            <div className={styles.scrollArea}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Account</th>
                    <th>Amount</th>
                    <th>Description</th>
                    {/* show this only if backend returns it */}
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id}>
                      <td>{t.id}</td>
                      <td >{t.username}</td>
                      <td>{t.email}</td>
                      <td>{t.transactionType}</td>
                      <td>{t.accountType}</td>
                      <td>${t.amount}</td>
                      <td>{t.description}</td>
                      <td>{formatDate(t.dateCreated)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminPage;
