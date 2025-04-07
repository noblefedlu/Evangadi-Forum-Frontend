import React from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
       <div className="picture"> 
        <div className="logo">
          <img src="https://cdn.brandfetch.io/idZ_nRYZnP/w/200/h/28/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B" alt="" />
        </div>
        <div className="footer-icons">
          <FacebookIcon />
          <InstagramIcon />
          <YouTubeIcon />
        </div>
        </div>

        {/* <!-- Useful Links Section --> */}

        <div className="footer-section">
          <h3>Useful Links</h3>
          <ul>
            <li>How it Works</li>
            <li>Terms of Services</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* <!-- Contact Info Section --> */}
        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul>
            <li>Evangadi Networks</li>
            <li>support@evangadi.com</li>
            <li>+1 202-386-2702</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
