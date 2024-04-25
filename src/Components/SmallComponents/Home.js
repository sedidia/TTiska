import urls from "../Config/Config";
import { Link } from "react-router-dom";
import Room from "../Booking/Room";
// import React, { useState, useEffect } from "react";

// import Publicity from "../SmallComponents/Publicity";
// import LoginRegister from "../SmallComponents/LoginRegister";
// import WhatchVideo from "../SmallComponents/WhatchVideo";

const Home = ( {goBooking, setGoBooking, handleWatchVideo, darkMode, activeContent, setActiveContent, etats, hangeMoveContentPage} ) => {
    
    return ( 
        <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>
            <div>

                <div className={darkMode ? "bg-dark" : "bg-light"}>
                    {/* header */}
                    <div className={darkMode ? "header position-relative bg-dark" : "header position-relative bg-light"}>
                        <div className="text_header">
                            <div className={darkMode ? "card p-2" : "card p-2"}>
                                <div className={darkMode ? "bg-dark p-2 pt-4 pb-4 rounded" : "p-2 pt-4 pb-4 rounded"}>         
                                    <h3 className={darkMode ? "mb-4 text-light" : "mb-4 text-dark"} >Your company's application, The Cba for universities ?</h3>
                                    <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>What do you need ? <br></br> 
                                    Creation of applications for all kind of companies, Supply our solutions online and many other of our services.</p>
                                    <div>
                                        <button className={darkMode ? "dark_object mr-2 btn0 position-relative text-info " : "mr-2 btn0 position-relative"} onClick={() => handleWatchVideo("Contact", false, true, urls.sedidia1)} >
                                            I wanna take a contact for business
                                            <div className="linebtns">
                                                <div className="linebtn"></div>
                                                <div className="linebtn"></div>
                                                <div className="linebtn"></div>
                                                <div className="linebtn"></div>
                                            </div>
                                        </button>

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
                                <img className="img_carousel active" src={urls.ines} alt="header_image" />
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
                        
                            <div className="col-md-6 col-lg-4 overCard">
                                <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Send your money from where you are to anyone accross us. </p>
                                <div className={darkMode ? "p-4 bg-dark" : "p-4 bg-light"}>
                                    <aside className="d-flex justify-content-center align-items-center">
                                        <i className="icon-money text-danger p-2"></i>
                                        <h4 className={darkMode ? "text-light" : "text-dark"}>Tismoney</h4>
                                    </aside>
                                    <Link className="btn btn-outline-danger" to="#footer" onClick={() => handleWatchVideo("watch", true, true, urls.sedidia1)}>» Whatch a video</Link>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 overCard">
                                <p className="d-flex justify-content-center align-items-center p-2">Rent a car from where you are using your smartphone on TTiska. </p>
                                <div className={darkMode ? "p-4 bg-dark" : "p-4 bg-light"}> 
                                    <aside className="d-flex justify-content-center align-items-center">
                                        <i className="icon-car text-danger p-2"></i>
                                        <h4 className={darkMode ? "text-light" : "text-dark"}>TisCar </h4>
                                    </aside>
                                    {/* <Link className="btn btn-outline-info" to="#footer">» Get started with us</Link> */}
                                    <Link className="btn btn-outline-danger" to="#footer" onClick={() => handleWatchVideo("watch", true, true, urls.the_street_called_mercy)}>» Whatch a video</Link>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 overCard MoverCard">
                                <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Help your students to consult their result using our Cba solution.</p>
                                <div className={darkMode ? "p-4 bg-dark" : "p-4 bg-light"}>
                                    <aside className="d-flex justify-content-center align-items-center">
                                        <i className="icon-handshake-o text-danger p-2"></i>
                                        <h4 className={darkMode ? "text-light" : "text-dark"}>Cba online</h4>
                                    </aside>
                                    <Link className="btn btn-outline-danger" to="#footer" onClick={() => handleWatchVideo("watch", true, true, urls.sauts)}>» Whatch a video</Link>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 overCard MoverCard">
                                <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Help your students to consult their courses schedule using our Cba solution.</p>
                                <div className={darkMode ? "p-4 bg-dark" : "p-4 bg-light"}>
                                    <aside className="d-flex justify-content-center align-items-center">
                                        <i className="icon-handshake-o text-danger p-2"></i>
                                        <h4 className={darkMode ? "text-light" : "text-dark"}>TisTime online</h4>
                                    </aside>
                                    <Link className="btn btn-outline-danger" to="#footer" onClick={() => handleWatchVideo("watch", true, true, urls.sauts)}>» Whatch a video</Link>
                                    {etats.isOnline && (etats.userType === "university" || etats.userType === "apparitor" || etats.userType === "student") ?
                                    <Link className="btn btn-outline-info" to="#footer" onClick={() => hangeMoveContentPage("HomeUniv")}>Se fonctionalities</Link>
                                    :""}
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 overCard MoverCard">
                                <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Book a best room in our hotel from our plateform online, TTiska'll take care of you.</p>
                                <div className={darkMode ? "p-4 bg-dark" : "p-4 bg-light"}>
                                    <aside className="d-flex justify-content-center align-items-center">
                                        <i className="icon-home2 text-danger p-2"></i>
                                        <h4 className={darkMode ? "text-light" : "text-dark"}>Hotel</h4>
                                    </aside>
                                    <Link className="btn btn-outline-danger" to="#footer" onClick={() => handleWatchVideo("watch", true, true, urls.sauts)}>» Whatch a video</Link>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 overCard MoverCard">
                                <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Do you need an application for your activity ? Contact us to realize your dream.</p>
                                <div className={darkMode ? "p-4 bg-dark" : "p-4 bg-light"}>
                                    <aside className="d-flex justify-content-center align-items-center">
                                        <i className="icon-handshake-o text-danger p-2"></i>
                                        <h4 className={darkMode ? "text-light" : "text-dark"}>Applications</h4>
                                    </aside>
                                    <Link className="btn btn-outline-danger" to="#footer" onClick={() => handleWatchVideo("watch", true, true, urls.sauts)}>» Whatch a video</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* our services solutions */}

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
                    <Room goBooking={goBooking} setGoBooking={setGoBooking} darkMode={darkMode} />
                    {/* Room */}
                </div>

            </div>
            
        </div>
    )
}
  
  export default Home;