import { Outlet } from 'react-router-dom';
import './App.css';
import SideNavbar from './components/SideNavbar';
import Header from './components/Header';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavbar />
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
        <Header />
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
