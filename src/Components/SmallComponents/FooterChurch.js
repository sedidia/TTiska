import { Link } from "react-router-dom";
import React, {  } from 'react';
// import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa';

const FooterChurch = ( {seeMoreProvideProduct, setSeeMoreProvideProduct, darkMode, setDarkMode} ) => {
    
    return ( 
        <div className={darkMode ? "footer mt-4 footerback d-flex justify-content-center text-white":"footer mt-4 footerback d-flex justify-content-center"}>
            <div className="container">
                <div className="pb-4 text-center p-4">
                        <Link to="" className="me-4 text-reset text-decoration-none">                            
                            <i className={"icon-linkedin"}></i>
                        </Link>
                        <Link to="" className="me-4 text-reset text-decoration-none">                            
                            <i className={"icon-facebook-f"}></i>
                        </Link>
                        <Link to="" className="me-4 text-reset text-decoration-none">                            
                                <i className={"icon-google"}></i>
                        </Link>
                        <Link to="" className="me-4 text-reset text-decoration-none">                            
                                <i className={"icon-instagram"}></i>
                        </Link>
                        <Link to="" className="me-4 text-reset text-decoration-none">                            
                                <i className={"icon-twitter"}></i>
                        </Link>
                        <Link to="" className="me-4 text-reset text-decoration-none">                            
                                <i className={"icon-youtube"}></i>
                        </Link>
                </div>

                
                    
                <div className="text-center p-4">                    
                        © 2024 Copyright :
                        <Link className="text-reset fw-bold d-flex justify-content-center align-items-center" to="/"> TTiska.com/</Link>
                        LA SENTINELLE
                </div>
            </div>
        </div> 
    )
}
  
export default FooterChurch;