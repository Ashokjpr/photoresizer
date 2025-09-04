import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function Footer() {
  return (
    <footer className="bg-dark-subtle text-dark py-4 mt-5">
      <div className="container">
        <div className="row">
        
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p>
              PhotoEase is your simple solution for editing images online. Access all the tools you need to enhance your images easily, straight from the web, with 100% security.
            </p>
          </div>

          
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link  className="text-dark text-decoration-none" to="/">Home</Link></li>
              <li><Link  className="text-dark text-decoration-none" to="/resizephoto">Resize image</Link></li>
              <li><Link  className="text-dark text-decoration-none" to="/compressor">Compress image</Link></li>
            </ul>
          </div>

         
          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>
            <a href="#" className="text-light me-3"><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-light me-3"><i className="bi bi-twitter"></i></a>
            <a href="#" className="text-light"><i className="bi bi-instagram"></i></a>
          </div>
        </div>
        <hr className="border-light" />
        <p className="text-center mb-0">&copy; 2025 PhotoEase. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
