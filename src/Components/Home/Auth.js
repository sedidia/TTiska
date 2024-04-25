import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import emailjs from "emailjs-com";

// ttiskaSync, users sont à faire passer en paramettre

const UserForm = ( {darkMode, setActiveContent, etats, setEtats, allDatas, setAllDatas } ) => {
  // the users collection
  const [users, setUsers] = useState([]);

  const [stepRegisterContent, setStepRegisterContent] = useState("homeReg");
  const [errorMessage, setErrorMessage] = useState(null);

  // manage errors
  const [numberError, setNumberError] = useState(true);
  const [userNameError, setUserNameError] = useState(true);
  const [emailAdressError, setEmailAdressError] = useState("empty");

  // const [accountExist, setAccountExist] = useState(false);

  const [ username, setUsername ] = useState("");
  const [ userNumber, setUserNumber ] = useState(0);
  const [ emailAdress, setEmailAdress ] = useState("");
  const [ userType, setUserType ] = useState("normal"); // none, normal, company, university, apparitor, teacher, student
  const [ section, setSection ] = useState(null);
  const [ filiere, setFiliere ] = useState(null);
  const [ promotion, setPromotion ] = useState(null);
  const [ univId, setUnivId ] = useState(null);
  const [ accessCode, setAccessCode ] = useState("");
  const [ rememberMe, setRememberMe ] = useState(false);
  const [ isOnline, setisOnline ] = useState(true);
  const [ accountConfirmed, setAccountConfirmed ] = useState(true);

  // fonction d'envoi de mail
  function sendEmail(e,to_name,to_email,message) {
    e.preventDefault();
    const templateParams = {
      from_name: 'UNILU',
      from_email: 'sedidiak@gmail.com',
      to_name: to_name,
      to_email: to_email,
      message: message
    };
  
    emailjs.send('service_zag6nfb', 'template_g3gx1ll', templateParams, "f1f1daRRgGiNdplgo")
    .then((result) => {
      console.log(result.text);
      console.log("Email envoyé avec succès !");
    }, (error) => {
      console.log(error.text);
      console.log("Email non envoyé !");
    });
  }
  // fonction d'envoi de mail

  const ttiskaSync = async () => {
    try {
      // Envoie de la requête à la route qui récupère toutes les collections de la base de données "local"
      const response = await fetch('http://localhost:3001/collections');
      const data = await response.json();
      
      setUsers(data.users); // collection "users"

      console.log(data);
      setAllDatas(data);
      // console.log(data.startup_log);
      // setServerData(data);

      initActiveUser("start", data.users)

      // setisOnline(true)
      // setAccountConfirmed(true)
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  useEffect(() => {
    ttiskaSync();
    // setAccessCode("SK9LMZ03")
  }, []);

  const sendDataToServer = async () => {
    try {
      // const response = await axios({ method: 'post', url: 'http://localhost:3001/saveUsers', data: formData });
      const response = await axios.post('http://localhost:3001/saveUsers', 
      {
          "username": username,
          "userNumber": userNumber,
          "emailAdress": emailAdress,
          "userType": userType,
          "section": section,
          "filiere": filiere,
          "promotion": promotion,
          "rememberMe": rememberMe,
          "isOnline": isOnline,
          "accessCode": accessCode,
          "univId": univId,
          "accountConfirmed": accountConfirmed
        }
      );
  
      if (response.status === 200) {
          console.log('Réponse de l\'API :', response);
          ttiskaSync();
      } else {
          console.error('#1. Erreur lors de l\'envoi du fichier :', response);
      }
    } catch (error) {
        console.error('#2. Erreur lors de l\'envoi :', error);
    }
  };

  // validations
  const validatePhoneNumber = (e) => {    
    setUserNumber(e.target.value);
    setNumberError(/^\d{10}$/.test(e.target.value) ? false : true);
  };
  const validateUsername = (e) => {    
    setUsername(e.target.value);
    setUserNameError(e.target.value.length <= 3 ? true : false);
  };
  const validateEmail = (e) => {
    setEmailAdress(e.target.value);
    setEmailAdressError(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value) ? "valid" : "invalid");
    
    const userExiste = users.find(user => user.emailAdress === e.target.value);
    setEtats(userExiste !== undefined ? userExiste : {});
    if (userExiste) {
      setEmailAdressError("taken");
    }
  };

  const handleCheckSteps = (e) => {
    e.preventDefault()
    if(!numberError && !userNameError){
      handleUsersInfos();
    }else{
      console.log("Veillez remplir tous les champs");
    }
  }

  
  const handleUsersInfos = () => {
    if(stepRegisterContent === "homeReg" && username !== "" && userNumber !== 0){
      // init function
      initActiveUser("check user", users)
    }else{
      setErrorMessage("The username and the number mustn't be empty, please supply them !");
    }
    if(stepRegisterContent === "chooseAcoutType" && userType !== ""){
      setStepRegisterContent("confirmAccount")
    }
    if(stepRegisterContent === "confirmAccount"){
      if (emailAdressError === "valid") {
        sendDataToServer()
      }


    }
  }

  const initActiveUser = (message, data) => {
    const userExiste = data.find(user => user.userNumber === userNumber.toLocaleString);
    const numberANDusername = data.find(user => 
      user.userNumber === userNumber &&
      user.username.toLocaleString() === username.toLocaleString()
    );
    
    setEtats(numberANDusername !== undefined ? userExiste : {});
    if (numberANDusername && numberANDusername.accountConfirmed) {
      setEtats(numberANDusername);
      if(numberANDusername.userType === "university" || numberANDusername.userType === "apparitor"|| numberANDusername.userType === "student"){
        setActiveContent("HomeUniv")
        return
      }
      setActiveContent("Home")
    } else {
      if(userExiste){
        setStepRegisterContent("confirmAccount")
      }else{
        if(message !== "start"){
          setStepRegisterContent("chooseAcoutType")
          return
        }
      }
    }
  } 
  

  return (
    <div className={darkMode ? "container d-flex justify-content-center mt-4 text-light" : "container d-flex justify-content-center mt-4"}>
      <div>
          <form className="was-validated">
            
            {stepRegisterContent === "homeReg" ?
            <div className={darkMode ? "dark_object rounded p-4 position-relative mb-4" : "bg-white rounded p-4 position-relative mb-4"}>
              <div className="card-body pt-3">
                <h5 className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Please tell a bit us about you !</h5>
                {userNameError || numberError ?
                <p>Veillez renseigner un nom d'utilisateur et un numero valide <br/> pour pouvoir vous connecter ou vous inscrire.</p>
                :
                <p>Merci d'avoir renseigner les nom d'utilisateur et numero valide <br/> Saisissez votre code d'accès pour acceder à la plateforme.</p>
                }
                <p className='text-danger'>{errorMessage}</p>
                <Link to="/" onClick={(e) => sendEmail(e,"idris","sedidia01@gmail.com","salut !")}>Envoyer email</Link>
                

                <label htmlFor="username" className={
                  userNameError ? "d-flex justify-content-between text-danger mt-4 mb-1":"d-flex justify-content-between mt-4 mb-1"}
                >{userNameError ? "Veuillez saisir un nnom d'utilisateur valide (+ de 4 caractères).":"Votre Nom d'utilisateur*"}</label>
                <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"} type="text" id="username" name="username" value={username} onChange={validateUsername} placeholder="Your Username" /> 
                
                <label htmlFor="userNumber" className={numberError ? "d-flex justify-content-between text-danger mt-4 mb-1":"d-flex justify-content-between mt-4 mb-1"}>{numberError ? "Veuillez saisir un numéro de téléphone valide (10 chiffres).":"Votre Numero de telephone*"}</label>
                <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"} type="number" id="userNumber" name="userNumber" value={userNumber} onChange={validatePhoneNumber} placeholder='Votre numero de telephone' /> 
                {stepRegisterContent === "homeReg" ?
                  <button className='btn btn-outline-info mt-4' onClick={handleCheckSteps}>Follow the nest step / Login</button>
                : ""}
              </div>
            </div>
          
            : stepRegisterContent === "chooseAcoutType" ?
            <div className='acountType'>
              <h2>What kind of account do you need?</h2>
              <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Please choose an account type you want to create. </p>

              <div className="row">
                <div className="col-md-6 col-lg-4 p-2">
                  {/* <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Send your money from where you are to anyone accross us. </p> */}
                  <div className={
                    userType === "normal" && darkMode ? "p-4  bg-primary checkType" :
                    userType === "normal" && !darkMode ? "p-4 bg-dark text-light checkType" :
                    userType !== "normal" && darkMode ? "p-4 dark_object checkType" 
                    : "p-4 bg-white checkType"} onClick={() => setUserType("normal")}>
                    <aside className="d-flex justify-content-center align-items-center">
                      {/* <i className="icon-money text-danger p-2"></i> */}
                      <h4>I want to create a normal account</h4>
                    </aside>
                    {/* <Link className="btn btn-outline-info" to="#" onClick={() => setUserType("normal")}>Create a normal account</Link> */}
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 p-2">
                  {/* <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Send your money from where you are to anyone accross us. </p> */}
                  <div className={
                    userType === "university" && darkMode ? "p-4  bg-primary checkType" :
                    userType === "university" && !darkMode ? "p-4 bg-dark text-light checkType" :
                    userType !== "university" && darkMode ? "p-4 dark_object checkType" 
                    : "p-4 bg-white checkType"} onClick={() => setUserType("university")}>
                    <aside className="d-flex justify-content-center align-items-center">
                      {/* <i className="icon-money text-danger p-2"></i> */}
                      <h4>I'm an administrator on my university</h4>
                    </aside>
                    {/* <Link className="btn btn-outline-info" to="#" onClick={() => setUserType("university")}>Create a administrator's account</Link> */}
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 p-2">
                  {/* <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Send your money from where you are to anyone accross us. </p> */}
                  <div className={
                    userType === "apparitor" && darkMode ? "p-4  bg-primary checkType" :
                    userType === "apparitor" && !darkMode ? "p-4 bg-dark text-light checkType" :
                    userType !== "apparitor" && darkMode ? "p-4 dark_object checkType" 
                    : "p-4 bg-white checkType"} onClick={() => setUserType("apparitor")}>
                    <aside className="d-flex justify-content-center align-items-center">
                      {/* <i className="icon-money text-danger p-2"></i> */}
                      <h4>I'm an apparitor on my university</h4>
                    </aside>
                    {/* <Link className="btn btn-outline-info" to="#" onClick={() => setUserType("apparitor")}>Create an apparitor's account</Link> */}
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 p-2">
                  {/* <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Send your money from where you are to anyone accross us. </p> */}
                  <div className={
                    userType === "teacher" && darkMode ? "p-4  bg-primary checkType" :
                    userType === "teacher" && !darkMode ? "p-4 bg-dark text-light checkType" :
                    userType !== "teacher" && darkMode ? "p-4 dark_object checkType" 
                    : "p-4 bg-white checkType"} onClick={() => setUserType("teacher")}>
                    <aside className="d-flex justify-content-center align-items-center">
                      {/* <i className="icon-money text-danger p-2"></i> */}
                      <h4>I'm a teacher on my university</h4>
                    </aside>
                    {/* <Link className="btn btn-outline-info" to="#" onClick={() => setUserType("teacher")}>Create a teacher's account</Link> */}
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 p-2">
                  {/* <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Send your money from where you are to anyone accross us. </p> */}
                  <div className={
                    userType === "student" && darkMode ? "p-4  bg-primary checkType" :
                    userType === "student" && !darkMode ? "p-4 bg-dark text-light checkType" :
                    userType !== "student" && darkMode ? "p-4 dark_object checkType" 
                    : "p-4 bg-white checkType"} onClick={() => setUserType("student")}>
                    <aside className="d-flex justify-content-center align-items-center">
                      {/* <i className="icon-money text-danger p-2"></i> */}
                      <h4>I'm an student at the university</h4>
                    </aside>
                    {/* <Link className="btn btn-outline-info" to="#" onClick={() => setUserType("student")}>Create a student's account</Link> */}
                  </div>
                </div>
              </div>
            </div>
            : stepRegisterContent === "confirmAccount" ?
            <div className={darkMode ? "dark_object rounded p-4 position-relative mb-4" : "bg-white rounded p-4 position-relative mb-4"}>
              <div className="card-body pt-3">
                <h2 className='card-title pb-4'>Please tell a bit us about you !</h2>
                {/* <p>Veillez changer ce numéro car il est déjà utilisé par une autre personne,<p/> si c'est vous, veillez vous connecter.</p> */}
                
                <label htmlFor="emailAdress" className={
                  (emailAdressError === "invalid" || emailAdressError === "taken") ? "d-flex justify-content-between text-danger mt-4 mb-1":
                  emailAdressError === "empty" ? "d-flex justify-content-between mt-4 mb-1"
                  :"d-flex justify-content-between mt-4 mb-1"}>

                    {emailAdressError === "invalid" ? "Veillez saisir une adresse email valide !":
                    emailAdressError === "empty" ? "Veillez saisir votre email":
                      emailAdressError === "taken" ? "L'adresse email saisi est déjà prise. Veillez changer !" :
                      "Merci d'avoir saisi une adresse email valide !"
                    }
                </label>
                <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="email" id="emailAdress" value={emailAdress} name="emailAdress" onChange={validateEmail} placeholder="Your Email adress" />

                {userType === "university" || userType === "apparitor" || userType === "teacher" || userType === "student" ?
                <div>
                  <label htmlFor="univId" className={"d-flex justify-content-between mt-4 mb-1"}>

                      {(univId=== null || univId=== "" || univId === " ") ? "Le nom de l'université doit contenir plus de 3 caractères.":
                      "Merci d'avoir saisi un nom d'université valide !"
                      }
                  </label>
                  <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="text" id="univId" value={univId} name="univId" onChange={(e) => setUnivId(e.target.value)} placeholder="Your university's name" />
                </div>
                :""}
                
                {userType === "apparitor" || userType === "student" ?
                <div>
                  <label htmlFor="section" className={"d-flex justify-content-between mt-4 mb-1"}>

                      {(section === null || section === "" || section === " ") ? "Le nom de la section ne doit pas etre vide.":
                      "Merci d'avoir saisi un nom de section valide !"
                      }
                  </label>
                  <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="text" id="section" value={section} name="section" onChange={(e) => setSection(e.target.value)} placeholder="Your section's name" /> 
                </div>
                :""}

                {userType === "student" ?
                <div>
                  <label htmlFor="filiere" className={"d-flex justify-content-between mt-4 mb-1"}>

                      {(filiere === null || filiere === "" || filiere === " ") ? "Le nom de la filiere ne doit pas etre vide.":
                      "Merci d'avoir saisi un nom de filiere valide !"
                      }
                  </label>
                  <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="text" id="filiere" value={filiere} name="filiere" onChange={(e) => setFiliere(e.target.value)} placeholder="Your option's name" /> 
                  <label htmlFor="promotion" className={"d-flex justify-content-between mt-4 mb-1"}>

                      {(promotion === null || promotion === "" || promotion === " ") ? "Le nom de la promotion ne doit pas etre vide.":
                      "Merci d'avoir saisi un nom de promotion valide !"
                      }
                  </label>
                  <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="text" id="promotion" value={promotion} name="promotion" onChange={(e) => setPromotion(e.target.value)} placeholder="Your promotion's name" /> 
                </div>
                :""}

              </div>
              <div>
                <div className="form-check form-switch d-flex justify-content-start mt-4">
                  <input className="form-check-input m-2" type="checkbox" checked={rememberMe} onChange={ (e)=> setRememberMe(e.target.checked) } id="flexSwitchCheckDefault" />
                  <label className="form-check-label m-2" htmlFor="flexSwitchCheckDefault">Se souvenir de moi</label>
                </div>

                <button className={"btn btn-outline-info mt-4"} type="button" onClick={handleCheckSteps}>Confirm your TTiska account</button>
              </div>
            </div>
            : ""}
            
            {(stepRegisterContent === "chooseAcoutType" && userType !== "") ?
            <button className='btn btn-outline-info mt-4' onClick={handleCheckSteps}>Follow the nest step / Login</button>
            : ""}
            
        
          </form>
      </div>


    </div>
  );
};

export default UserForm;
