import './App.css';
import Navbar from './Components/Navbar';
import Resizephoto from './Components/Resizephoto';
import Compressor from './Components/Compressor';
import Cropimage from './Components/Cropimage';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Watermark from './Components/Watermark';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar/>
      {/* <Cropimage/> */}
      <div className='container my-5'>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resizephoto" element={<Resizephoto />} />
        <Route path="/compressor" element={<Compressor />} />
        <Route path="/cropimage" element={<Cropimage/>} />
        <Route path="/watermark" element={<Watermark/>} />
      </Routes>
     </div>
     <Footer/>
    </>
  );
}

export default App;
