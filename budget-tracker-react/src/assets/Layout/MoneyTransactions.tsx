import styles from './MoneyTransactions.module.css'
import { useState, useEffect } from "react";
import { createTransaction, deleteTransaction, type CreateTransactionRequest, fetchUserTransactions, type Transactions } from '../../API/MoneyTransactionApi.tsx';
import { decodeToken } from '../../Auth/authUtility.tsx';

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
  const [transactionSearch, setTransactionSearch] = useState("");
  const [transactions, setTransactions] = useState<Transactions[]>([])

  const filteredTransactions = transactions.filter((t) =>
    t.id.toString().includes(transactionSearch)
  );

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
    fetchUserTransactions(userId)
      .then(setTransactions)
      .catch(() => setErrorMessage("Failed to load transactions"));
  }, [userId]);

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
    } catch {
      setErrorMessage(`Failed to add transaction`);
    }
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
                        <button onClick={() => deleteTransaction(transaction.id)}>
                            Delete
                        </button>
                        </td>
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

export default MoneyTransactions;
