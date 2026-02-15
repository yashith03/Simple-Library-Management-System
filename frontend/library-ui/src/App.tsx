//frontend/library-ui/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import EditBook from './pages/EditBook';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
        <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-sm">
          <div className="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Library System
            </h1>
            <nav className="flex gap-6">
              <Link to="/" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Home</Link>
              <Link to="/add" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Add Book</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<EditBook />} />
              <Route path="/edit/:id" element={<EditBook />} />
            </Routes>
          </div>
        </main>

        <footer className="max-w-5xl mx-auto px-6 py-8 border-t border-slate-900 text-center">
          <p className="text-sm text-slate-500">&copy; 2026 Library Management System </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
