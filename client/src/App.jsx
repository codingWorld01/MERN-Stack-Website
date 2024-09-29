import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Contact } from './pages/Contact';
import { Service } from './pages/Service';
import { Navbar } from './components/Navbar';
import { Error } from './pages/Error';
import { Logout } from './pages/Logout';
import { AdminLayout } from './components/layouts/Admin-Layout';
import { AdminUsers } from './pages/AdminUsers';
import { AdminContact } from './pages/AdminContact';
import { AdminServices } from './pages/AdminServices';
import { UpdateUser } from './pages/UpdateUser';
import { UpdateServices } from './pages/UpdateServices';
import { NewService } from './pages/NewService';
import { Footer } from './components/Footer';
import initFontAwesome from "./initFontAwesome";
initFontAwesome();
import '../src/components/Navbar.css'
import { Thanks } from './pages/Thanks';


const AppContent = () => {
  const location = useLocation();

  // Determine if the current route is for admin pages
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Conditionally render the Navbar or AdminLayout based on the current route */}
      {isAdminRoute ? null : <Navbar />}
      <Routes>
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='users' element={<AdminUsers />} />
          <Route path='users/edit/:id' element={<UpdateUser />} />
          <Route path='contact' element={<AdminContact />} />
          <Route path='services' element={<AdminServices />} />
          <Route path='services/edit/:id' element={<UpdateServices />} />
          <Route path='services/add' element={<NewService />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/thanks' element={<Thanks />} />
        <Route path='/service' element={<Service />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
