import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
// import axios from 'axios';
// import urls from "../Config/Config";
import urls from "../../Config/Config";
import axios from "axios";
import SideLinks from '../SideLinks';

const SaveCourses = ( {darkMode, setDarkMode, activeContent, setActiveContent, hangeMoveContentPage, etats, handleSuccess} ) => {
    const [studentData, setStudentData] = useState([]);
    const [columnIsMissing, setColumnIsMissing] = useState(true);
    let indiceC = 0;

    const sendCoursesToServer = () => {
        axios.post('http://localhost:3001/saveCours', studentData)
        .then(response => {
            console.log(response);
            if (response.status === 200) {
                console.log("L'enregistrement s'est terminée avec succès !");
                console.log('Réponse de l\'API :', response);
                handleSuccess("Enregistrement des cours", response.data.message)
              //   ttiskaSync();
            } else {
                console.error('#1. Erreur lors de l\'envoi du fichier :', response);
            }
        })
        .catch(error => {
            console.log("CATCH : "+error);
        })
    };


    const checkColumns = (datas) => {
        datas.map(item => { item.cours 
            // && item.section && item.option && item.promotion && item.teacherNumber && item.teacherName && item.semester && item.activeDate && item.dates && item.classId && item.className && item.univId
            ? ( setColumnIsMissing(false) ) : setColumnIsMissing(true)
        })
    }

    const fetchData = async (file) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0]; // Supposons que les données se trouvent dans la première feuille
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
    
            // const gotStudent = jsonData.find(student => student.promotion === 'm1');
            setStudentData(jsonData);
            checkColumns(jsonData);
        };
        reader.readAsArrayBuffer(file);
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            fetchData(file);
        }
    };

    const handlaStartSending = (e) => {
        e.preventDefault()
        sendCoursesToServer(studentData)
    }

    return (
        <div className={darkMode ? 'container bulletin_card d-flex justify-content-center align-items-center text-light' : 'container bulletin_card d-flex justify-content-center align-items-center'}>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="row"> 
                        <div className="col-md-12 col-lg-6 mb-4">
                                    <h2 className={darkMode ? "pb-4 text-light d-flex justify-content-start" : "pb-4 d-flex justify-content-start"}>Enregistrement des cours.</h2>
                            <div className={darkMode ? "dark_object rounded p-4 position-relative " : "bg-white rounded p-4 position-relative "}>
                                <div className="card-body pt-3">
                                    <h5 className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Selectionnez votre fichier content les cours selon leurs section, filière et option.</h5>
                                    {columnIsMissing ?
                                    <p className={darkMode ? "text-light" : "text-dark"}>Il y a des colonnes manquantes dans le fichier excel selectionné.<br/>Votre fichier doit contenir plus de 11 colonnes suivantes : cours, section, option, promotion, teacherNumber, teacherName, semester, activeDate, dates, classId, className, univId </p>
                                    :""}
                                    
                                    <form className="was-validated">
                                        <label htmlFor='liste' className="mb-3 d-flex justify-content-start align-items-center">Sectionnez votre fichier excel qui contient des cours et d'autres informations sur les enseignants.</label> 
                                        <div className="mb-3">
                                            <input type="file" onChange={handleFileChange}  id='liste' className={darkMode ? "bg-dark mb-3 form-control text-light" : "bg-light mb-3 form-control text-dark"} aria-label="file example" required />
                                        </div> 

                                        {!columnIsMissing ?
                                        <button type="submit" className="mt-3 btn btn-outline-info" onClick={handlaStartSending}>Continuer</button>
                                        :""}
                                    </form>
                                    {/* {studentData.map(item => (
                                        <div key={indiceC = indiceC+1} className="mb-3">
                                            {item.cours}
                                        </div> 
                                    ))} */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 mb-4">
                            <SideLinks hangeMoveContentPage={hangeMoveContentPage} activeContent={activeContent} etats={etats} />
                        </div>
                    </div>
                </div>

        </div>
    );
};

export default SaveCourses;