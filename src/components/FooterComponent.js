import React from "react";
import { Link } from 'react-router-dom';

function Footer(props) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-4">
          
            <p className='footerSignature'>Designed & Developed by <a href="https://daveymason.com">Davey Mason</a>.</p>
            
          <hr />
            <h5>Connect</h5>
            <div class="social-icons">
                    <a class="social-icon hvr-float-shadow" target="_blank" rel="noreferrer"
                        href="https://www.linkedin.com/in/davey-mason/" data-toggle="tooltip" data-placement="top" title="Connect with me!">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a class="social-icon hvr-float-shadow" target="_blank" rel="noreferrer" 
                        href="https://www.github.com/daveymason" data-toggle="tooltip" data-placement="top" title="Check out my code!">
                        <i class="fab fa-github"></i>
                    </a>
                    <a class="social-icon hvr-float-shadow" target="_blank" rel="noreferrer"
                        href="https://daveymason.com/assets/docs/Davey%20Mason%20-%20CV.pdf" data-toggle="tooltip" data-placement="top" title="Download my C.V!">
                        <i class="fas fa-id-card"></i>
                    </a>
                    <a class="social-icon hvr-float-shadow" target="_blank" rel="noreferrer"
                        href="mailto:daveymason@outlook.com" data-toggle="tooltip" data-placement="top" title="E-mail me!"> 
                        <i class="fas fa-envelope"></i></a>
                </div>
          </div>
          <div className="col text-center">
          <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/telescopes">Telescopes</Link>
              </li>
              <li>
                <Link to="/spaceports">Spaceports</Link>
              </li>
              <li>
                <Link to="/rovers">Rovers</Link>
              </li>
              <li>
                <Link to="/contactus">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
