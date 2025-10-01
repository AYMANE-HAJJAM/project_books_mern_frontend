import './App.css';
import Home from './pages/home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookDetails from './components/bookDetails.jsx';
import UpdateForm from './components/updateForm.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <div className='min-h-screen relative bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden'>
              <Home />
            </div>
          } />
          <Route path="/books/:bookId" element={<BookDetails />} />
          <Route path="/books/:bookId/update" element={<UpdateForm />} />
          <Route path="*" element={<div className='min-h-screen flex items-center justify-center text-2xl font-semibold text-gray-700'>404 - Page Not Found</div>} />
        </Routes>

      </Router>
    </>
  );
}

export default App;
