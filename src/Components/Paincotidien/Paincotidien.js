import "../Assets/Css/Church.css";
import { Link } from "react-router-dom";
import FooterChurch from "../SmallComponents/FooterChurch";
import { useState, useEffect } from "react";
import IsLoading from "../SmallComponents/IsLoading";
import Publicity from "../SmallComponents/Publicity";
import urls from "../Config/Config";

const Paincotidien = () => {
    let [historyData, setHistoryData] = useState("Home paincotidien");
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
                <div className="headerHover alert alert-danger">
                {/* Navbar */}
                    <div className={darkMode ? "navigation bg-dark container text-light" : "navigation bg-white container text-dark"}>
                        <div className={"logo tex-light"}>
                            Pain Cotidien
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
                            <div className="mt-4 col-md-12 col-lg-6 mt-4">
                                <h2 className={"mt-4 pt-4"}>LE PAIN COTIDIEN</h2>
                                <p className="d-flex justify-content-center align-items-center">
                                    Le pain cotidien est toute une communauté des jeunes pour christ. Notre mission est de ramener les ames perdus à Jesus avec come objectif d'heriter les royaume des cieux</p>
                                {/* <Link className="btn btn-outline-danger">Se connecter avec nous</Link> */}
                                <Link to="" className="btn btn-danger me-4  text-decoration-none mt-4">                            
                                        <i className={"icon-telegram"}></i>
                                </Link>
                                <Link className="btn btn-outline-danger mp-4 mt-4" to="#footer">» Let's discuss</Link>
                            </div>
                            <div className="mt-4 col-md-12 col-lg-6">
                                <i className="icon-library_books icon_img text-light"></i>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <h4 className={"pt-4 mt-4"}>||||| The spirit of god</h4>
            <div className="container ">
                <p className="d-flex justify-content-center align-items-center">
                    Let Jesus fill you with his spirit. <br />
                    «« Let you lead by Jesus »»
                </p>
            </div>

            <div className="d-flex justify-content-center">                        
                <div className="row pb-4 container">                        
                    <div className="col-md-6 col-lg-4 mt-4 p-2 mt-4 p-2">                        
                        <div className="border p-4 rounded mt-4  alert alert-primary">
                            <h4 className="p-4">Share messages with us on our WhatsApp Group</h4>
                            <p>Jesus christ is the way, the truth and the life. stay connected with us on our socials natwork.</p>
                            <div>
                                <aside className="d-flex justify-content-center align-items-center">
                                    {/* <h4>Voulez-vous discuter avec un groupe des jeunes pour christ ?</h4> */}
                                </aside>
                                <Link to="" className="btn btn-primary text-light me-4  text-decoration-none mt-4">                            
                                        <i className={"icon-whatsapp"}></i>
                                </Link>
                                <Link className="btn btn-outline-primary mp-4 mt-4" to="#footer">» Join us on whatsapp</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mt-4 p-2 mt-4 p-2">                        
                        <div className="border p-4 rounded alert alert-danger">
                            {/* <h4 className="p-4">Whatch videos about the bible, worship moment on our Telegram Chanel</h4> */}
                            <h4 className="p-4">Stay in the mercy of God following our TikTok posts.</h4>
                            <p>Stay in the mercy of god and improve your relation with him watching our TikTok posts about many subjects.</p>
                            <p>Bible, young for whrist, ...</p>
                            <div>
                                <aside className="d-flex justify-content-center align-items-center">
                                    {/* <h4>Voulez-vous discuter avec un groupe des jeunes pour christ ?</h4> */}
                                </aside>
                                <Link to="" className="btn btn-danger me-4  text-decoration-none mt-4">                            
                                        <i className={"icon-ondemand_video"}></i>
                                </Link>
                                <Link className="btn btn-outline-danger mp-4 mt-4" to="#footer">» Whatch our Videos</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mt-4 p-2 mt-4 p-2">                        
                        <div className="border p-4 rounded mt-4  alert alert-dark">
                            <h4 className="p-4">Whatch videos we share on our Telegram Chanel</h4>
                            <p>Jesus christ is the way, the truth and the life. stay connected with us on our socials natwork.</p>
                            <div>
                                <aside className="d-flex justify-content-center align-items-center">
                                    {/* <h4>Voulez-vous discuter avec un groupe des jeunes pour christ ?</h4> */}
                                </aside>
                                <Link to="" className="btn btn-primary text-light me-4  text-decoration-none mt-4">                            
                                        <i className={"icon-whatsapp"}></i>
                                </Link>
                                <Link className="btn btn-outline-primary mp-4 mt-4" to="#footer">» Join us on Telegram</Link>
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

export default Paincotidien;