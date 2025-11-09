import './App.css'
import { Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing';
import Adlogin from './Pages/Adlogin';
import Admindash from './Admin/Admindash';
import Addoc from './Admin/Addoc';
import Adpatient from './Admin/Adpatient';
import Viewdoc from './Admin/Viewdoc';
import Viewpatient from './Admin/Viewpatient';
import Viewenquiry from './Admin/Viewenquiry';
import Adnews from './Admin/Adnews';
import Viewfeed from './Admin/Viewfeed';
import Viewapp from './Admin/Viewapp';
import Reg from './Pages/Reg';
import Login from './Pages/Login';
import Pdash from './Patient/Pdash';
import Ddash from './Doctor/Ddash';
import Pappointment from './Patient/Pappointment';
import Preqapp from './Patient/Preqapp';
import Dappointment from './Doctor/Dappointment';
import Dconapp from './Doctor/Dconapp';
import Dcanapp from './Doctor/Dcanapp';
import Dcomapp from './Doctor/Dcomapp';
import Pfeed from './Patient/Pfeed';
import Pviewfeed from './Patient/Pviewfeed';

function App() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path='/' element={<Landing />} />

        <Route path='/reg' element={<Reg />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Adlogin />} />

        <Route path='/ddash' element={<Ddash />} />
        <Route path='/penapp' element={<Dappointment />} />
        <Route path='/conapp' element={<Dconapp />} />
        <Route path='/canapp' element={<Dcanapp />} />
        <Route path='/comapp' element={<Dcomapp />} />

        <Route path='/pdash' element={<Pdash />} />
        <Route path='/papp' element={<Pappointment />} />
        <Route path='/pfeed' element={<Pfeed />} />
        <Route path='/pviewfeed' element={<Pviewfeed />} />
        <Route path='/preqapp' element={<Preqapp />} />

        <Route path='/admindash' element={<Admindash />} />
        <Route path='/addoc' element={<Addoc />} />
        <Route path='/adpatient' element={<Adpatient />} />
        <Route path='/viewdoc' element={<Viewdoc />} />
        <Route path='/viewpatient' element={<Viewpatient />} />
        <Route path='/viewapp' element={<Viewapp />} />
        <Route path='/viewenquiry' element={<Viewenquiry />} />
        <Route path='/adnews' element={<Adnews />} />
        <Route path='/viewfeed' element={<Viewfeed />} />
      </Routes>
    </div>
  );
}

export default App;
