import styles from './Navbar.module.css'


function Navbar(){
return(
    <main>
        <header className={styles.navbar}>
            <h1 className={styles.text}>Budget Tracker</h1>
        </header>
    </main>
)
}

export default Navbar