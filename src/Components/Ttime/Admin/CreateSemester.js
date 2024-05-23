// import { useEffect, useState } from "react";
import IsLoading from "../../SmallComponents/IsLoading";
import { Link } from "react-router-dom";
import url from "../../Config/Config";
import { useState } from "react";
import SideLinks from "../SideLinks";

const CreateSemesters = ( {darkMode, hangeMoveContentPage, activeContent, etats, allDatas, setAllDatas, handleSuccess} ) => {
    const [classeName, setClasseName] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [classes, setClasses] = useState([]);
    const [univId, setUnivId] = useState("");
    const [name, setName] = useState("");

    const handleChanges = (e, title) => {
        setUnivId(etats.univId)
        title === "name" ? setName(e.target.value) : title === "startDate" ? setStartDate(e.target.value) : setEndDate(e.target.value)
        const filtered = classes.filter(classe => 
            classe.startDate.toLowerCase().includes( (title === "startDate" ? e.target.value: e.target.value).toLowerCase())
        );
        // setFilteredUsers(filtered);
        if (filtered.length === 0) {
        console.log('Aucune classe trouvé.');
        } else {
            console.log(filtered.startDate);
        }

        // title === "startDate" ? setStartDate(e.target.value) : setEndDate(e.target.value)
    }

    const handleAddUser = (e) => {
        e.preventDefault()
        const newClass = { name, startDate, endDate, univId };
        if(name !== "" && startDate !== "" && endDate !== ""){
            if(new Date(startDate) < new Date(endDate)){
                const iFind =  allDatas.semesters.find(obj => obj.beginingDate === startDate || obj.endDate === endDate);

                if (iFind) {
                    console.log("Un objet avec la date spécifiée a été trouvé:", iFind);
                    handleSuccess("Echec d'ajout", "L'ajout de l'appariteur a échoué, un semestre avec la date spécifiée a été trouvé ")
                } else {
                    console.log("Aucun objet avec la date spécifiée n'a été trouvé.");
                    console.log('Insertion...');
                    setClasses([...classes, newClass]); 
                    // setName('');
                    setStartDate('');
                    setEndDate('');
                    console.log(classes);
                    handleSuccess("Ajout réussi", "Appariteur ajouté avec succès, cliqué sur le outon d'envoi pour l'enregistrer dans la base des données.")
                    return;
                }
                
                // if (iFind.length === 0) {
                // } else {
                    //     console.log(iFind.startDate);
                // }

            } else {
                console.log("Veuillez saisir une date de fin inferieure à la date de début.");
                handleSuccess("Valuers invalides", "Veuillez saisir une date de fin ultérieure à la date de début.")
                return;
            }
        }
        console.log("Veuillez renseigner tous les champs !");
    }

    const handleSendClasses = () => {
        if (classes.length > 0) {
            fetch(`${url.urlApi}/saveSemesters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(classes),
        })
        .then(response => response.json())
        .then(data => {
                handleSuccess("Enregistrement réussi", "Semestre enregistré avec succès, Merci de cliquer sur le bouton OK pour fermer cette boite de dialogue.")
                console.log(data)
            })
            .catch(error => console.error(error));
            return
        }
        console.log("Vous ne pouvez pas envoyer un tableau sans objets...");
    }

    const handleSendData = (e) => {
        e.preventDefault()
        if(startDate !== "" && endDate !== ""){
            handleAddUser()
            handleSendClasses()
            setClasses([])
            console.log(classes);
            return
        }
        handleSendClasses()
        setClasses([])
        console.log(classes);

    };

    return (
        <div className={darkMode ? "d-flex justify-content-center align-items-center mt-4 text-light container":"d-flex justify-content-center align-items-center mt-4 container"}>     
            <div className="row">     
                <div className="col-md-12 col-lg-6">
                    <h2 className={darkMode ? "pb-4 text-light" : "pb-4 text-dark"}>Creation des semestres.</h2>
                    <div className={darkMode ? "dark_object rounded p-4 position-relative " : "bg-white rounded p-4 position-relative "}>
                        <div className="card-body pt-3">
                            <h2 className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Enregistrer les semestres pour {etats.univId}.</h2>
                            
                            <form className="was-validated">
                                <label htmlFor="startDate" className={"d-flex justify-content-between mt-4 mb-1"}>
                                    {(name === null || name === "" || name === " ") ? "Le nom du semestre doit etre significatif.":
                                    "Merci d'avoir saisi un nom valide !"
                                    }
                                </label>
                                <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="text" id="name" value={name} name="name" onChange={ (e) => handleChanges(e, "name") } placeholder="The class name" required /> 
                                <label htmlFor="startDate" className={"d-flex justify-content-between mt-4 mb-1"}>
                                    {(startDate === null || startDate === "" || startDate === " ") ? "La date de debut ne doit pas etre vide.":
                                    "Merci d'avoir saisi une date valide !"
                                    }
                                </label>
                                <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="date" id="startDate" value={startDate} name="startDate" onChange={ (e) => handleChanges(e, "startDate") } placeholder="The class startDate" required /> 
                                
                                <label htmlFor="endDate" className={"d-flex justify-content-between mt-4 mb-1"}>
                                    {(endDate === null || endDate === "" || endDate === " ") ? "La date de debut ne doit pas etre vide.":
                                    "Merci d'avoir saisi une date valide !"
                                    }
                                </label>
                                <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="date" id="endDate" value={endDate} startDate="endDate" onChange={ (e) => handleChanges(e, "endDate") } placeholder="The endDate's startDate" required /> 

                                <div className="d-flex mt-4">
                                    <button className="btn btn-outline-info" onClick={handleAddUser}>Garder en memoire</button>
                                    {classes.length > 0 && startDate === "" && endDate === ""?
                                    <button className="btn btn-outline-info" onClick={handleSendData}>Terminer</button>
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
export default CreateSemesters;