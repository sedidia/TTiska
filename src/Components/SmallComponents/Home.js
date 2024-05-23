import urls from "../Config/Config";
import { Link } from "react-router-dom";
import Room from "../Booking/Room";
import Publicity from "./Publicity";
import { useState } from "react";
// import React, { useState, useEffect } from "react";

// import Publicity from "../SmallComponents/Publicity";
// import LoginRegister from "../SmallComponents/LoginRegister";
// import WhatchVideo from "../SmallComponents/WhatchVideo";

const Home = ( {openSocialMedia, goBooking, setGoBooking, handleWatchVideo, darkMode, activeContent, setActiveContent, etats, hangeMoveContentPage} ) => {
    
    let [historyData, setHistoryData] = useState("painquotidien");
    // const urlWhat = "https://wa.me/+243977077791"
    // const urlFacebook = "https://m.me/facebookId"
    // const urlTiktok = "https://wwwa.tiktok.com/@username"
    // const urlTwitter = "https://twitter.com/messages/compose?recipient_id=twitter_id"
    // const urlGithub = "https://github.com/sedidia"   onClick={ (e) => openSocialMedia(e, "https://github.com/sedidia") }

    return ( 
        <div className={darkMode ? "bg-dark text-light" : "lightBac text-dark"}>
            <div>

                <div>
                    {/* header */}
                    <div className={darkMode ? "header position-relative bg-dark" : "header position-relative bg-white"}>
                        <div className="text_header">
                            <div className={darkMode ? "card p-2 bg-none" : "card p-2 bg-none"}>
                                <div className={darkMode ? "dark_object p-2 pt-4 pb-4 rounded" : "p-2 pt-4 pb-4 rounded"}>         
                                    {/* <h3 className={darkMode ? "mb-4 text-light" : "mb-4 text-dark"} >Your company's application, The Cba for universities ?</h3> */}
                                    <h2 className={darkMode ? "mb-4 text-light" : "mb-4 text-dark"} >Solutions numerique de qualité à votre disposition</h2>
                                    <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>What do you need ? <br></br> 
                                    An application for your company/own, one of our solutions online like "Th Cba" or "TTiska time"; contact us, you shall be satisfied.</p>
                                    <div>
                                        <button className={darkMode ? "dark_object mr-2 btn0 position-relative text-info " : "mr-2 btn0 position-relative"} onClick={ (e) => openSocialMedia(e, "https://wa.me/+243977077791") } >
                                            I wanna take a contact for business
                                            <div className="linebtns">
                                                <div className="linebtn"></div>
                                                <div className="linebtn"></div>
                                                <div className="linebtn"></div>
                                                <div className="linebtn"></div>
                                            </div>
                                        </button>
                                        {/* onClick={() => handleWatchVideo("Contact", false, true, urls.sedidia1)} */}
                                        {/* <button onClick={ (e) => openSocialMedia(e, "https://wa.me/+243977077791") } className={"btn btn-outline-info p-4"} >
                                            I wanna take a contact for business
                                        </button> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashs">
                            <div className="dash"></div>
                            <div className="dash"></div>
                            <div className="dash"></div>
                            <div className="dash"></div>
                            <div className="dash"></div>
                            <div className="dash"></div>
                            <div className="dash"></div>
                            <div className="dash"></div>
                            <div className="dash"></div>
                            <div className="dash"></div>
                            <div className="dash"></div>
                            <div className="dash"></div>
                        </div>
                        <div className="imgs">
                            <div className="img">
                                <img className="img_carousel active" src={darkMode ? urls.ttiska_dark : urls.ttiska_light} alt="header_image" />
                            </div>
                        </div>
                    
                    </div>
                    {/* header */}

                    {/* carousel */}
                    {/* carousel */}

                    {/* our services solutions */}
                    <h4 className={darkMode ? "text-light pt-4 mt-4" : "text-dark pt-4 mt-4"}>||||| What do you need ?</h4>
                    <div className="container">
                        <p className="d-flex justify-content-center align-items-center">
                            Here are some of our services we offer, you can choose the one who interest your heart. <br />
                            «« TTiska ! the tribe of Iska »»
                        </p>
                    </div>
                    <div className="container d-flex justify-content-center align-items-center pb-4">

                        <div className="row">
                        
                            {/* <div className="col-md-6 col-lg-4 overCard">
                                <div className={darkMode ? "p-4 dark_object" : "p-4 bg-white"}>
                                     <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Send your money from where you are to anyone accross us. </p>
                                    <aside className="d-flex justify-content-center align-items-center">
                                        <i className="icon-money text-danger p-2"></i>
                                        <h4 className={darkMode ? "text-light" : "text-dark"}>Tismoney</h4>
                                    </aside>
                                    <Link className="btn btn-outline-danger" to="#" onClick={() => handleWatchVideo("watch", true, true, urls.sedidia1)}>» Whatch a video</Link>
                                </div>
                            </div> */}
                            {/* <div className="col-md-6 col-lg-4 overCard">
                                <div className={darkMode ? "p-4 dark_object" : "p-4 bg-white"}> 
                                <p className="d-flex justify-content-center align-items-center p-2">Rent a car from where you are using your smartphone on TTiska. </p>
                                    <aside className="d-flex justify-content-center align-items-center">
                                        <i className="icon-car text-danger p-2"></i>
                                        <h4 className={darkMode ? "text-light" : "text-dark"}>TisCar </h4>
                                    </aside>
                                    <Link className="btn btn-outline-danger" to="#" onClick={() => handleWatchVideo("watch", true, true, urls.the_street_called_mercy)}>» Whatch a video</Link>
                                </div>
                            </div> */}
                            <div className="col-md-6 col-lg-4 overCard">
                                <div className={darkMode ? "p-4 dark_object" : "p-4 bg-white"}>
                                <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Help your students to consult their result using our Cba solution.</p>
                                    <aside className="d-flex justify-content-center align-items-center">
                                        <i className="icon-handshake-o text-danger p-2"></i>
                                        <h4 className={darkMode ? "text-light" : "text-dark"}>Cba online</h4>
                                    </aside>
                                    <Link className="btn btn-outline-danger" to="#" onClick={() => handleWatchVideo("watch", true, true, urls.sauts)}>» Whatch a video</Link>
                                    {etats.isOnline ?
                                    <Link className="btn btn-outline-info" to="#" onClick={() => hangeMoveContentPage("HomeUniv")}>{etats.userType === "student" ? "Have a retroaction" : (etats.userType === "admin" || etats.userType === "university") ? "Manage the Cba" : etats.userType === "doorman" ? "Upload the sheet" : "See fonctionalities"}</Link>
                                    :""}
                                 </div>
                            </div>
                            <div className="col-md-6 col-lg-4 overCard">
                                <div className={darkMode ? "p-4 dark_object" : "p-4 bg-white"}>
                                <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Are you a university? Help your students to consult their courses schedule using our online solution (UTM : University's Time Manager).</p>
                                    <aside className="d-flex justify-content-center align-items-center">
                                        <i className="icon-handshake-o text-danger p-2"></i>
                                        <h4 className={darkMode ? "text-light" : "text-dark"}>Schedule's management</h4>
                                    </aside>
                                    <Link className="btn btn-outline-danger" to="#" onClick={() => handleWatchVideo("watch", true, true, urls.sauts)}>» Whatch a video</Link>
                                    {etats.isOnline && (etats.userType === "university" || etats.userType === "doorman" || etats.userType === "student") ?
                                    <Link className="btn btn-outline-info" to="#" onClick={() => hangeMoveContentPage("HomeUniv")}>See fonctionalities</Link>
                                    :""}
                                </div>
                            </div>
                            {/* <div className="col-md-6 col-lg-4 overCard">
                                <div className={darkMode ? "p-4 dark_object" : "p-4 bg-white"}>
                                <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Book a best room in our hotel from our plateform online, TTiska'll take care of you.</p>
                                    <aside className="d-flex justify-content-center align-items-center">
                                        <i className="icon-home2 text-danger p-2"></i>
                                        <h4 className={darkMode ? "text-light" : "text-dark"}>Hotel</h4>
                                    </aside>
                                    <Link className="btn btn-outline-danger" to="#" onClick={() => handleWatchVideo("watch", true, true, urls.sauts)}>» Whatch a video</Link>
                                </div>
                            </div> */}
                            <div className="col-md-6 col-lg-4 overCard">
                                <div className={darkMode ? "p-4 dark_object" : "p-4 bg-white"}>
                                <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Do you need an application for your activity ? Contact us to realize your dream.</p>
                                    <aside className="d-flex justify-content-center align-items-center">
                                        <i className="icon-handshake-o text-danger p-2"></i>
                                        <h4 className={darkMode ? "text-light" : "text-dark"}>Applications</h4>
                                    </aside>
                                    <Link className="btn btn-outline-danger" to="#" onClick={() => handleWatchVideo("watch", true, true, urls.sauts)}>» Whatch a video</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                    


                    {/* publicity */}
                    <Publicity openSocialMedia={openSocialMedia} historyData={historyData}  />
                    {/* publicity */}

                    {/* our services solutions */}

                    {/* networks on cards */}
                    <h4 className={darkMode ? "text-light pt-4 mt-4" : "text-dark pt-4 mt-4"}>||||| Stay connected with us</h4>
                    <div className="container">
                        <p className="d-flex justify-content-center align-items-center">
                            Staying conected with us shall help you to learn more about us || to be informed about our news. <br />
                            «« TTiska, the tribe of Iska »»
                        </p>
                    </div>
                    <div className="d-flex justify-content-center">                        
                        <div className="row pb-4 container">                        
                            <div className="col-md-6 col-lg-4 p-2">                        
                                <div className="p-4 rounded  alert alert-info mt-4">
                                    <h4 className="p-4">Stay connected with us on our Facebook page</h4>
                                    <p>Are you a Facebook user? We are often sharing our news on our Facebook page, be the first to view them and let us comments. That will help us to progress.</p>
                                    <div>
                                        <aside className="d-flex justify-content-center align-items-center">
                                            {/* <h4>Voulez-vous discuter avec un groupe des jeunes pour christ ?</h4> */}
                                        </aside>
                                        <button onClick={ (e) => openSocialMedia(e, "https://web.facebook.com/profile.php?id=100090353215433") } className="btn btn-info text-light me-4  text-decoration-none mt-4">                            
                                                <i className={"icon-facebook"}></i>
                                        </button>
                                        <button onClick={ (e) => openSocialMedia(e, "https://web.facebook.com/profile.php?id=100090353215433") } className="btn btn-outline-info mp-4 mt-4">» Join us on Facebook</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-6 col-lg-4 p-2">                        
                                <div className="p-4 rounded  alert alert-danger">
                                    <h4 className="p-4">See our posts on our TikTok account</h4>
                                    <p>All the time we've been sharing contents about many subjects related to our services, and we often share our news directly on our account.</p>
                                    <p>Be the first to be informed about our news. The world of tomorow need people like you.</p>
                                    <div>
                                        <aside className="d-flex justify-content-center align-items-center">
                                            {/* <h4>Voulez-vous discuter avec un groupe des jeunes pour christ ?</h4> */}
                                        </aside>
                                        <button onClick={ (e) => openSocialMedia(e, "https://vm.tiktok.com/ZMMwMQgjA/") }className="btn btn-danger text-light me-4  text-decoration-none mt-4">                            
                                                <i className={"icon-video_library"}></i>
                                        </button>
                                        <button onClick={ (e) => openSocialMedia(e, "https://vm.tiktok.com/ZMMwMQgjA/") } className="btn btn-outline-danger mp-4 mt-4">» Join us on TikTok</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 p-2">                        
                                <div className="p-4 rounded  alert alert-dark mt-4">
                                    <h4 className="p-4">Stay connected with us on our Instagram account</h4>
                                    <p>Are you an Instagram user ? in this case, it shall be great to receive your comments on our Page and services we offer. We're sharing contents about menu subjects </p>
                                    <div>
                                        <aside className="d-flex justify-content-center align-items-center">
                                            {/* <h4>Voulez-vous discuter avec un groupe des jeunes pour christ ?</h4> */}
                                        </aside>
                                        <button onClick={ (e) => openSocialMedia(e, "https://www.instagram.com/sedidia/") } className="btn btn-dark text-light me-4  text-decoration-none mt-4">                            
                                                <i className={"icon-instagram"}></i>
                                        </button>
                                        <button onClick={ (e) => openSocialMedia(e, "https://www.instagram.com/sedidia/") } className="btn btn-outline-dark mp-4 mt-4">» See our Instagram</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* networks on cards */}


                    {/* services and solutions */}
                    
                    {/* <h4 className={darkMode ? "text-light pt-4 mt-4" : "text-dark pt-4 mt-4"}>||||| <A Services</h4>
                    <div className="container">
                        <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>
                            Here are some of our services we offer, you can choose the one who interest your heart. <br />
                            «« ISKa »»
                        </p>
                    </div>
                    <div className={darkMode ? "container" : "container"}>
                        <div className="row">
                            <div className={darkMode ? "col-md-6 col-lg-3" : "col-md-6 col-lg-3"} >

                                <div className={darkMode ? "dark_object btn0 position-relative m-1" : "btn0 position-relative m-1"} >
                                    <h4 className={darkMode? "text-light" : "text-dark"}>«« The Cba for universities »»</h4>
                                    <div className={darkMode? "text-light" : "text-dark"}>The Cba for universities is a solution which help to the last ones to share results and to their students to consult their bulltins in order to have a retroaction...</div>
                                    <div className="linebtns"><div className="linebtn"></div><div className="linebtn"></div><div className="linebtn"></div><div className="linebtn"></div></div>
                                </div>
                                    
                            </div>
                            <div className={darkMode ? "col-md-6 col-lg-3" : "col-md-6 col-lg-3"} >

                                <div className={darkMode ? "dark_object btn0 position-relative m-1" : "btn0 position-relative m-1"} >
                                    <h4 className={darkMode? "text-light" : "text-dark"}>«« The Cba for universities »»</h4>
                                    <div className={darkMode? "text-light" : "text-dark"}>The Cba for universities is a solution which help to the last ones to share results and to their students to consult their bulltins in order to have a retroaction...</div>
                                    <div className="linebtns"><div className="linebtn"></div><div className="linebtn"></div><div className="linebtn"></div><div className="linebtn"></div></div>
                                </div>
                                    
                            </div>
                            <div className={darkMode ? "col-md-6 col-lg-3" : "col-md-6 col-lg-3"} >

                                <div className={darkMode ? "dark_object btn0 position-relative m-1" : "btn0 position-relative m-1"} >
                                    <h4 className={darkMode? "text-light" : "text-dark"}>«« The Cba for universities »»</h4>
                                    <div className={darkMode? "text-light" : "text-dark"}>The Cba for universities is a solution which help to the last ones to share results and to their students to consult their bulltins in order to have a retroaction...</div>
                                    <div className="linebtns"><div className="linebtn"></div><div className="linebtn"></div><div className="linebtn"></div><div className="linebtn"></div></div>
                                </div>
                                    
                            </div>
                            <div className={darkMode ? "col-md-6 col-lg-3" : "col-md-6 col-lg-3"} >

                                <div className={darkMode ? "dark_object btn0 position-relative m-1" : "btn0 position-relative m-1"} >
                                    <h4 className={darkMode? "text-light" : "text-dark"}>«« The Cba for universities »»</h4>
                                    <div className={darkMode? "text-light" : "text-dark"}>The Cba for universities is a solution which help to the last ones to share results and to their students to consult their bulltins in order to have a retroaction...</div>
                                    <div className="linebtns"><div className="linebtn"></div><div className="linebtn"></div><div className="linebtn"></div><div className="linebtn"></div></div>
                                </div>
                                    
                            </div>
                        </div>
                    </div> */}
                    {/* services and solutions */}

                    {/* Room */}
                    {/* <Room goBooking={goBooking} setGoBooking={setGoBooking} darkMode={darkMode} /> */}
                    {/* Room */}
                </div>

            </div>
            
        </div>
    )
}
  
  export default Home;