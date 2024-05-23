import { Link } from "react-router-dom";
import React, {  } from 'react';
// import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = ( {openSocialMedia, seeMoreProvideProduct, setSeeMoreProvideProduct, darkMode, setDarkMode} ) => {
    
    return ( 
        <div className="bg-dark footer">
            
            <footer className={darkMode ? "text-center text-lg-start  text-muted" : "text-center text-lg-start text-muted"}>
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block">
                        <span className={darkMode ? "text-light" : "text-light"}>Get connected with us on social networks:</span>
                    </div>
                    
                    <div>
                        <Link to="" className="me-4 text-reset text-decoration-none" onClick={ (e) => openSocialMedia(e, "https://www.instagram.com/sedidia/") } >                            
                            <i className={"icon-linkedin text-light"}></i>
                        </Link>
                        <Link to="" className="me-4 text-reset text-decoration-none" onClick={ (e) => openSocialMedia(e, "https://www.instagram.com/sedidia/") } >                            
                            <i className={"icon-facebook-f text-light"}></i>
                        </Link>
                        <Link to="" className="me-4 text-reset text-decoration-none" onClick={ (e) => openSocialMedia(e, "https://www.instagram.com/sedidia/") } >                            
                            <i className={"icon-google text-light"}></i>
                        </Link>
                        <Link to="" className="me-4 text-reset text-decoration-none" onClick={ (e) => openSocialMedia(e, "https://www.instagram.com/sedidia/") } >                            
                            <i className={"icon-instagram text-light"}></i>
                        </Link>
                        <Link to="" className="me-4 text-reset text-decoration-none" onClick={ (e) => openSocialMedia(e, "https://www.instagram.com/sedidia/") } >                            
                            <i className={"icon-twitter text-light"}></i>
                        </Link>
                        <Link to="" className="me-4 text-reset text-decoration-none" onClick={ (e) => openSocialMedia(e, "https://www.instagram.com/sedidia/") } >                            
                            <i className={"icon-youtube text-light"}></i>
                        </Link>
                        <Link onClick={ (e) => openSocialMedia(e, "https://github.com/sedidia") } to="" className="me-4 text-reset text-decoration-none">                            
                            <i className={"icon-github text-light"}></i>
                        </Link>
                    </div>
                </section>
                
                {/* <section className="">
                    <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4"><i className="fas fa-gem me-3"></i>FERULA FIMBO Sarl</h6>
                            <p>
                                Free for work, Contact us in order to take an appointment for business
                            </p>
                        </div>
                        
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">We Provide</h6>
                            <p><Link to="#!" className="text-reset">trucks</Link></p>
                            <p><Link to="#!" className="text-reset">machines</Link></p>
                            <p><Link to="#!" className="text-reset">supply of fuel to local businesses</Link></p>
                            <p><Link to="#!" className="text-reset">construction of infrastructure</Link></p>
                            <p><Link to="#!" className="text-reset" onClick={() => setSeeMoreProvideProduct(true)}>See more...</Link></p>
                        </div>
                        
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                            <p><Link to="https//:www.iskaf.com" className="text-reset">Visit Iskaf</Link></p>
                            <p><Link to="#!" className="text-reset">The Team</Link></p>
                            <p><Link to="#!" className="text-reset">Help</Link></p>
                        </div>
                        
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                            <p><i className="fas fa-home me-3"></i> Lubumbashi, N 1600, DR Congo</p>
                            <p>
                                <i className="fas fa-envelope me-3"></i>
                                francktwite02@gmail.com
                            </p>
                            <p><i className="fas fa-phone me-3"></i> + 243 974 856 820</p>
                            <p><i className="fas fa-phone me-3"></i> + 243 897 344 821</p>
                        </div>
                    </div>
                    </div>
                </section>                 */}

                <div className={"d-flex justify-content-center align-items-center p-4 text-light"}>                    
                    © 2024 Copyright :
                    <Link className="text-reset fw-bold d-flex justify-content-center align-items-center p-2" to="/"> TTiska.com</Link>
                    {/* by Idris SEDIDIA */}
                </div>
            </footer>

        </div> 
    )
}
  
export default Footer;