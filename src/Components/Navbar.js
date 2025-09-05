import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import Photoedit from './Photoedit';

function Navbar() {
    let location = useLocation();

    useEffect(() => {
        console.log(location.pathname);
    }, [location]);
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light  bg-dark-subtle">
                <div className="container-fluid">
                    <Link className={`navbar-brand ${location.pathname === "/" ? "active" : ""}`} to="/"><Photoedit/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            
                            <li className="nav-item">
                                <Link className={`navbar-brand ${location.pathname === "/resizephoto" ? "active" : ""}`} to="/resizephoto">Resize image</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`navbar-brand ${location.pathname === "/compressor" ? "active" : ""}`} to="/compressor">Compress image</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`navbar-brand ${location.pathname === "/cropimage" ? "active" : ""}`} to="/cropimage">Crop image</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`navbar-brand ${location.pathname === "/watermark" ? "active" : ""}`} to="/watermark">Watermark image</Link>
                            </li>
                               
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
