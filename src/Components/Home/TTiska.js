import urls from "../Config/Config";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

// import Publicity from "../SmallComponents/Publicity";
import IsLoading from "../SmallComponents/IsLoading";
import Footer from "../SmallComponents/Footer";
import LoginRegister from "../SmallComponents/LoginRegister";
import Home from "../SmallComponents/Home";
import DiscussBox from "../SmallComponents/DiscussBox";
import WhatchAndView from "../SmallComponents/WhatchAndView";
import Cba from "../Cba/Cba";
import TtimeHome from "../Ttime/TtimeHome";
// import WhatchAndView from "../SmallComponents/WhatchAndView";

const TTiska = () => {
    const [isConnected, setIsConnected] = useState(false);

    const [isNavOpened, setIsNavOpened] = useState(false);
    const [chargePage, setChargerPage] = useState(true);
    const [iGoToLogin, setIGoToLogin] = useState(false);
    const [isSearchOpened, setIsSearchOpened] = useState(false);
    const [blockedFonctionalities, setBlockedFonctionalities] = useState(false);
    
    const [darkMode, setDarkMode] = useState(false);
    const [activeContent, setActiveContent] = useState("Ttime");
    const [accountType, setAccountType] = useState("none");

    const [openWatch, setOpenWatch] = useState(false);
    const [videoKing, setVideoKing] = useState(null);
    const [isVideoOrNot, setIsVideoOrNot] = useState(false);
    const [notVideo, setNotVideo] = useState(null);
    const [goBooking, setGoBooking]= useState(false)
    
    useEffect(() => {
        setBlockedFonctionalities(true);

        setIsConnected(true);
        setAccountType("university") // none, normal, university, appariteur, enseignant, etudiant

        setChargerPage(false);
        setDarkMode(false);

        // dark mode management
        localStorage.getItem("isDarkOn") !== null ? setDarkMode(true) : setDarkMode(false)
    }, []);

    const handleWatchVideo = (message, isVideo, isWatchOn, videoKind) => {
        setOpenWatch(isWatchOn)
        setVideoKing(videoKind)

        setIsVideoOrNot(isVideo)
        setNotVideo(message)
        console.log("salut les gens !"+videoKind);
    }
    const handleCloseNavHomeOrWatchVideo = () => {
        setIsNavOpened(false)
        setOpenWatch(false)

    }

    const openNavHome = () => {
        setIsNavOpened(true);
        setIGoToLogin(false);
    }

    const goingToSignIn = () => {
        setIGoToLogin(true);
        setIsNavOpened(true);
    }

    const activeOrNotDarkMode = (actDark) => {
        actDark === "false" ? setDarkMode(false) : setDarkMode(true)
        actDark === "true" ? localStorage.setItem("isDarkOn", "y") : localStorage.removeItem("isDarkOn")
    }

    const hangeMoveContentPage = (data) => {
        setActiveContent(data)
    }

    return ( 
        <div className={darkMode ? "bg-dark" : "bg-light"}>
            <div className={isNavOpened && darkMode ? "navHome active bg-dark"
                : isNavOpened && !darkMode ? "navHome active bg-white"
                : !isNavOpened && darkMode ? "navHome bg-dark"
                : "navHome bg-white"}>

                {isConnected && !iGoToLogin ?
                <div className="profilsLinks">
                    <div className="profil d-flex justify-content-start align-items-center">
                        <div className="avatar">
                            <img src={urls.ines} alt="avatar" />
                        </div>
                        <div className="texts p-2">
                            <div className={darkMode ? "text-light" : "text-dark"}>@Inès_TTiska</div>
                            <span className={darkMode ? "text-light" : "text-dark"}>Since 2024</span>
                        </div>
                    </div>
                    <div className="mylinks">
                        <Link className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} to="">acces my profil</Link>
                        <Link className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} to="#" onClick={() => setIsNavOpened(false)}>Fermer</Link>
                        
                        {/* <Link className="myLink text-decoration-none" to="">See bookings</Link>
                        <Link className="myLink text-decoration-none" to="">see my previous reservations</Link>
                        <Link className="myLink text-decoration-none" to="">see my bonuses</Link>
                        <Link className="myLink text-decoration-none" to="">see ticket options</Link>
                        <Link className="myLink text-decoration-none" to="">transport of goods</Link>
                        <Link className="myLink text-decoration-none" to="">rent a vehicle</Link>
                        <Link className="myLink text-decoration-none" to="">Discuss a deal with us</Link> */}
                    
                    </div>
                </div>
                : !isConnected && !iGoToLogin ?
                <div className="p-2 text-center">
                    <p className="icon_not_connected">🥰</p>
                    <p className={darkMode ? "text-light" : "text-dark"}>You're not connected, be sure to connect to see more features.</p>
                    <div className={darkMode ? "bg-light search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-0 m-0" : "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-0 m-0"} onClick={goingToSignIn}>
                        <div className="text-dark">Sign-in</div>
                    </div>
                </div>
                : 
                <LoginRegister darkMode={darkMode} />
                }
            </div>
            
            <div className={isNavOpened || openWatch ? "closeNavHome active" : "closeNavHome"} onClick={ () => handleCloseNavHomeOrWatchVideo() }>
            </div>

            <div className={
                darkMode && goBooking ? "room active bg-dark pt-4" :
                darkMode && !goBooking ? "room bg-dark pt-4" :
                !darkMode && goBooking ? "room active bg-light pt-4" 
                : "room bg-light pt-4"
                }>
                <h4 className={darkMode ? "text-light" : "text-dark"}>Book a room in our hotels</h4>
                <p className={darkMode ? "text-light" : "text-dark"}>Are you a community or a university ? Use our solution online to manage your time to help your students to assist to lessons you supply.</p>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-6">
                            <input type="text" placeholder="First name" className="form-control mt-4" />
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <input type="text" placeholder="First name" className="form-control mt-4" />
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <input type="text" placeholder="First name" className="form-control mt-4" />
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <input type="text" placeholder="First name" className="form-control mt-4" />
                        </div>
                    </div>
                </div>

                
                <button className={darkMode ? "dark_object mr-2 btn0 position-relative text-info" : "mr-2 btn0 position-relative"} onClick={() => setGoBooking(false)} >
                    Submit my informations
                    <div className="linebtns"><div className="linebtn"></div><div className="linebtn"></div><div className="linebtn"></div><div className="linebtn"></div></div>
                </button>
            </div>

            <div className={
                chargePage ? "large_loading active d-flex justify-content-center align-items-center bg-dark" 
                : "large_loading d-flex justify-content-center align-items-center bg-dark"
                }><IsLoading darkMode={darkMode} /></div>
            
            {chargePage ?
            "":
            <div>

                {/* watch a video */}
                <div className={
                    darkMode && openWatch ? "bg-dark iWannaWatch active text-light p-2" :
                    !darkMode && openWatch ? "bg-light iWannaWatch active text-dark p-2" :
                    darkMode && !openWatch ? "bg-dark iWannaWatch text-light p-2" : 
                    "dark_object iWannaWatch text-dark p-2"
                    }>
                    {isVideoOrNot ?
                        <video src={videoKing} controls poster={videoKing}></video>
                    : notVideo === "Contact" ?
                        <div>
                            <h4>Tell us your need</h4>
                            <div className="row">
                                <div className="col-md-12 col-lg-6 d-flex justify-content-center align-items-center tellus p-4">
                                    <div className="avatar_contact d-flex justify-content-center align-items-center">
                                        <img src={urls.ines} alt="contact" className="w-100" />
                                    </div>
                                    <h6 className="p-4">TTiska , the tribe of Iska</h6>
                                    {/* <p className="">T : for the, T : for tribe, I : for Idris, S : for SEDIDIA, and KA : for KASONGO</p> */}
                                    <p className=" d-flex justify-content-start align-items-center">We are always ready to satify our customers. We can create your company's application.</p>
                                </div>
                                <ul className="col-md-12 col-lg-6 p-4">
                                    <li className=" d-flex justify-content-between align-items-center">
                                        <span><i className="icon-home2"></i> Home Adress</span>
                                        <span>:</span>
                                        <span>1600, downTown L-shi</span>
                                    </li>
                                    <li className=" d-flex justify-content-between align-items-center">
                                        <span><i className="icon-phone2"></i> PhoneNumber</span>
                                        <span>:</span>
                                        <span>+243 977 977 791</span>
                                    </li>
                                    <li className=" d-flex justify-content-between align-items-center">
                                        <span><i className="icon-mail_outline"></i> Email Adress</span>
                                        <span>:</span>
                                        <span>sedidia01@gmail.com</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        : ""
                    }

                    <div className={darkMode ? "dark_object text-light closeWatch d-flex justify-content-between" : "bg-dark text-dark closeWatch d-flex justify-content-between"}>
                        <Link to="" className="btn btn-danger"  onClick={ () => handleCloseNavHomeOrWatchVideo() }>
                            <i className={"icon-arrow_back"}></i>
                            Close
                        </Link>
                        <div>{notVideo}</div>
                    </div>
                </div>
                {/* watch a video */}

                <div className={darkMode ? "rootApp p-2 text-light d-flex justify-content-start pb-4 bg-dark container" : "rootApp p-2 text-dark  d-flex justify-content-start pb-4 bg-light container"}>
                    <Link to="#" onClick={() => hangeMoveContentPage("Home")} className="tex-decoration-none text-info d-flex justify-content-start align-items-center">https//:www.TTiska.com</Link>
                    /<Link to="#"className="tex-decoration-none text-info">{activeContent === "Home" || activeContent === "Contact" || activeContent === "Cba" || activeContent === "CbaExport" || activeContent === "CbaView" ? activeContent : ""}</Link>
                </div>
                {/* Navbar */}
                <div className={darkMode ? "navigation dark_object container" : "navigation bg-white container"}>
                    <div className="logo tex-info" onClick={openNavHome}>
                        <i className={darkMode ? "icon-menu text-light" : "icon-menu text-dark"}></i>
                    </div>   
                    
                    <div className="d-flex justify-content-center align-items-center">

                        {activeContent !== "Home" ?
                        <div className={darkMode ? "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark" : "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark"} onClick={() => hangeMoveContentPage("Home")}>
                            <i className="icon-home2 text-info"></i>
                        </div>
                        :
                        ""
                        }

                        {isConnected && accountType === "university" && activeContent !== "Ttime" ?
                        <div className={darkMode ? "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark text-light" : "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark text-light"} onClick={() => hangeMoveContentPage("Ttime")}>
                            <i className="icon-timer"></i>
                        </div>
                        : ""}

                        {activeContent === "CbaView" || activeContent === "Cba" ?
                        <div className={darkMode ? "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark text-light" : "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark text-light"} onClick={() => hangeMoveContentPage("CbaExport")}>
                            Export
                        </div>
                        : ""}

                        {activeContent === "CbaExport" || activeContent === "Cba" ?
                        <div className={darkMode ? "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark text-light" : "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark text-light"} onClick={() => hangeMoveContentPage("CbaView")}>
                            View
                        </div>
                        : ""}


                        {isConnected && accountType === "university" && activeContent !== "Cba" ?
                        <div className={darkMode ? "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark text-light" : "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark text-light"} onClick={() => hangeMoveContentPage("Cba")}>
                            Cba
                        </div>
                        : ""}

                        {darkMode ?
                        <div className={darkMode ? "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark" : "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark"} onClick={() => activeOrNotDarkMode("false")}>
                            <i className="icon-wb_sunny text-info"></i>
                        </div>
                        :
                        <div className={darkMode ? "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark" : "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark"} onClick={() => activeOrNotDarkMode("true")}>
                            <i className="icon-moon-o text-light"></i>
                        </div>
                        }
                        
                        {isSearchOpened && !blockedFonctionalities ?
                        <div className="search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 text-dark bg-danger" onClick={() => setIsSearchOpened(false)}>
                            <i className="icon-close2"></i>
                        </div>
                        : !isSearchOpened && !blockedFonctionalities ?
                        <div className="search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 text-dark" onClick={() => setIsSearchOpened(true)}>
                            <i className="icon-search2"></i>
                        </div>
                        : ""
                        }

                        {!isConnected ?
                        <div className={darkMode ? "search_btn_nav bg-dark text-decoration-none d-flex justify-content-center align-items-center rounded p-3 text-info" : "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 text-info"} onClick={goingToSignIn}>
                            <div className={darkMode ? "text-light" : "text-dark"}>Sign-In</div>
                        </div>
                        :
                        ""
                        }
                        
                    </div>
                </div> 
                {/* Navbar */}

                {activeContent === "Home" ?
                <Home goBooking={goBooking} setGoBooking={setGoBooking} handleWatchVideo={handleWatchVideo} darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                : activeContent === "Ttime" ?
                <TtimeHome goBooking={goBooking} setGoBooking={setGoBooking} handleWatchVideo={handleWatchVideo} darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                : activeContent === "Contact" ?
                <DiscussBox darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                : activeContent === "Cba" || activeContent === "CbaView" || activeContent === "CbaExport" ?
                <Cba darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                : activeContent === "TRAINING" || activeContent === "SOLUTIONS" || activeContent === "BUILT" || activeContent === "VIEW_TRAINING" || activeContent === "VIEW_SOLUTIONS" || activeContent === "VIEW_BUILT" ?
                <WhatchAndView darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                : ""
                }
            </div>
            }
            
            <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
    )
}

export default TTiska;