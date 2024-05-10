import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import url from "../Config/Config";

// ttiskaSync, users sont à faire passer en paramettre

const UserForm = ( {darkMode, setActiveContent, etats, setEtats, allDatas, setAllDatas } ) => {
  // the users collection
  const uniqueAccessCode = Math.random().toString(36).substr(2, 9);

  const [step, setStep] = useState("number");
  const [activeStep, setActiveStep] = useState("number");
  const [activeBtn, setActiveNextStep] = useState(false);

  const [unConfirmed, setUnConfirmed] = useState(false);

  const [userNumber, setUserNumber] = useState(1);
  const [accessCode, setAccessCode] = useState("");
  const [emailAdress, setEmailAdress] = useState("");
  const [filiere, setFiliere] = useState("");
  const [promotion, setPromotion] = useState("");
  const [section, setSection] = useState("");
  const [univId, setUnivId] = useState("");
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [accountConfirmed, setAccountConfirmed] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const [numberError, setNumberError] = useState(true);
  const [userNameError, setUserNameError] = useState(true);
  const [emailAdressError, setEmailAdressError] = useState(true);
  const [accessCodeError, setAccessCodeError] = useState(true);


  const ttiskaSync = async () => {
    try {
      // Envoie de la requête à la route qui récupère toutes les collections de la base de données "local"
      const response = await fetch('http://localhost:3001/collections');
      const data = await response.json();
      
      setAllDatas(data);

    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };
    
  const sendDataToServer = async () => {
      // saveDoormen
      try {
        // const response = await axios({ method: 'post', url: 'http://localhost:3001/saveUsers', data: formData });
        // const response = await axios.post(`${url.urlApi}/saveUsers`, 
        const response = await axios.post(`${url.urlApi}/saveDoormen`, 
        [{
            "username": username,
            "userNumber": userNumber,
            "emailAdress": emailAdress,
            "userType": userType,
            "section": section,
            "filiere": filiere,
            "promotion": promotion,
            "rememberMe": rememberMe,
            "isOnline": isOnline,
            "accessCode": uniqueAccessCode,
            "univId": univId,
            "accountConfirmed": accountConfirmed
          }]
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
    setNumberError(/^\d{9}$/.test(e.target.value) ? false : true);
      const adts = allDatas.users.filter(number => number.userNumber === e.target.value)
      if(e.target.value.length === 9){
        setNumberError(false)
        if(adts.length === 1){
          adts.filter(find => {
            if(find.accountConfirmed){            
              setStep("enterAccessCode")
              // states init
              setEtats(find !== undefined ? find : {});
              console.log(find.accessCode);
              // states init
              return
            }
            setUserNumber(find.userNumber)
            // setAccessCode(find.accessCode)
            setEmailAdress(find.emailAdress)
            setFiliere(find.filiere)
            setPromotion(find.promotion)
            setSection(find.section)
            setUnivId(find.univId)
            setUserType(find.userType)
            setUsername(find.username)
            setIsOnline(true)
            setAccountConfirmed(true)
            setRememberMe(find.rememberMe)

            setUnConfirmed(true)

            setStep("username_emailadress")
            console.log("non confirmé");
          } )
    
          return
        }
        setStep("username_emailadress")
      }else{
        setNumberError(true)
      }
  };
  const validateUsername = (e) => {    
    setUsername(e.target.value);
    setUserNameError(e.target.value.length <= 3 ? true : false);

    if(e.target.value.length > 3){
      emailAdressError === "valid" ? setStep("userType") : setStep("username_emailadress")
    }
    
  };
  const validateEmail = (e) => {
    setEmailAdress(e.target.value);

    const emailExiste = allDatas.users.find(user => user.emailAdress === e.target.value);
    setEtats(emailExiste !== undefined ? emailExiste : {});
    if (emailExiste) {
      setEmailAdressError("taken");
    }
    setEmailAdressError(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value) ? "valid" : "invalid");
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)){
      !userNameError ? setStep("userType") : setStep("username_emailadress")
    }
    
  };

  const checkAccessCode = (etargetvalue) => {
    setAccessCode(etargetvalue)

    const stateUser = allDatas.users.filter(number => number.userNumber === userNumber)
    if(stateUser.length === 1){
      stateUser.filter(find => {
        console.log(find.accessCode+" === "+etargetvalue);
        console.log(find);
        setEtats(find)
        if(find.accessCode === etargetvalue){
          if(find.userType === "university" || find.userType === "doorman" || find.userType === "teacher"|| find.userType === "student"){
            setActiveContent("HomeUniv")
            return
          }
          setActiveContent("Home")
          return
        }
        setAccessCodeError(true)
      } )

      return
    }
    
    
    
  }
  const hendleNextStep = (e) => {
    e.preventDefault()

    if(unConfirmed && activeStep === "username_emailadress"){
               
      setStep("enterAccessCode")
      setActiveStep("confirmNow")
    }else{
      setActiveStep(step)
    }

    if((userType === "university" && univId !== "") || (userType === "teacher") || (userType === "doorman" && activeStep === "confirmNow") || (userType === "student" && univId !== "" && section !== "" && filiere !== "" && promotion !== "")){
      console.log("envoi...............");
      sendDataToServer()
    }
  }

  const hendleTypeUser = (data) => {
    setUserType(data)
    if(data === "normal"){
      // enregistrement de l'utilisateur
      sendDataToServer()
    }
    if(data === "university"){
      setStep("university")
    }
    if(data === "student"){
      setStep("student")
    }
  }

  const handleUniv_section_filiere_promotion = (e, title) => {
    console.log(e.target.value);
    if(title === "univId"){
      setUnivId(e.target.value)
      setStep(activeStep)
      if(userType === "university"){
        setStep("enterAccessCode")
      }
    }
    if(title === "section"){
      setSection(e.target.value)
      setStep(activeStep)
    }
    if(title === "filiere"){
      setFiliere(e.target.value)
      setStep(activeStep)
    }
    if(title === "promotion"){
      setPromotion(e.target.value)
      setStep("enterAccessCode")
    }

    

  }

  useEffect(() => {
    ttiskaSync()
  }, [])

  return (
    <div className={darkMode ? "container d-flex justify-content-center mt-4 text-light" : "container d-flex justify-content-center mt-4"}>
            
      <form className={darkMode ? "was-validated dark_object rounded p-4 position-relative mb-4" : "was-validated bg-white rounded p-4 position-relative mb-4"}>

        {activeStep === "enterAccessCode" ?
        <div>      
          <h2>Please confirm it's you !</h2>
          <p className={"p-2"}>Please enter your access code to confirm it's you. </p>
            
          <label htmlFor="accessCode" className={accessCodeError ? "d-flex justify-content-between text-danger mt-4 mb-1":"d-flex justify-content-between mt-4 mb-1"}>{numberError ? "Votre code d'accès.*":"Pas de correspondance des codes d'accès.*"}</label>
          <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"} type="text" id="accessCode" name="accessCode" value={accessCode} onChange={ (e) => checkAccessCode(e.target.value) } placeholder="Votre code d'accès" /> 
        </div>
        :""}

        {activeStep === "number" ?
        <div>
          <label htmlFor="userNumber" className={numberError ? "d-flex mb-1 mt-4 text-danger" : "d-flex mb-1 mt-4"}>Votre numéro de telephone</label>
          <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"} type="number" id="userNumber" name="userNumber" value={userNumber} onChange={validatePhoneNumber} placeholder='Votre numero de telephone' /> 
        </div>
        :""}

        {activeStep === "username_emailadress" ?
        <div>
          <label htmlFor="username" className={userNameError ? "d-flex mb-1 mt-4 text-danger" : "d-flex mb-1 mt-4"}>Votre nom d'utilisateur...</label>
          <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"} type="text" id="username" name="username" value={username} onChange={validateUsername} placeholder="Your Username" /> 
          
          <label htmlFor="emailAdress" className={emailAdressError === "invalid" || emailAdressError === "taken" ? "d-flex mb-1 mt-4 text-danger" : "d-flex mb-1 mt-4"}>{emailAdressError === "valid" ? "Merci d'avoir saisi une adresse email valide" : emailAdressError === "invalid" ? "L'adresse email saisi est incorrecte" : emailAdressError === "taken" ? "L'adresse email saisi est déjà prise" : "Veillez saisir votre adresse email"} </label>
          <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="email" id="emailAdress" value={emailAdress} name="emailAdress" onChange={validateEmail} placeholder="Your Email adress" />
        </div>
        :""}
        
        {activeStep === "userType" ?
        <div className="row">
          <div className="col-md-6 col-lg-4 p-2">
              {/* <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Send your money from where you are to anyone accross us. </p> */}
              <div className={
                userType === "normal" && darkMode ? "p-4  bg-primary checkType" :
                userType === "normal" && !darkMode ? "p-4 bg-dark text-light checkType" :
                userType !== "normal" && darkMode ? "p-4 dark_object checkType" 
                : "p-4 bg-white checkType"} onClick={() => hendleTypeUser("normal")}>
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
              : "p-4 bg-white checkType"} onClick={() => hendleTypeUser("university")}>
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
              userType === "student" && darkMode ? "p-4  bg-primary checkType" :
              userType === "student" && !darkMode ? "p-4 bg-dark text-light checkType" :
              userType !== "student" && darkMode ? "p-4 dark_object checkType" 
              : "p-4 bg-white checkType"} onClick={() => hendleTypeUser("student")}>
              <aside className="d-flex justify-content-center align-items-center">
                {/* <i className="icon-money text-danger p-2"></i> */}
                <h4>I'm an student at the university</h4>
              </aside>
              {/* <Link className="btn btn-outline-info" to="#" onClick={() => setUserType("student")}>Create a student's account</Link> */}
            </div>
          </div>
        </div>
        :""}

        {activeStep === "university" ?
        <div>

          <label htmlFor="univId" className="d-flex mb-1 mt-4">Votre université...</label>
          <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="text" id="univId" value={univId} name="univId" onChange={ (e) => handleUniv_section_filiere_promotion(e, "univId") } placeholder="Le nom de votre université..." />
        </div>
        :""}
        {activeStep === "student" ?
        <div>
          <label htmlFor="univId" className="d-flex mb-1 mt-4">Votre université...</label>
          <select name="univId" value={univId} onChange={ (e) => handleUniv_section_filiere_promotion(e, "univId") } className="form-control">
            <option value={""}>Veillez choisir votreuniversité</option>
              {allDatas.courses
              .map(item => (
                  <option key={item._id} value={item.univId}>{item.univId}</option>
              ))}
          </select>

          <label htmlFor="section" className="d-flex mb-1 mt-4">Votre section...</label>
          <select name="section" value={section} onChange={ (e) => handleUniv_section_filiere_promotion(e, "section") } className="form-control">
            <option value={""}>Veillez choisir votreuniversité</option>
              {allDatas.courses
              .filter(item => item.univId === univId)
              .map(item => (
                  <option key={item._id} value={item.section}>{item.section}</option>
              ))}
          </select>

          <label htmlFor="filiere" className="d-flex mb-1 mt-4">Votre filière...</label>
          <select name="filiere" value={filiere} onChange={ (e) => handleUniv_section_filiere_promotion(e, "filiere") } className="form-control">
            <option value={""}>Veillez choisir votreuniversité</option>
              {allDatas.courses
              .filter(item => item.univId === univId)
              .filter(item => item.section === section)
              .map(item => (
                  <option key={item._id} value={item.filiere}>{item.filiere}</option>
              ))}
          </select>
          
          <label htmlFor="promotion" className="d-flex mb-1 mt-4">Votre promotion...</label>
          <select name="promotion" value={promotion} onChange={ (e) => handleUniv_section_filiere_promotion(e, "promotion") } className="form-control">
            <option value={""}>Veillez choisir votreuniversité</option>
              {allDatas.courses
              .filter(item => item.univId === univId)
              .filter(item => item.section === section)
              .filter(item => item.filiere === filiere)
              .map(item => (
                  <option key={item._id} value={item.promotion}>{item.promotion}</option>
              ))}
          </select>
          
        </div>
        :""}

        {(userType === "normal" && activeStep === "userType") || activeStep === "student"  || activeStep === "university" || (activeStep === "confirmNow" && unConfirmed) ?
        <div className="form-check form-switch d-flex justify-content-start mt-4">
          <input className="form-check-input m-2" type="checkbox" checked={rememberMe} onChange={ (e)=> setRememberMe(e.target.checked) } id="flexSwitchCheckDefault" />
          <label className="form-check-label m-2" htmlFor="flexSwitchCheckDefault">Se souvenir de moi</label>
        </div>
        :""}

        <button className='btn btn-outline-info mt-4' onClick={hendleNextStep}>
          {(userType === "normal" && activeStep === "userType") || activeStep === "student"  || activeStep === "university" || activeStep === "confirmNow" ? "Confirmer" : "Suivant"}
        </button>

                  
      </form>
      
    </div>
  );
};
      
export default UserForm;