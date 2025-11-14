import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './assets/Layout/Navbar.tsx'  
import Dashboard from './assets/Layout/Dashboard.tsx'
import MoneyTransactions from './assets/Layout/MoneyTransactions.tsx'

function App() {
    return (
         <Router>
            <div>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    ?<Route path="/transactions" element={<MoneyTransactions/>} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
