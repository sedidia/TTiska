import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
// import axios from 'axios';
// import urls from "../Config/Config";
import urls from "../Config/Config";
import axios from "axios";

import Swal from 'sweetalert2';

const SaveResult = ( {darkMode, setDarkMode, activeContent, setActiveContent, hangeMoveContentPage, etats, handleSuccess, allDatas, setAllDatas } ) => {
    const [studentData, setStudentData] = useState([]);

    

    let resultTreated = [];
    const [columnIsMissing, setColumnIsMissing] = useState(true);
    let indiceC = 0;

    const sendCoursesToServer = (resultTreated) => {
        if(studentData.length > 0){
            axios.post('http://localhost:3001/saveResults', studentData)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    console.log("Publication de resultats s'est terminée avec succès !");
                    console.log('Réponse de l\'API :', response);
                    handleSuccess("Publication de resultats", response.data.message)
                  //   ttiskaSync();
                } else {
                    console.error('#1. Erreur lors de la publication de resultats :', response);
                }
            })
            .catch(error => {
                console.log("CATCH : "+error);
            })
        }else{
            console.log(studentData);
        }
    };

    const checkColumns = (datas) => {
        datas.map(item => { 
            (
                item.Noms && 
                item.faculte && 
                item.departement && 
                item.filiere && 
                item.promotion && 
                item.systeme && 
                item.credits && 
                item.credits_valides &&
                item.echecs && 
                item.moyenne_ponderee && 
                item.complements && 
                item.complements_valides && 
                item.decision_jury && 
                item.annee
            ) 
            ? setColumnIsMissing(false) : setColumnIsMissing(true)
        })
    }
    
    const handleTreatDataToSend = (datas) => {
        // ________________________
        datas.map(item => {
            const newObj = { 
                Noms: item.Noms,
                faculte: item.faculte,
                departement: item.departement,
                filiere: item.filiere,
                promotion: item.promotion,
                systeme: item.systeme,
                credits: item.credits,
                credits_valides: item.credits_valides,
                echecs: item.echecs,
                moyenne_ponderee: parseFloat(item.moyenne_ponderee),
                complements: item.complements,
                complements_valides: item.complements_valides,
                decision_jury: item.decision_jury,
                annee: item.annee,
                univId: etats.univId,
            }
            Object.keys(item).forEach(key => {
                // u2c5
                // if(key. startsWith('u') && key[3] === 'c' && !isNaN(key(2)) ){
                if( key[0] === 'u' ){
                    const matiere = key.slice(4)
                    const unite = key[1]
                    const credit = key[3]
                    newObj[matiere] = {
                        cote: item[key],
                        unite: parseInt(unite, 10),
                        credit: parseInt(credit, 10),
                    }
                }
                console.log(item[key]);
                return newObj;
            })  
            resultTreated.push(newObj)  
        })
        setStudentData(resultTreated);
        console.log(resultTreated);
        // ________________________
    }

    const fetchData = async (file) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0]; // Supposons que les données se trouvent dans la première feuille
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            
            handleTreatDataToSend(jsonData);
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
        sendCoursesToServer(resultTreated)
    }

    // useEffect(() => {

    // }, [])

    return (
        <div className={darkMode ? 'container bulletin_card d-flex justify-content-center align-items-center text-light' : 'container bulletin_card d-flex justify-content-center align-items-center'}>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="row"> 
                        <div className="col-md-12 col-lg-6 mb-4">
                                    <h2 className={darkMode ? "pb-4 text-light d-flex justify-content-start" : "pb-4 d-flex justify-content-start"}>Publication des résultats.</h2>
                            <div className={darkMode ? "dark_object rounded p-4 position-relative " : "bg-white rounded p-4 position-relative "}>
                                <div className="card-body pt-3">
                                    <h5 className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Selectionnez votre grille de délibération afin de publier les resultats pour permettre à vos étudiants de consulter leurs résultats.</h5>
                                    {columnIsMissing ?
                                    <p className={darkMode ? "text-light" : "text-dark"}>Il y a des colonnes manquantes dans le fichier excel selectionné.<br/>Votre fichier doit obligatoirement les colonnes suivantes et d'autres colonnes contenant les cotes selons les cours : Noms
                                    faculte, departement, filiere, promotion, systeme, credits, credits_valides, echecs, moyenne_ponderee, complements, complements_valides, decision_jury, annee et univId</p>
                                    :""}
                                    
                                    <form className="was-validated">
                                        <label htmlFor='liste' className="mb-3 d-flex justify-content-start align-items-center">Sectionnez votre fichier excel qui contient des cours et d'autres informations sur les enseignants.</label> 
                                        <div className="mb-3">
                                            <input type="file" onChange={handleFileChange}  id='liste' className={darkMode ? "bg-dark mb-3 form-control text-light" : "bg-light mb-3 form-control text-dark"} aria-label="file example" required />
                                        </div> 

                                        {!columnIsMissing ?
                                        <button type="submit" className="mt-3 btn btn-outline-info" onClick={handlaStartSending}>Publier les resultats</button>
                                        :""}
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 mb-4">
                            Others
                        </div>
                    </div>
                </div>

        </div>
    );
};

export default SaveResult;