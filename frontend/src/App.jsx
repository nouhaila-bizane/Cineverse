import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';

// Pages publiques
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import SeatSelection from './pages/SeatSelection';
import Payment from './pages/Payment';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Releases from './pages/Releases';
import About from './pages/About';
import Rooms from './pages/Rooms';
import Profile from './pages/Profile';

// Pages Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AddMovie from './pages/admin/AddMovie';
import AdminBookings from './pages/admin/AdminBookings';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Le loader s'affiche pendant 2.5 secondes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <Router>
        {/* Loader avec AnimatePresence pour une sortie fluide */}
        <AnimatePresence mode="wait">
          {loading && <Loader />}
        </AnimatePresence>

        {/* Ajout de w-full et overflow-x-hidden pour éviter le scroll horizontal sur mobile */}
        <div className="min-h-screen bg-dark-200 flex flex-col w-full overflow-x-hidden">
          <Navbar />

          <div className="flex-grow w-full">
            <Routes>
              {/* Routes Publiques */}
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/seat-selection/:id" element={<SeatSelection />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/releases" element={<Releases />} />
              <Route path="/about" element={<About />} />
              <Route path="/rooms" element={<Rooms />} />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              {/* Routes Admin (Protégées) */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/add-movie" element={
                <ProtectedRoute adminOnly={true}>
                  <AddMovie />
                </ProtectedRoute>
              } />
              <Route path="/admin/bookings" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminBookings />
                </ProtectedRoute>
              } />
            </Routes>
          </div>

          <Footer />
        </div>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;