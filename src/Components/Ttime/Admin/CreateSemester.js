import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideLinks from "../SideLinks";

const CreateSemesters = ({darkMode, hangeMoveContentPage, activeContent, etats}) => {
    const [beginingDate, setBeginingDate] = useState();
    const [endDate, setEndDate] = useState('');
    const [dateError, setDateError] = useState(true);
    const [semesters, setSemesters] = useState([]);


    useEffect(() => {
        setDateError(true)
        console.log(semesters);
    }, [])


    const handleAddSemester = (e) => {
        console.log("Du "+beginingDate+" au "+endDate);
        console.log("beginingDate: "+typeof(beginingDate)+" && endDate: "+typeof(endDate));
        // test before to call "handleSendSemesters"
        setBeginingDate('')
        setEndDate('')
    };
    
    const handleSendSemesters = async (datas) => {
        try {
          const response = await axios.post('http://localhost:3001/saveSemesters', datas);
      
          if (response.status === 200) {
              console.log("L'enregistrement des semesters s'est terminée avec succès !");
              console.log('Réponse de l\'API :', response);
            //   ttiskaSync();
          } else {
              console.error('#1. Erreur lors de l\'envoi du fichier :', response);
          }
        } catch (error) {
            console.error('#2. Erreur lors de l\'envoi :', error);
        }
    };



    return (
        <div className={darkMode ? "container d-flex justify-content-center mt-4 text-light" : "container d-flex justify-content-center mt-4"}>
            <div>
                <div className=" row">
                    <div className={darkMode ? "dark_object rounded p-4 card-body pt-3 col-md-12 col-lg-6" : "bg-white rounded p-4 card-body pt-3 col-md-12 col-lg-6"}>
                        <h2 className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Création des semestres pour {etats.univId}</h2>
                        {/* <p className={darkMode ? "text-light" : "text-dark"}>Pour une bonne gestion des horaires pour votre établissement, nous trouvons bon de commencer par l'enregistrement des cours. Le nom de votre fichier Excel doit ressembler à <strong>isc2024_1semestre_bac1_info.xlsx</strong> afin de permettre à la plateforme de bien gérer votre fichiers </p> */}
                                        
                                        
                        <form className="was-validated">
                            <div className="mb-3 ">
                                
                                <label htmlFor="beginingDate" className="mt-4 mb-1 d-flex justify-content-start align-items-center">La date de debut</label>
                                <input type="date" id='beginingDate' value={beginingDate} onChange={(e) => setBeginingDate(e.target.value)} className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"} aria-label="text example" required />
                                
                                <label htmlFor="endDate" className="mt-4 mb-1 d-flex justify-content-start align-items-center">La date de fin</label>
                                <input type="date" id='endDate' value={endDate} onChange={(e) => setEndDate(e.target.value)} className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"} aria-label="text example" required />
                                
                                <Link to="" className="btn btn-outline-info mt-4" onClick={handleAddSemester}>save</Link>
                            </div> 
                            
                            {dateError ?
                            <p className="text-danger">La date de debut doit etre inferieur à la date de fin !</p>
                            :
                            <Link to="" className="mt-3 btn btn-outline-info" onClick={() => handleSendSemesters(semesters)}>Enregistrer les semestres</Link>
                            }
                        </form>
                    </div>
                    <div className="pt-3 col-md-12 col-lg-6 ">
                        <SideLinks hangeMoveContentPage={hangeMoveContentPage} activeContent={activeContent} etats={etats} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateSemesters;
