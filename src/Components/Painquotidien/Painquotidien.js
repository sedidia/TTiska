import "../Assets/Css/Church.css";
import { Link } from "react-router-dom";
import FooterChurch from "../SmallComponents/FooterChurch";
import { useState, useEffect } from "react";
import IsLoading from "../SmallComponents/IsLoading";
import Publicity from "../SmallComponents/Publicity";
import urls from "../Config/Config";

const Painquotidien = () => {
    let [historyData, setHistoryData] = useState("Home painquotidien");
    const [darkMode, setDarkMode] = useState(false);
    const [onLoadingPage, setOnLoadingPage] = useState(true);

    useEffect(() => {
        setDarkMode(false);
        setOnLoadingPage(false);

        // dark mode management
        localStorage.getItem("isDarkOn") !== null ? setDarkMode(true) : setDarkMode(false)
    }, []);

    const activeOrNotDarkMode = (e, actDark) => {
        e.preventDefault()
        actDark === "false" ? setDarkMode(false) : setDarkMode(true)
        actDark === "true" ? localStorage.setItem("isDarkOn", "y") : localStorage.removeItem("isDarkOn")
    }

  return (
    <div className={darkMode ? "bg-dark text-light":""}>
        <div className={
                onLoadingPage ? "large_loading active d-flex justify-content-center align-items-center bg-dark" 
                : "large_loading d-flex justify-content-center align-items-center bg-dark"
                }><IsLoading darkMode={darkMode} />
        </div>

        {onLoadingPage ? "":
        <div>
            <div className="headerChurch text-light">
                <div className={darkMode ? "headerHover dark" : "headerHover  text-light"}>
                {/* Navbar */} 
                    <div className={darkMode ? "navigation bg-dark container text-light" : "navigation bg-white container text-dark"}>
                        <div className={"logo tex-light"}>
                            <img src={urls.pain_logo} alt="pain logo" className="logo_pain" />
                        </div>   
                        
                        <div className="d-flex justify-content-center align-items-center">
                            
                            <Link to="/" className={"alert alert-danger text-decoration-none d-flex justify-content-center align-items-center rounded p-2 spaneRight"}>
                                <i className="icon-home2"></i>
                            </Link>


                            {darkMode ?
                            <Link to="/" className="alert alert-danger m-0 text-decoration-none d-flex justify-content-center align-items-center rounded p-1" onClick={(e) => activeOrNotDarkMode(e, "false")}>
                                <i className="icon-wb_sunny"></i>Lightness
                            </Link>
                            :
                            <Link to="/" className={"alert alert-danger m-0 text-decoration-none d-flex justify-content-center align-items-center rounded p-1"} onClick={(e) => activeOrNotDarkMode(e, "true")}>
                                <i className="icon-moon-o"></i>Darkness
                            </Link>
                            }
                            
                        </div>
                    </div> 
                {/* Navbar */}
                    <div className="headerHoverContent d-flex justify-content-center align-items-center p-4">
                        <div className="row container">
                            
                        </div>
                    </div>

                </div>

            </div>


            <img src={urls.pain_logo} alt="pain logo" className="logo_pain2" />
            <h4 className={"pt-4 mt-4"}>||||| Notre mission</h4>
            <div className="container mb-4">
                <p className="d-flex justify-content-center align-items-center mb-4">
                    «« L'évangile pour l'édification de tous »» <br/> Suivez nos contenus sur les reseaux sociaux.
                </p>
            </div>

            <div className="d-flex justify-content-center">                        
                <div className="row pb-4 container">                        
                    <div className="col-md-6 col-lg-4 p-2">                        
                        <div className="p-4 rounded  alert alert-primary">
                            <h4 className="p-4">Share messages with us on our WhatsApp</h4>
                            <p>"Preche la parole, insiste en toute occasion, favorable ou non, reprends, censure, exhorte, avec toutedouceur et en instruisant."</p>
                            <div>
                                <aside className="d-flex justify-content-center align-items-center">
                                    {/* <h4>Voulez-vous discuter avec un groupe des jeunes pour christ ?</h4> */}
                                </aside>
                                <Link to="" className="btn btn-primary text-light me-4  text-decoration-none mt-4">                            
                                        <i className={"icon-whatsapp"}></i>
                                </Link>
                                <Link className="btn btn-outline-primary mp-4 mt-4" to="#">» Join us on whatsapp</Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-6 col-lg-4 p-2">                        
                        <div className="p-4 rounded  alert alert-danger">
                            <h4 className="p-4">Whatch videos we share on our Instagram</h4>
                            <p>"Preche la parole, insiste en toute occasion, favorable ou non, reprends, censure, exhorte, avec toutedouceur et en instruisant."</p>
                            <div>
                                <aside className="d-flex justify-content-center align-items-center">
                                    {/* <h4>Voulez-vous discuter avec un groupe des jeunes pour christ ?</h4> */}
                                </aside>
                                <Link to="" className="btn btn-danger text-light me-4  text-decoration-none mt-4">                            
                                        <i className={"icon-whatsapp"}></i>
                                </Link>
                                <Link className="btn btn-outline-danger mp-4 mt-4" to="#">» Join us on Telegram</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 p-2">                        
                        <div className="p-4 rounded  alert alert-primary">
                            <h4 className="p-4">Whatch videos we share on our Facebook</h4>
                            <p>"Preche la parole, insiste en toute occasion, favorable ou non, reprends, censure, exhorte, avec toutedouceur et en instruisant."</p>
                            <div>
                                <aside className="d-flex justify-content-center align-items-center">
                                    {/* <h4>Voulez-vous discuter avec un groupe des jeunes pour christ ?</h4> */}
                                </aside>
                                <Link to="" className="btn btn-primary text-light me-4  text-decoration-none mt-4">                            
                                        <i className={"icon-whatsapp"}></i>
                                </Link>
                                <Link className="btn btn-outline-primary mp-4 mt-4" to="#">» Join us on Telegram</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 p-2">                        
                        <div className="p-4 rounded  alert alert-primary">
                            <h4 className="p-4">Whatch videos we share on our LinkedIn</h4>
                            <p>"Preche la parole, insiste en toute occasion, favorable ou non, reprends, censure, exhorte, avec toutedouceur et en instruisant."</p>
                            <div>
                                <aside className="d-flex justify-content-center align-items-center">
                                    {/* <h4>Voulez-vous discuter avec un groupe des jeunes pour christ ?</h4> */}
                                </aside>
                                <Link to="" className="btn btn-primary text-light me-4  text-decoration-none mt-4">                            
                                        <i className={"icon-whatsapp"}></i>
                                </Link>
                                <Link className="btn btn-outline-primary mp-4 mt-4" to="#">» Join us on Telegram</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 p-2">                        
                        <div className="p-4 rounded  alert alert-primary">
                            <h4 className="p-4">Whatch videos we share on our Twitter</h4>
                            <p>"Preche la parole, insiste en toute occasion, favorable ou non, reprends, censure, exhorte, avec toutedouceur et en instruisant."</p>
                            <div>
                                <aside className="d-flex justify-content-center align-items-center">
                                    {/* <h4>Voulez-vous discuter avec un groupe des jeunes pour christ ?</h4> */}
                                </aside>
                                <Link to="" className="btn btn-primary text-light me-4  text-decoration-none mt-4">                            
                                        <i className={"icon-whatsapp"}></i>
                                </Link>
                                <Link className="btn btn-outline-primary mp-4 mt-4" to="#">» Join us on Telegram</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 p-2">                        
                        <div className="p-4 rounded  alert alert-danger">
                            <h4 className="p-4">Whatch videos we share on our Youtube</h4>
                            <p>"Preche la parole, insiste en toute occasion, favorable ou non, reprends, censure, exhorte, avec toutedouceur et en instruisant."</p>
                            <div>
                                <aside className="d-flex justify-content-center align-items-center">
                                    {/* <h4>Voulez-vous discuter avec un groupe des jeunes pour christ ?</h4> */}
                                </aside>
                                <Link to="" className="btn btn-danger text-light me-4  text-decoration-none mt-4">                            
                                        <i className={"icon-whatsapp"}></i>
                                </Link>
                                <Link className="btn btn-outline-danger mp-4 mt-4" to="#">» Join us on Telegram</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <h4 className={"pt-4 mt-4 mb-4"}>||||| What do you Need ?</h4>
            <Publicity historyData={historyData} />
            

            <FooterChurch></FooterChurch>
        </div>
        }
    </div>
  );
};

export default Painquotidien;