import styles from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { logout, decodeToken } from '../../Auth/authUtility.tsx';

function Navbar() {
  const navigate = useNavigate();
  const user = decodeToken();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <main>
      <header>
        <nav className={styles.navbar}>
          <h1 className={styles.mainText}>
            <Link to="/">Budget Tracker</Link>
          </h1>

          <ul className={styles.navList}>
            {user && (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/transactions">Transactions</Link></li>

                {user.role === "ADMIN" && (
                  <li><Link to="/admin">Admin</Link></li>
                )}

                <li>
                  <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
                </li>

                <li>
                  <span className={styles.welcomeText}>Welcome, {user.sub}!</span>
                </li>
              </>
            )}

            {!user && (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </main>
  );
}

export default Navbar;
