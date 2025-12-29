import styles from './MoneyTransactions.module.css'
import { useState } from "react";
import { createTransaction, type CreateTransactionRequest, type CreateTransactionResponse  } from'../../API/MoneyTransactionApi.tsx';
import { decodeToken } from '../../Auth/authUtility.tsx';

function MoneyTransactions(){
    const user = decodeToken();
    if (!user) return;
    const userId = user.userId;

    const [transactionType, setTransactionType] = useState<string>('INCOME');
    const [accountType, setAccountType] = useState<string>('BANK');
    const [amount, setAmount] = useState<string>("");
    const [description, setDescription] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>(''); 

    

    // const handleTransactionAmount = (value : number) => {
    //     if (value < 1) {
    //         setAmount(0);
    //     }
    //     else if (value > 999999) {
    //         return;
    //     }
    //     else {
    //         setAmount(value);
    //     }
    // }

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
            amount: numericAmount, // 👈 convert here
            };

            const response = await createTransaction(transactionData);

            setSuccessMessage(`Transaction added successfully with ID: ${response.id}`);
            setDescription('');
            setAmount('');
        } catch (error) {
            setErrorMessage(`Failed to add transaction`);
        }
    };



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
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                        className={styles.dropDown}
                    >
                        <option value="BANK" className={styles.options}>Bank</option>
                        <option value="CASH" className={styles.options}>Cash</option>
                    </select>

                    <p className={styles.transactionText}>Account Type</p>

                    <select 
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                        className={styles.dropDown}
                    >
                        <option value="INCOME">Income</option>
                        <option value="EXPENSE">Expense</option>
                    </select>

                    <p className={styles.transactionText}>Amount</p>
                    <input 
                        required type="number"
                        placeholder="Enter amount"
                        onChange={(e) => setAmount(e.target.value)}  
                        min="1"  
                        max="999999"
                        value={amount}  
                        className={styles.inputFieldTransaction} />
                    
                    <p className={styles.transactionText}>Description</p>

                    <textarea
                        required
                        placeholder="Enter description"
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.textArea} />

                    <button className={styles.addButton} onClick={handleSubmit}>Add Transaction</button>
                    
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                    {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                </div>
            </section>
        </div>
    )
}
export default MoneyTransactions;