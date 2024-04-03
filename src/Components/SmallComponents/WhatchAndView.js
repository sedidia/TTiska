import urls from "../Config/Config";
const WhatchAndView = ( {darkMode, activeContent} ) => {
    return (
        <div className={darkMode ? "p-4 bg-dark" : "p-4 bg-light"}>

            {/* whatch */}
            {activeContent === "TRAINING" || activeContent === "BUILT" || activeContent === "SOLUTIONS" ?
            <div>
                <h4 className={darkMode ? "text-light pt-4 mt-4" : "text-dark pt-4 mt-4"}>||||| WHATCH OUR « <div className="text-info">{activeContent}</div> » VIDEO</h4>
                <div className="container">
                    <p className={darkMode ? "text-light" : "text-dark"}>
                        Here are some of our services we offer, you can shoose the one who interest your heart. <br />
                        «« ISKa »»
                    </p>
                </div>

                <div className="container view_video">
                    <video src={activeContent === "TRAINING" ? urls.sauts : activeContent === "BUILT" ? urls.sauts : urls.sauts} controls poster="true"></video>
                </div>

                <div className="container d-flex justify-content-center pt-4">
                    <p className={darkMode ? "text-light" : "text-dark"}>Viewed by </p><p className="text-info p-2 pt-0"> 4, 654, 082 </p><p className={darkMode ? "text-light" : "text-dark"}>persons</p>
                </div>
            </div>

            // views
            : activeContent === "VIEW_TRAINING" ?
            <div className="container row">
                <div className={darkMode ? "col-md-12 col-lg-6 d-flex justify-content-around" : "col-md-12 col-lg-6 d-flex justify-content-around"}>
                    <div className={darkMode ? "mt-4" : "mt-4"}>
                        <i className={darkMode ? "icon-css3 text-light" : "icon-css3 text-dark"}></i>
                        <p className={darkMode ? "text-light" : "text-dark"}>CSS 3</p>
                    </div>
                    <div className={darkMode ? "mt-4" : "mt-4"}>
                        <i className={darkMode ? "icon-html5 text-light" : "icon-html5 text-dark"}></i>
                        <p className={darkMode ? "text-light" : "text-dark"}>HTML 5</p>
                    </div>
                </div>
                <div className={darkMode ? "col-md-12 col-lg-6" : "col-md-12 col-lg-6"}>
                    <div className={darkMode ? "bg-dark p-2 pt-4 pb-4 rounded" : "p-2 pt-4 pb-4 rounded"}>         
                        <h1 className={darkMode ? "mb-4 text-light" : "mb-4 text-dark"} >Learn and caught with us</h1>
                        <p className={darkMode ? "text-light" : "text-dark"}>What do you need ? <br></br> 
                        Creation of applications for all kind of companies, Supply our solutions online and many other of our services.</p>
                        <div>
                            <button className={darkMode ? "dark_object mr-2 btn0 position-relative text-info " : "mr-2 btn0 position-relative"} >
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
            : activeContent === "VIEW_BUILT" ?
            <div className="container row">
                <div className={darkMode ? "col-md-12 col-lg-6" : "col-md-12 col-lg-6"}>
                <ul className={darkMode ? "text-light" : "text-dark"}>
                        <i className="icon-code"></i> <li className={darkMode ? "text-light" : "text-dark"}>Companies Applications building</li> 
                        <i className="icon-code"></i> <li className={darkMode ? "text-light" : "text-dark"}>Optimization Search Engine(SEO)</li> 
                        <i className="icon-code"></i> <li className={darkMode ? "text-light" : "text-dark"}>Up your application to date</li> 
                        <i className="icon-code"></i> <li className={darkMode ? "text-light" : "text-dark"}>Databases management (NoSQL & MySQL) </li> 
                    </ul>
                </div>
                <div className={darkMode ? "col-md-12 col-lg-6" : "col-md-12 col-lg-6"}>
                    <div className={darkMode ? "bg-dark p-2 pt-4 pb-4 rounded" : "p-2 pt-4 pb-4 rounded"}>         
                        <h1 className={darkMode ? "mb-4 text-light" : "mb-4 text-dark"} >Let Tiska built one for you !</h1>
                        <p className={darkMode ? "text-light" : "text-dark"}>What do you need ? <br></br> 
                        Creation of applications for all kind of companies, Supply our solutions online and many other of our services.</p>
                        <div>
                            <button className="p-2 bg-dark_object" >
                                <input type="text" className="form-control" />
                            </button>
                            <button className={darkMode ? "dark_object mr-2 btn0 position-relative text-info " : "mr-2 btn0 position-relative"} >
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
            : activeContent === "VIEW_SOLUTIONS" ?
            <div className="container">
                <div className={darkMode ? "" : ""}>
                    <ul className={darkMode ? "text-light" : "text-dark"}>
                        <li className={darkMode ? "text-light" : "text-dark"}>Companies Applications building</li> 
                        <li className={darkMode ? "text-light" : "text-dark"}>Optimization Search Engine(SEO)</li> 
                        <li className={darkMode ? "text-light" : "text-dark"}>Up your application to date</li> 
                        <li className={darkMode ? "text-light" : "text-dark"}>Databases management (NoSQL & MySQL) </li> 
                    </ul> 
                </div>
                <div className={darkMode ? "" : ""}>
                    <div className={darkMode ? "bg-dark p-2 pt-4 pb-4 rounded" : "p-2 pt-4 pb-4 rounded"}>         
                        <h1 className={darkMode ? "mb-4 text-light" : "mb-4 text-dark"} >Tiska solutions</h1>
                        <p className={darkMode ? "text-light" : "text-dark"}>Is Tiska's solutions interest you ? <br></br> 
                        Write us on whatsapp for further information.</p>
                        <div className="row">
                            <div className={darkMode ? "col-md-6 col-lg-3" : "col-md-6 col-lg-3"} >

                                <div className={darkMode ? "dark_object btn0 position-relative m-1" : "btn0 position-relative m-1"} >
                                    <h5 className={darkMode? "text-light" : "text-dark"}>«« The Cba for universities »»</h5>
                                    <div className={darkMode? "text-light" : "text-dark"}>The Cba for universities is a solution which help to the last ones to share results and to their students to consult their bulltins in order to have a retroaction...</div>
                                    <div className="linebtns"> 
                                        <div className="linebtn"></div>
                                        <div className="linebtn"></div>
                                        <div className="linebtn"></div>
                                        <div className="linebtn"></div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : ""
            }
            
            
        </div>
    )
}

export default WhatchAndView;