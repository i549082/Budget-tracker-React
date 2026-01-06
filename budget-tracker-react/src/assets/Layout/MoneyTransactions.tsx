import styles from './MoneyTransactions.module.css'
import { useState, useEffect } from "react";
import { createTransaction, deleteTransaction, type CreateTransactionRequest, fetchUserTransactions, type Transactions } from '../../API/MoneyTransactionApi.tsx';
import { decodeToken } from '../../Auth/authUtility.tsx';
import { CSVLink } from 'react-csv';
import { getUserBalance } from '../../API/PersonApi.tsx';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function MoneyTransactions() {

  const user = decodeToken();
  if (!user) return null;

  const userId = user.userId;

  const [transactionType, setTransactionType] = useState<string>('INCOME');
  const [accountType, setAccountType] = useState<string>('BANK');
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>(''); 
  const [successDeleteMessage, setSuccessDeleteMessage] = useState<string>('');
  const [transactionSearch, setTransactionSearch] = useState("");
  const [transactions, setTransactions] = useState<Transactions[]>([])
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterAccount, setFilterAccount] = useState<string>("ALL");
  const [balance, setBalance] = useState<number | null>(null);

  const userHeaders = [
    { label: "ID", key: "id" },
    { label: "Type", key: "transactionType" },
    { label: "Account", key: "accountType" },
    { label: "Amount", key: "amount" },
    { label: "Description", key: "description" },
    { label: "Date", key: "dateCreated" }

  ];

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

  useEffect(() => {
    if (!userId) return;
    fetchUserTransactions(userId).then(setTransactions).catch(() => setErrorMessage("Failed to load transactions"));
    getUserBalance(userId).then(setBalance).catch(() => setErrorMessage("Failed to load balance"));
  }, [userId]);

  
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.id.toString().includes(transactionSearch);

    const matchesType = filterType === "ALL" || transaction.transactionType === filterType;

    const matchesAccount = filterAccount === "ALL" || transaction.accountType === filterAccount;

  return matchesSearch && matchesType && matchesAccount;
});

  const handleSubmit = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    const numericAmount = Number(amount);

    if (!amount || isNaN(numericAmount)) {
      setErrorMessage("Amount is required.");
      return;
    }

    if (numericAmount < 1 || numericAmount > 999999) {
      setErrorMessage("Amount must be between 1 and 999999.");
      return;
    }

    if (description.trim().length < 3) {
      setErrorMessage('Description must be at least 3 characters long.');
      return;
    }

    try {
      const transactionData: CreateTransactionRequest = {
        userId,
        accountType: accountType.toUpperCase(),
        transactionType: transactionType.toUpperCase(),
        description,
        amount: numericAmount,
      };

      const response = await createTransaction(transactionData);

      setSuccessMessage(`Transaction added successfully with ID: ${response.id}`);
      setDescription('');
      setAmount('');
      await fetchUserTransactions(userId).then(setTransactions).catch(() => setErrorMessage("Failed to load transactions"));
    } catch {
      setErrorMessage(`Failed to add transaction`);
    }
  };


  const handleDeleteTransaction = async (transactionId: number) => {
    try {
      await deleteTransaction(transactionId);

      setSuccessDeleteMessage(`Transaction deleted successfully with ID: ${transactionId}`);
      await fetchUserTransactions(userId).then(setTransactions).catch(() => setErrorMessage("Failed to load transactions"));
    } catch {
      setErrorMessage(`Failed to delete transaction`);
    }
  };

  let startingBalance = 0;

  const balancePoints = filteredTransactions.map(transaction => {
    if (transaction.transactionType === "INCOME") startingBalance += transaction.amount;
    if (transaction.transactionType === "EXPENSE") startingBalance -= transaction.amount;
    return startingBalance;
  });


  const chartData = {
  labels: filteredTransactions.map(transaction =>
    `${formatDate(transaction.dateCreated)} (${transaction.transactionType})`
  ),
  datasets: [
    {
      label: "Transaction Amount",
      data: balancePoints,
      borderColor: "#ffffffff",
      backgroundColor: "rgba(75, 181, 67, 0.2)",
      tension: 0.2,
    }
  ]
};


  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Transactions</h1>
      </header>
      <div className={styles.grid}>

        {/* LEFT — FORM */}
        <section className={styles.card}>
          <h3>Add transaction</h3>
          <p className={styles.transactionText}>Account Type</p>
          <select value={accountType} onChange={(e) => setAccountType(e.target.value)} className={styles.dropDown}>
            <option value="BANK">Bank</option>
            <option value="CASH">Cash</option>
          </select>

          <p className={styles.transactionText}>Transaction Type</p>
          <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)} className={styles.dropDown}>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>

          <p className={styles.transactionText}>Amount</p>
          <input
            type="number"
            placeholder="Enter amount"
            min="1"
            max="999999"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.inputFieldTransaction}
          />

          <p className={styles.transactionText}>Description</p>
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textArea}
          />

          <div className={styles.buttonContainer}>
          <button className={styles.addButton} onClick={handleSubmit}>Add Transaction</button>
          </div>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        </section>

        {/* RIGHT — TABLE */}
        <section className={styles.card}>
          <h3>Your Transactions</h3>

          <input
            type="text"
            placeholder="Search by transaction ID..."
            value={transactionSearch}
            onChange={(e) => setTransactionSearch(e.target.value)}
            className={styles.search}
          />
          <div className={styles.filtersRow}>

          <div>
            <label>Type:</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={styles.dropDown}
            >
              <option value="ALL">All</option>
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </div>

          <div>
            <label>Account:</label>
            <select
              value={filterAccount}
              onChange={(e) => setFilterAccount(e.target.value)}
              className={styles.dropDown}
            >
              <option value="ALL">All</option>
              <option value="BANK">Bank</option>
              <option value="CASH">Cash</option>
            </select>
          </div>

        </div>


          <div className={styles.transactionsTableWrap}>
            <div className={styles.transactionsScrollArea}>
              <table className={styles.transactionsTable}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Account</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                    
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{transaction.transactionType}</td>
                      <td>{transaction.accountType}</td>
                      <td>${transaction.amount}</td>
                      <td>{transaction.description}</td>
                      <td>{formatDate(transaction.dateCreated)}</td>
                      <td>
                        <button className={styles.addButton} onClick={() => handleDeleteTransaction(transaction.id)}>
                            Delete
                        </button>
                        
                        </td>
                        
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {filteredTransactions.length > 0 && 
          (
            <CSVLink
              data={filteredTransactions}
              headers={userHeaders}
              filename="user_transactions.csv"
              className={styles.exportButton}
            >
              Export Users CSV
            </CSVLink>
          )}
          {successDeleteMessage && <p className={styles.successMessage}>{successDeleteMessage}</p>}
        </section>
      </div>
      <section className={styles.chartCard}>
        <h3>Transactions Over Time</h3>
          <Line data={chartData} />
           <p className={styles.balanceText}>Current Balance: <span>${balance}</span></p>
      </section>

    </div>
  );
}

export default MoneyTransactions;
