
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './Navbar';
import Home from "./pages/home"
import Upload from "./pages/upload"
import Report from "./pages/report"
import { Route, Routes } from "react-router-dom"
import Filter_ID from './pages/filter_id';
import Filter_time from './pages/filter_time';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/report' element={<Report />} />
        <Route path='/filter_id' element={<Filter_ID />} />
        <Route path='/filter_time' element={<Filter_time />} />
      </Routes>
    </>
  )
}

export default App