import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import TyF from './pages/TyF';
import TyWP from './pages/TyWP';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ty-f" element={<TyF />} />
          <Route path="/ty-wp" element={<TyWP />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App
