import { Routes, Route, Outlet } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Edit from './pages/edit';
import View from './pages/view';

function AppLayout() {
  return (
    <div id="app">
      <Header />
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />} />
      <Route index element={<Home />} />
      <Route path="edit" element={<Edit />} />
      <Route path="view" element={<View />} />
    </Routes>
  );
}
