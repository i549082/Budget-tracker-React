import styles from './Navbar.module.css'
import { Link } from 'react-router-dom';


function Navbar(){
return(
    <main>
        <header>
            <nav className={styles.navbar}>
                <h1 className={styles.mainText}>Budget Tracker</h1>
                    <ul className={styles.navList}>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/transactions">Transactions</Link></li>
                    </ul>
            </nav>
        </header>
    </main>
)
}

export default Navbar