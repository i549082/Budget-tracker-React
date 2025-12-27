import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './assets/Layout/Navbar.tsx'  
import Dashboard from './assets/Layout/Dashboard.tsx'
import MoneyTransactions from './assets/Layout/MoneyTransactions.tsx'
import Register from "./assets/Layout//Register";
import Login from "./assets/Layout//Login";
import AdminPage from "./assets/Layout/AdminPage";
import Home from "./assets/Layout/Home";
import { ProtectedRoute } from "./Auth/ProtectedRoute";
import { AdminRoute } from "./Auth/AdminRoute";

function App() {
    return (
    <Router>
        <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                        <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                            <Dashboard />
                            </ProtectedRoute>
                        }
                        />
                        <Route
                        path="/transactions"
                        element={
                            <ProtectedRoute>
                            <MoneyTransactions />
                            </ProtectedRoute>
                        }
                        />
                        <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                            <AdminPage />
                            </AdminRoute>
                        }
                        />
            </Routes>
    </Router>

    )
}

export default App
