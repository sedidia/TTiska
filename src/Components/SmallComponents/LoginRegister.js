import { FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = ( {darkMode} ) => {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <div className="">
            {isLogin ?
            // LOGIN
            <div className="p-2 text-center">

                <h4 className={darkMode ? "text-light p-2" : "text-dark p-2"}>LOGIN ON TTiska</h4>
                <p className={darkMode ? "text-light pb-2" : "text-dark pb-2"}>Fill up your informations in order to access your account.</p>

                <FormLabel htmlFor="firstName" className={darkMode ? "text-light d-flex flex-direction-column" : "text-dark d-flex flex-direction-column"}>Your UserName ... <i className="text-danger">*</i> </FormLabel>
                <input type="text" id="firstName" placeholder="Your First name" className={darkMode ? "form-control mb-4 bg-dark text-light" : "form-control mb-4"} />
                <FormLabel htmlFor="emailAddress" className={darkMode ? "text-light d-flex flex-direction-column" : "text-dark d-flex flex-direction-column"}>Your Email Address ... <i className="text-danger">*</i></FormLabel>
                <input type="text" id="emailAddress" placeholder="Your Email Address" className={darkMode ? "form-control mb-4 bg-dark text-light" : "form-control mb-4"} />
                
                <Link to="#" className={darkMode ? "btn bg-light text-dark w-100 mb-4" : "btn bg-info text-dark w-100 mb-4"}>Log-in TTiska.</Link>
                <Link to="#" className={darkMode ? "text-light w-100 text-decoration-none" : "text-dark w-100 text-decoration-none"} onClick={() => setIsLogin(false)}>I wanna register TTiska.</Link>
                        
            </div>
            :
            // REGISTER
            <div className="p-2 text-center">

                <h4 className={darkMode ? "text-light p-2" : "text-dark p-2"}>REGISTER ON TTiska</h4>
                <p className={darkMode ? "text-light pb-2" : "text-dark pb-2"}>Fill up your informations in order to access your account.</p>

                <FormLabel htmlFor="firstName" className={darkMode ? "text-light d-flex flex-direction-column" : "text-dark d-flex flex-direction-column"}>Your UserName ... <i className="text-danger">*</i> </FormLabel>
                <input type="text" id="firstName" placeholder="Your First name" className={darkMode ? "form-control mb-4 bg-dark text-light" : "form-control mb-4"} />
                
                <FormLabel htmlFor="phoneNumber" className={darkMode ? "text-light d-flex flex-direction-column" : "text-dark d-flex flex-direction-column"}>Your Phone Number ... <i className="text-danger">*</i></FormLabel>
                <input type="number" id="phoneNumber" placeholder="Your Phone Number..." className={darkMode ? "form-control mb-4 bg-dark text-light" : "form-control mb-4"} />
                
                <FormLabel htmlFor="emailAddress" className={darkMode ? "text-light d-flex flex-direction-column" : "text-dark d-flex flex-direction-column"}>Your Email Address ... <i className="text-danger">*</i></FormLabel>
                <input type="text" id="emailAddress" placeholder="Your First name" className={darkMode ? "form-control mb-4 bg-dark text-light" : "form-control mb-4"} />
                
                <Link to="#" className={darkMode ? "btn bg-light text-dark w-100 mb-4" : "btn bg-info text-dark w-100 mb-4"}>Register on TTiska.</Link>
                <Link to="#" className={darkMode ? "text-light w-100 text-decoration-none" : "text-dark w-100 text-decoration-none"} onClick={() => setIsLogin(true)}>I wanna Log-in TTiska.</Link>
                        
            </div>
            }
        </div>
    )
}

export default Login;