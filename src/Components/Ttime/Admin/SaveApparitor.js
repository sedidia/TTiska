// import { useEffect, useState } from "react";
import IsLoading from "../../SmallComponents/IsLoading";
import { Link } from "react-router-dom";
import url from "../../Config/Config";
import { useState } from "react";
import SideLinks from "../SideLinks";

const SaveDoormen = ( {darkMode, hangeMoveContentPage, activeContent, etats, allDatas, setAllDatas} ) => {
    const [classeName, setClasseName] = useState('');

    const [doormen, setDoormen] = useState([]);

    
    
    // new doorman
    const [section, setSection] = useState('');
    const [userType, setUserType] = useState('doorman');
    const [univId, setUnivId] = useState("");
    const [userNumber, setUserNumber] = useState(0);

    const [ username, setUsername ] = useState(null);
    const [ emailAdress, setEmailAdress ] = useState(null);
    const [ filiere, setFiliere ] = useState(null);
    const [ promotion, setPromotion ] = useState(null);
    const [ accessCode, setAccessCode ] = useState(null);
    const [ rememberMe, setRememberMe ] = useState(false);
    const [ isOnline, setisOnline ] = useState(false);
    const [ accountConfirmed, setAccountConfirmed ] = useState(false);
    // new doorman

    
    const [numberError, setNumberError] = useState(true);
    const uniqueAccessCode = Math.random().toString(36).substr(2, 9);

    const validatePhoneNumber = (e) => {    
        setUserNumber(e.target.value);
        setNumberError(/^\d{10}$/.test(e.target.value) ? false : true);
    };

    const handleChanges = (e, title) => {
        setUnivId(etats.univId)
        setAccessCode(uniqueAccessCode)
        console.log(uniqueAccessCode);
        title === "userNumber" ? validatePhoneNumber(e) : setSection(e.target.value)
    }

    const handleAddUser = (e) => {
        e.preventDefault()
        // const newClass = { userNumber, section, userType, univId };
        const newClass = { 
            username, 
            userNumber, 
            emailAdress,
            userType, 
            section, 
            filiere, 
            promotion, 
            rememberMe, 
            isOnline, 
            accessCode, 
            univId, 
            accountConfirmed
        };
        if(!numberError && section !== ""){
            const iFind =  allDatas.users.find(obj => obj.userNumber === userNumber);

            if (iFind) {
                setNumberError(true);
                console.log("Un objet avec la date spécifiée a été trouvé:", iFind);
            } else {
                // setNumberError(false);
                console.log("Aucun objet avec la date spécifiée n'a été trouvé.");
                setDoormen([...doormen, newClass]); 
                setUserNumber(0);
                setSection('');
                console.log("Ajouté avec succès !");
                return;
            }
        }
        console.log("Veuillez renseigner tous les champs !");
    }

    const handleSendClasses = () => {
        if (doormen.length > 0) {
            fetch(`${url.urlApi}/saveDoormen`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(doormen),
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
            return
        }
        console.log("Vous ne pouvez pas envoyer un tableau sans objets...");
    }

    const handleSendData = (e) => {
        e.preventDefault()
        if(section !== "" && !numberError){
            handleAddUser()
            handleSendClasses()
            setDoormen([])
            console.log(doormen);
            return
        }
        handleSendClasses()
        setDoormen([])
        console.log(doormen);

    };

    return (
        <div className={darkMode ? "d-flex justify-content-center align-items-center mt-4 text-light container":"d-flex justify-content-center align-items-center mt-4 container"}>     
            <div className="row">     
                <div className="col-md-12 col-lg-6">
                    <h2 className={darkMode ? "pb-4 text-light" : "pb-4 text-dark"}>Enregistrer les appariteurs.</h2>
                    <div className={darkMode ? "dark_object rounded p-4 position-relative " : "bg-white rounded p-4 position-relative "}>
                        <div className="card-body pt-3">
                            <h2 className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Enregistrer les appariteurs pour {etats.univId}.</h2>
                            
                            <form className="was-validated">
                                <label htmlFor="userNumber" className={"d-flex justify-content-between mt-4 mb-1"}>
                                    {numberError ? "Le numéro de telephone doit contenir 10 chiffres.":
                                    "Merci d'avoir entré un numéro valide !"
                                    }
                                </label>
                                <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="number" id="userNumber" value={userNumber} name="userNumber" onChange={ (e) => handleChanges(e, "userNumber") } placeholder="The the number of the doorman" required /> 
                                
                                <label htmlFor="section" className={"d-flex justify-content-between mt-4 mb-1"}>
                                    {(section === null || section === "" || section === " ") ? "Le nom de la section ne doit pas etre vide.":
                                    "Merci d'avoir saisi un nom valide !"
                                    }
                                </label>
                                <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="text" id="section" value={section} name="section" onChange={ (e) => handleChanges(e, "section") } placeholder="The section's name" required /> 
                                
                                
                                <div className="d-flex mt-4">
                                    <button className="btn btn-outline-info" onClick={handleAddUser}>Add</button>
                                    {doormen.length > 0 ?
                                    <button className="btn btn-outline-info" onClick={handleSendData}>Send</button>
                                    :""}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-lg-6">
                    <SideLinks hangeMoveContentPage={hangeMoveContentPage} activeContent={activeContent} etats={etats} />
                </div>
            </div>
        </div>
    )
}
export default SaveDoormen;