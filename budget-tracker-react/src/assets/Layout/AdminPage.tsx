import { useEffect, useState } from "react";
import styles from "./AdminPage.module.css";
import { fetchAllUsers, fetchAllTransactions, updateUserRole } from "../../API/AdminApi";
import { decodeToken } from "../../Auth/authUtility.tsx";
import { CSVLink } from "react-csv";


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
  const [userSearch, setUserSearch] = useState("");
  const [transactionSearch, setTransactionSearch] = useState("");

  const currentUser = decodeToken();
  const currentAdminId = currentUser?.userId;

  const userHeaders = [
    { label: "ID", key: "id" },
    { label: "Username", key: "username" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" }
  ];

  const transactionHeaders = [
    { label: "ID", key: "id" },
    { label: "Username", key: "username" },
    { label: "Email", key: "email" },
    { label: "Type", key: "transactionType" },
    { label: "Account", key: "accountType" },
    { label: "Amount", key: "amount" },
    { label: "Description", key: "description" },
    { label: "Date", key: "dateCreated" }
  ];  

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

    const filteredUsers = users.filter((u) =>
      u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.id.toString().includes(userSearch)
    );

    const filteredTransactions = transactions.filter((t) =>
      t.username.toLowerCase().includes(transactionSearch.toLowerCase()) ||
      t.id.toString().includes(transactionSearch)
    );

  return (
    <div className={styles.admin}>
      <header className={styles.header}>
        <h1>Admin Dashboard</h1>
      </header>

      <div className={styles.grid}>

        {/* USERS TABLE */}
        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Users</h2>
          <input
            type="text"
            placeholder="Search by ID or username..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className={styles.search}
          />
             
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
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                      {user.id === currentAdminId ? (
                        <span>{user.role} (You)</span>
                      ) : (
                        <select
                          value={user.role}
                          className={styles.roleSelect}
                          onChange={async (e) => {
                            const newRole = e.target.value as "USER" | "ADMIN";
                            await updateUserRole(user.id, newRole);
                            fetchAllUsers().then(setUsers);
                          }}
                        >
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      )}
                      </td>
                    </tr>
                  ))}
                  
                </tbody>
              </table>
              
            </div>
            
          </div>
          <CSVLink
            data={filteredUsers}
            headers={userHeaders}
            filename="users.csv"
            className={styles.exportButton}
          >
            Export Users CSV
          </CSVLink>
        </section>
        {/* TRANSACTIONS TABLE */}
        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Transactions</h2>
          <input
            type="text"
            placeholder="Search by transaction ID or username..."
            value={transactionSearch}
            onChange={(e) => setTransactionSearch(e.target.value)}
            className={styles.search}
          />
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
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td >{transaction.username}</td>
                      <td>{transaction.email}</td>
                      <td>{transaction.transactionType}</td>
                      <td>{transaction.accountType}</td>
                      <td>${transaction.amount}</td>
                      <td>{transaction.description}</td>
                      <td>{formatDate(transaction.dateCreated)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <CSVLink
            data={filteredTransactions}
            headers={transactionHeaders}
            filename="transactions.csv"
            className={styles.exportButton}
          >
            Export Transactions CSV
          </CSVLink>
        </section>
      </div>
    </div>
  );
}

export default AdminPage;
