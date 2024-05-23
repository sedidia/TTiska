import urls from "../Config/Config";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

// import Publicity from "../SmallComponents/Publicity";
import IsLoading from "../SmallComponents/IsLoading";
import Footer from "../SmallComponents/Footer";
import Auth from "./Auth";
import Home from "../SmallComponents/Home";
import DiscussBox from "../SmallComponents/DiscussBox";
import WhatchAndView from "../SmallComponents/WhatchAndView";
import HomeUniv from "../Cba/HomeUniv";
// import WhatchAndView from "../SmallComponents/WhatchAndView";

import { useHistory } from 'react-router-dom';
import SaveApparitor from "../Ttime/Admin/SaveApparitor";
import SaveClasses from "../Ttime/Admin/SaveClasses";
import CreateSemester from "../Ttime/Admin/CreateSemester";
import AttributeClasses from "../Ttime/Admin/AttributeClasses";
import SaveCourses from "../Ttime/Admin/SaveCourses";
import ConsultSectionsClasses from "../Ttime/Appariteur/ConsultSectionsClasses";
import ProgramSchedulsCourses from "../Ttime/Appariteur/ProgramSchedulsCourses";
import ProgramSemestersCourses from "../Ttime/Appariteur/ProgramSemestersCourses";

// notif
import Swal from 'sweetalert2';
import CreateTime from "../Ttime/Teacher/CreateTime";
import SaveResult from "../Cba/SaveResult";
import ConsultResult from "../Cba/ConsultResult";


const TTiska = () => {
    const history = useHistory();

    const [etats, setEtats] = useState({});
    const [allDatas, setAllDatas] = useState({});

    const [activeGroupContent, setActiveGroupContent] = useState("");

    const [isNavOpened, setIsNavOpened] = useState(false);
    const [onLoadingPage, setOnLoadingPage] = useState(true);
    const [isSearchOpened, setIsSearchOpened] = useState(false);
    const [blockedFonctionalities, setBlockedFonctionalities] = useState(false);
    
    const [darkMode, setDarkMode] = useState(false);
    const [activeContent, setActiveContent] = useState("Auth");

    const [openWatch, setOpenWatch] = useState(false);
    const [videoKing, setVideoKing] = useState(null);
    const [isVideoOrNot, setIsVideoOrNot] = useState(false);
    const [notVideo, setNotVideo] = useState(null);
    const [goBooking, setGoBooking]= useState(false); 
    const [isSearching, setIsSearching]= useState(false); 


    const ttiskaSync = async (title, message) => {
        console.log("salut rech");
        setIsSearching(true)
        try {
            // Envoie de la requête à la route qui récupère toutes les collections de la base de données "local"
            const response = await fetch('http://localhost:3001/collections');
            const data = await response.json();
            
            setAllDatas(data);
            setIsSearching(false)
            handleSuccess(title, message)
            
        } catch (error) {
            setIsSearching(false)
            console.error('Erreur lors de la récupération des données :', error);
        }
      };

    // ttiska sync system
    // the users collection
    const [users, setUsers] = useState([]);

    const handleSuccess = (title, message) => {

        Swal.fire({
            icon: 'success',
            title: title,
            text: "text Success",
            html: message,
        });
    };
    
    useEffect(() => {
        // active OR not other fonctionnalities
        setBlockedFonctionalities(true);

        setOnLoadingPage(false);
        setDarkMode(false);

        // console.log(allDatas);

        // dark mode management
        localStorage.getItem("isDarkOn") !== null ? setDarkMode(true) : setDarkMode(false)
    }, [etats]);

    const handleWatchVideo = (message, isVideo, isWatchOn, videoKind) => {
        setOpenWatch(isWatchOn)
        setVideoKing(videoKind)

        setIsVideoOrNot(isVideo)
        setNotVideo(message)
    }
    const handleCloseNavHomeOrWatchVideo = (message) => {
        setIsNavOpened(false)
        setOpenWatch(false)
        if(message === "Auth"){
            setActiveContent("Auth")
        }

    }

    const openNavHome = () => {
        setIsNavOpened(true);
    }

    const activeOrNotDarkMode = (actDark) => {
        actDark === "false" ? setDarkMode(false) : setDarkMode(true)
        actDark === "true" ? localStorage.setItem("isDarkOn", "y") : localStorage.removeItem("isDarkOn")
    }

    const hangeMoveContentPage = (data) => {
        setActiveContent(data)
        setIsNavOpened(false);
    }
    
    const handleLogout = () => {
        // disconnect the account
        setEtats({})
        setActiveContent("Auth")
        // setActiveContent("Home")
    }

    const openSocialMedia = (e, socialAccount) => {
        e.preventDefault()
        window.open(socialAccount, '_blank')
        console.log("Link : "+socialAccount);
    }

    return ( 
        <div className={darkMode ? " bg-dark" : "lightBac"}>
            <div className={isNavOpened && darkMode ? "navHome active dark_object" : isNavOpened && !darkMode ? "navHome active bg-white" : !isNavOpened && darkMode ? "navHome dark_object" : "navHome bg-white"}>

                {etats.isOnline ?
                <div className="profilsLinks">
                    <div className="profil d-flex justify-content-start align-items-center">
                        <div className="avatar">
                            {/* <img src={urls.ines} alt="avatar" /> */}
                            <i className="icon-person text-info"></i>
                        </div>
                        <div className="texts p-2">
                            <div className={darkMode ? "text-light d-flex" : "text-dark d-flex"}>@{etats.username}</div>
                            <span className={darkMode ? "text-light" : "text-dark"}>Status : {etats.userType}</span>
                        </div>
                    </div>
                    <div className="mylinks">
                        {/* <Link className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} to="">acces my profil</Link> */}
                        {activeContent !== "HomeUniv" && (etats.userType === "university" || etats.userType === "doorman" || etats.userType === "teacher" || etats.userType === "student") ?
                            <Link className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} to="#" onClick={() => hangeMoveContentPage("HomeUniv")}>Go to the tome page</Link>
                        :""}
                       {etats.userType === "university" ?
                            <div>
                                <div className="linksGroup">
                                    <Link to="/" className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} onClick={() => setActiveGroupContent("adminsMainsOperations")}>Time manager</Link>
                                    {activeGroupContent === "adminsMainsOperations" ?
                                    <div className="linksList">
                                        <Link className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} to="#" onClick={() => hangeMoveContentPage("SaveCourses")}>Save courses</Link>
                                        <Link className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} to="#" onClick={() => hangeMoveContentPage("CreateSemester")}>Create semesters</Link>
                                        <Link className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} to="#" onClick={() => hangeMoveContentPage("SaveClasses")}>Save the Classes</Link>
                                        <Link className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} to="#" onClick={() => hangeMoveContentPage("SaveApparitor")}>Save apparitors</Link>
                                        <Link className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} to="#" onClick={() => hangeMoveContentPage("AttributeClasses")}>Attribute Classes</Link>
                                        
                                    </div>                                
                                    :""}
                                </div>
                            </div>
                        : ""}
                        
                        {etats.userType === "doorman" ?
                            <div className="linksGroup">
                                <Link to="/" className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} onClick={() => setActiveGroupContent("Ttime")}>Manage the schedul</Link>
                                {activeGroupContent === "Ttime" ?
                                <div className="linksList">
                                    <Link className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} to="#" onClick={() => hangeMoveContentPage("SaveCourses")}>Save your section's courses</Link>
                                    <Link className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} to="#" onClick={() => hangeMoveContentPage("ConsultSectionsClasses")}>Consult section's classses</Link>
                                    <Link className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} to="#" onClick={() => hangeMoveContentPage("ProgramSemestersCourses")}>Program semester's courses</Link>
                                    <Link className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} to="#" onClick={() => hangeMoveContentPage("ProgramSchedulsCourses")}>Program schedul's courses</Link>
                                </div>                                
                                :""}
                            </div>
                        : ""}
                        {etats.userType === "university" || etats.userType === "doorman" || etats.userType === "student" ?
                            <div className="linksGroup">
                                <Link to="/" className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} onClick={() => setActiveGroupContent("The Cba")}>The Cba</Link>
                                {activeGroupContent === "The Cba" ?
                                <div className="linksList">
                                    <Link className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} to="#" onClick={() => hangeMoveContentPage("SaveResult")}>Save the result</Link>
                                    <Link className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} to="#" onClick={() => hangeMoveContentPage("ConsultResult")}>Consult the result</Link>
                                </div>                                
                                :""}
                            </div>
                        : ""}


                        
                        
                        <div className="mt-4">
                            <Link className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light mt-4" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark mt-4"} to="#" onClick={handleLogout}>Log-out</Link>
                            <Link className={darkMode ? "myLink overLinkDark text-decoration-none d-flex flex-direction-column text-light" : "myLink overLinkLight text-decoration-none d-flex flex-direction-column text-dark"} to="#" onClick={() => setIsNavOpened(false)}>Close nav</Link>
                        </div>
                        
                        {/* <Link className="myLink text-decoration-none" to="">See bookings</Link>
                        <Link className="myLink text-decoration-none" to="">see my previous reservations</Link>
                        <Link className="myLink text-decoration-none" to="">see my bonuses</Link>
                        <Link className="myLink text-decoration-none" to="">see ticket options</Link>
                        <Link className="myLink text-decoration-none" to="">transport of goods</Link>
                        <Link className="myLink text-decoration-none" to="">rent a vehicle</Link>
                        <Link className="myLink text-decoration-none" to="">Discuss a deal with us</Link> */}
                    
                    </div>
                </div>
                :
                <div className="p-2 text-center">
                    <p className="icon_not_connected">🥰</p>
                    <p className={darkMode ? "text-light" : "text-dark"}>You're not connected, be sure to connect to see more features.</p>
                    <div className={darkMode ? "bg-light search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-0 m-0" : "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-0 m-0"} onClick={ () => handleCloseNavHomeOrWatchVideo("Auth") }>
                        <div className="text-dark">Sign-in</div>
                    </div>
                </div>
                
                }
            </div>
            
            <div className={isNavOpened || openWatch ? "closeNavHome active" : "closeNavHome"} onClick={ () => handleCloseNavHomeOrWatchVideo("navORwatch") }>
            </div>


            {/* book a room */}
            {/* <div className={
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
                            <input type="text" id="firstName" name="firstName" placeholder="First name" className="form-control mt-4" />
                        </div>
                    </div>
                </div>

                
                <button className={darkMode ? "dark_object mr-2 btn0 position-relative text-info" : "mr-2 btn0 position-relative"} onClick={() => setGoBooking(false)} >
                    Submit my informations
                    <div className="linebtns"><div className="linebtn"></div><div className="linebtn"></div><div className="linebtn"></div><div className="linebtn"></div></div>
                </button>
            </div> */}
            {/* book a room */}

            <div className={
                onLoadingPage ? "large_loading active d-flex justify-content-center align-items-center bg-dark" 
                : "large_loading d-flex justify-content-center align-items-center bg-dark"
                }><IsLoading darkMode={darkMode} />
            </div>
            
            {onLoadingPage ?
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
                            <h4>TTiska , the tribe of Iska</h4>
                            <div className="row">
                                <div className="col-md-12 col-lg-6 d-flex justify-content-center align-items-center tellus p-4">
                                    <div className="avatar_contact d-flex justify-content-center align-items-center">
                                        <img src={urls.ines} alt="contact" className="w-100" />
                                    </div>
                                    <h6 className="p-4">@Iness KASONGO</h6>
                                    {/* <p className="">T : for the, T : for tribe, I : for Idris, S : for SEDIDIA, and KA : for KASONGO</p> */}
                                    <p className=" d-flex justify-content-start align-items-center">We are always ready to satisfy our customers creating their company's or personal's applications or supplying ours other services to them.</p>
                                </div>
                                <ul className="col-md-12 col-lg-6 p-4">
                                    <li className=" d-flex justify-content-between align-items-center">
                                        <span><i className="icon-home2"></i> Home Adress</span>
                                        <span>:</span>
                                        <span>1600, downTown L-shi</span>
                                    </li>
                                    <li className=" d-flex justify-content-between align-items-center">
                                        <span><i className="icon-phone2"></i> Phone Number</span>
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
                        <Link to="" className="btn btn-danger"  onClick={ () => handleCloseNavHomeOrWatchVideo("closeNav") }>
                            <i className={"icon-arrow_back"}></i>
                            Close
                        </Link>
                        <div>{notVideo}</div>
                    </div>
                </div>
                {/* watch a video */}

                {/* <div className={darkMode ? "rootApp p-2 text-light d-flex justify-content-start pb-4 bg-dark" : "rootApp p-2 text-dark  d-flex justify-content-start pb-4 bg-light"}>
                    <div className="d-flex justify-content-between align-items-center container">
                        <Link to="#" onClick={() => hangeMoveContentPage("Home")} className="text-decoration-none text-info nameTT">The tribe of Iska</Link>
                        <Link to="#" onClick={() => hangeMoveContentPage("Home")} className={etats.isOnline ? "text-decoration-none text-info bg-primary isOnline" : "text-decoration-none text-info bg-light isOnline"}>  </Link>
                    </div>
                </div> */}

                {/* Navbar */}
                <div className={darkMode ? "navigation dark_object container" : "navigation bg-white container"}>
                    <div className={etats.isOnline ? "logo tex-primary" : "logo tex-light"} onClick={openNavHome}>
                        <i className={
                            etats.isOnline && (darkMode || !darkMode) ? "icon-menu text-info" :
                            !etats.isOnline && darkMode ? "icon-menu text-light"
                            : "icon-menu text-dark"}></i>
                    </div>   
                    
                    <div className="d-flex justify-content-center align-items-center">

                        {activeContent !== "Home" ?
                        <div className={darkMode ? "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark" : "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark"} onClick={() => hangeMoveContentPage("Home")}>
                            <i className="icon-home2 text-info"></i>
                        </div>
                        :
                        ""
                        }
                        {/* {isSearching ?
                        <IsLoading ></IsLoading>
                        :
                        <div className={darkMode ? "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark" : "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 bg-dark"} onClick={ () => ttiskaSync("Rechargement de données", "Great, toutes les données on été chargées avec succès") }>
                            <i className="icon-sync text-info"></i>
                        </div>
                        } */}

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

                        {!etats.isOnline ?
                        <div className="d-flex">
                            <div className={darkMode ? "search_btn_nav bg-dark text-decoration-none d-flex justify-content-center align-items-center rounded p-3 text-info" : "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 text-info"} onClick={ () => handleCloseNavHomeOrWatchVideo("Auth") }>
                                <div className={darkMode ? "text-light" : "text-dark"}>Sign-In</div>
                            </div>
                            {/* <div className={darkMode ? "search_btn_nav bg-dark text-decoration-none d-flex justify-content-center align-items-center rounded p-3 text-info" : "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 text-info"} onClick={ () => handleCloseNavHomeOrWatchVideo("Auth") }>
                                <div className={darkMode ? "text-light" : "text-dark"}>Log-In</div>
                            </div> */}
                        </div>
                        :
                        <div className={darkMode ? "search_btn_nav bg-dark text-decoration-none d-flex justify-content-center align-items-center rounded p-3 text-info" : "search_btn_nav text-decoration-none d-flex justify-content-center align-items-center rounded p-3 text-info"} onClick={ handleLogout }>
                            <div className={darkMode ? "text-light" : "text-dark"}>Log-out</div>
                        </div>
                        }
                        
                    </div>
                </div> 
                {/* Navbar */}

                {activeContent === "Home" ?
                <Home openSocialMedia={openSocialMedia} handleSuccess={handleSuccess} hangeMoveContentPage={hangeMoveContentPage} etats={etats} goBooking={goBooking} setGoBooking={setGoBooking} handleWatchVideo={handleWatchVideo} darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                
                // for the admin of the unniversity
                : activeContent === "SaveApparitor" ?
                <SaveApparitor handleSuccess={handleSuccess} allDatas={allDatas} setAllDatas={setAllDatas} hangeMoveContentPage={hangeMoveContentPage} etats={etats} darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                : activeContent === "SaveClasses" ?
                <SaveClasses handleSuccess={handleSuccess} allDatas={allDatas} setAllDatas={setAllDatas} hangeMoveContentPage={hangeMoveContentPage} etats={etats} darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                : activeContent === "CreateSemester" ?
                <CreateSemester handleSuccess={handleSuccess} allDatas={allDatas} setAllDatas={setAllDatas} hangeMoveContentPage={hangeMoveContentPage} etats={etats} darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                : activeContent === "AttributeClasses" ?
                <AttributeClasses handleSuccess={handleSuccess}  allDatas={allDatas} setAllDatas={setAllDatas} hangeMoveContentPage={hangeMoveContentPage} etats={etats} darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                
                // for apparitor 
                : activeContent === "SaveCourses" ?
                <SaveCourses handleSuccess={handleSuccess} allDatas={allDatas} setAllDatas={setAllDatas} hangeMoveContentPage={hangeMoveContentPage} etats={etats} darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                : activeContent === "ConsultSectionsClasses" ?
                <ConsultSectionsClasses handleSuccess={handleSuccess} allDatas={allDatas} setAllDatas={setAllDatas}  hangeMoveContentPage={hangeMoveContentPage} etats={etats} darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                : activeContent === "ProgramSemestersCourses" ?
                <ProgramSemestersCourses handleSuccess={handleSuccess} allDatas={allDatas} setAllDatas={setAllDatas}  hangeMoveContentPage={hangeMoveContentPage} etats={etats} darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                : activeContent === "ProgramSchedulsCourses" ?
                <ProgramSchedulsCourses handleSuccess={handleSuccess} allDatas={allDatas} setAllDatas={setAllDatas}  hangeMoveContentPage={hangeMoveContentPage} etats={etats} darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                
                // for apparitor 
                : activeContent === "CreateTime" ?
                <CreateTime handleSuccess={handleSuccess} allDatas={allDatas} setAllDatas={setAllDatas} hangeMoveContentPage={hangeMoveContentPage} etats={etats} darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                
                : activeContent === "SaveResult" ?
                <SaveResult handleSuccess={handleSuccess} allDatas={allDatas} setAllDatas={setAllDatas} hangeMoveContentPage={hangeMoveContentPage} etats={etats} darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                : activeContent === "ConsultResult" ?
                <ConsultResult handleSuccess={handleSuccess} allDatas={allDatas} setAllDatas={setAllDatas} hangeMoveContentPage={hangeMoveContentPage} etats={etats} darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                
                : activeContent === "Auth" ?
                <Auth  handleSuccess={handleSuccess} allDatas={allDatas} setAllDatas={setAllDatas} setEtats={setEtats} etats={etats} darkMode={darkMode}  users={users} setUsers={setUsers} activeContent={activeContent} setActiveContent={setActiveContent} />
                : activeContent === "Contact" ?
                <DiscussBox  handleSuccess={handleSuccess} darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                : activeContent === "HomeUniv" || activeContent === "CbaView" || activeContent === "CbaExport" ?
                <HomeUniv  handleSuccess={handleSuccess} allDatas={allDatas} setAllDatas={setAllDatas} etats={etats} darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                : activeContent === "TRAINING" || activeContent === "SOLUTIONS" || activeContent === "BUILT" || activeContent === "VIEW_TRAINING" || activeContent === "VIEW_SOLUTIONS" || activeContent === "VIEW_BUILT" ?
                <WhatchAndView  handleSuccess={handleSuccess} darkMode={darkMode} setDarkMode={setDarkMode} activeContent={activeContent} setActiveContent={setActiveContent} />
                : ""
                }
            </div>
            }
            
            <Footer openSocialMedia={openSocialMedia} darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
    )
}

export default TTiska;