// import { useEffect, useState } from "react";
import IsLoading from "../../SmallComponents/IsLoading";
import { Link } from "react-router-dom";
import url from "../../Config/Config";
import { useEffect, useState } from "react";
import SideLinks from "../SideLinks";
import { isNumber } from "lodash";

const SaveDoormen = ( {darkMode, hangeMoveContentPage, activeContent, etats, allDatas, setAllDatas, handleSuccess} ) => {
    const [classeName, setClasseName] = useState('');

    const [doormen, setDoormen] = useState([]);
    const [sections, setSections] = useState([]);

    
    
    // new doorman
    const [section, setSection] = useState('');
    const [userType, setUserType] = useState('doorman');
    const [univId, setUnivId] = useState("");
    const [userNumber, setUserNumber] = useState("");

    const [ username, setUsername ] = useState("");
    const [ emailAdress, setEmailAdress ] = useState("");
    const [ filiere, setFiliere ] = useState("");
    const [ promotion, setPromotion ] = useState("");
    const [ accessCode, setAccessCode ] = useState(null);
    const [ rememberMe, setRememberMe ] = useState(false);
    const [ isOnline, setisOnline ] = useState(false);
    const [ accountConfirmed, setAccountConfirmed ] = useState(false);
    // new doorman

    
    const [numberError, setNumberError] = useState(true);
    const uniqueAccessCode = Math.random().toString(36).substr(2, 9);

    const validatePhoneNumber = (e) => {    
        setUserNumber(e.target.value);
        setNumberError(/^\d{9}$/.test(e.target.value) ? false : true);
    };

    const handleChanges = (e, title) => {
        setUnivId(etats.univId)
        setAccessCode(uniqueAccessCode)
        // console.log(uniqueAccessCode);
        title === "userNumber" ? validatePhoneNumber(e) : setSection(e.target.value)
    }

    const handleAddUser = (message) => {
        // e.preventDefault()
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
                setUserNumber("");
                console.log("Un objet avec le numéro spécifié a été trouvé:", iFind);
                if(message === "AddJust"){
                    handleSuccess("Appariteur existant", "Un appariteur avec le numéro spécifié a été trouvé, veillez ajouter le nouveau appariteur avec un autre numéro inexistant")
                }
            } else {
                // setNumberError(false);
                console.log("Aucun objet avec le numéro spécifié n'a été trouvé.");
                console.log(message);
                setDoormen([...doormen, newClass]); 
                setSection("");
                setUserNumber("");
                console.log("Ajouté avec succès !");
                if(message === "AddJust"){
                    handleSuccess("Ajout d'un appariteur", "L'appariteur dont le numéro est "+userNumber+" a été ajouté pour la section '"+section+"'")
                }
                return;
            }
            return
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
            .then(data => {
                console.log(data)
                handleSuccess("Enregistrement d'un appariteur", data.message)
            })
            .catch(error => console.error(error));
            return
        }
        console.log("Vous ne pouvez pas envoyer un tableau sans objets...");
    }

    const handleSendData = (e) => {
        e.preventDefault()
        if(section !== "" && !numberError){
            handleAddUser("addAndSend")
            handleSendClasses()
            setDoormen([])
            console.log(doormen);
            return
        }
        handleSendClasses()
        setDoormen([])
        console.log(doormen);
        
    };

    const addTransition = (e) => {
        e.preventDefault()
        if(section !== "" && !numberError){
            handleAddUser("AddJust")
            return
        }
    }

    useEffect(() => {
        const newData = allDatas.courses.reduce((acc, obj) => {
          if (!acc[obj.nom]) {
            acc[obj.nom] = Object.create(obj);
          }
          return acc;
        }, {});
    
        setSections(Object.values(newData));
      }, []);

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
                                    {numberError ? "Le numéro de telephone doit contenir 9 chiffres.":
                                    "Merci d'avoir entré un numéro valide !"
                                    }
                                </label>
                                <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="number" id="userNumber" value={userNumber} name="userNumber" onChange={ (e) => handleChanges(e, "userNumber") } placeholder="The the number of the doorman" required /> 
                                
                                <label htmlFor="section" className={"d-flex justify-content-between mt-4 mb-1"}>
                                    {(section === null || section === "" || section === " ") ? "Le nom de la section ne doit pas etre vide.":
                                    "Merci d'avoir saisi un nom valide !"
                                    }
                                </label>
                                {/* <label htmlFor="section" className={"d-flex justify-content-between mt-4 mb-1"}>Quelle section gerera-t-il ?</label> */}
                                <select name="section" value={section} onChange={ (e) => handleChanges(e, "section") } className="form-control">
                                    <option value={""}>Veillez choisir une section</option>
                                    {
                                    allDatas.users
                                    .filter(user => user.userType === "doorman")
                                    .filter(user => user.section === "")
                                    .length === 0 ?
                                    
                                    sections.map(item => (
                                        <option key={item._id} value={item.section}>{item.section}</option>
                                    ))
                                    
                                    : ""
                                    
                                    }
                                    {/* {sections.map(item => (
                                        <option key={item._id} value={item.section}>{item.section}</option>
                                    ))} */}
                                </select>
                                
                                <div className="d-flex mt-4">
                                    {!numberError && userNumber !== "" && section !== "" ?
                                    <button className="btn btn-outline-info" onClick={ addTransition }>Add</button>
                                    :""}
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