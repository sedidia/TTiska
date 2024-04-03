import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
// import axios from 'axios';
import urls from "../Config/Config";

import grilledel from "../../Server/Cba/Grilles/2024_Master1_Semestre1.xlsx"

const Cba = ( {darkMode, setDarkMode, activeContent, setActiveContent} ) => {
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(grilledel); // Chemin vers le fichier Excel
            const data = await response.arrayBuffer();
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0]; // Supposons que les données se trouvent dans la première feuille
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            const gotStudent = jsonData.find(student => student.promotion === 'm1');
            setStudentData(gotStudent);
        };

        fetchData();
    }, []);

    return (
        <div className='container bulletin_card d-flex justify-content-center align-items-center'>

            {activeContent === "CbaExport" ?
                <div className="d-flex justify-content-center align-items-center">
                    
                    <div className="col-md-12 col-lg-6 mb-4">
                        <div className={darkMode ? "dark_object rounded p-4 position-relative " : "bg-white rounded p-4 position-relative "}>
                            <div className="card-body pt-3">
                            <h5 className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Televerssement's grid / Paiement's List</h5>
                            <p className={darkMode ? "text-light" : "text-dark"}>Please select the type of file you wanna upload on the server(A grid / A list) from your files explorer in order to allow your in order's students consulting their academic result using their smartphone.</p>
                
                            <form className="was-validated">
                                <label htmlFor='liste' className="mb-3 d-flex justify-content-start align-items-center">Liste de paiment</label> 
                                <div className="mb-3">
                                    <input type="file"  id='liste' className={darkMode ? "bg-dark mb-3 form-control text-light" : "bg-light mb-3 form-control text-dark"} aria-label="file example" required />
                                </div> 

                                <button type="submit" className="mt-3 btn btn-outline-info" >Continuer</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            : activeContent === "CbaView" ?
                <div className='container'>
                    {studentData ? (
                        <div className="bulletin bg-white">
                            <div className="headBulletin d-flex justify-content-between align-items-center">
                                <div className="logoUniv">                    
                                    <img src={urls.logo_univ} alt="Logo de unilu" />
                                </div>
                                <div className="infos_univ">
                                    <h4 style={{ fontSize: '20px' }} className='p-0 m-0'>UNIVERSITE DE LUBUMBASHI</h4>
                                    <h5 style={{ fontSize: '18px' }} className='p-0 m-0'>FACULTE DES SCIENCES</h5>
                                    <h6 style={{ fontSize: '18px' }} className='p-0 m-0'>Département de Mathematiques et informatique</h6>
                                </div>
                                <div className="logoUniv">                    
                                    <img src={urls.logo_univ} alt="Logo de unilu" />
                                </div>
                            </div>
                            <div className="nomBulletin p-4">
                                <h5 style={{ fontSize: '18px' }}>BULLETIN DE DELIBERATION N°{studentData.systeme}/REC-RATTR/202262023</h5>
                            </div>

                            <div className="identite_etudia mb-2">
                                <div className="noms">Nom, Post-nom et Prenom : {studentData.Noms}</div>
                                <div className="promotion">Promotion : {studentData.promotion} {studentData.filiere}</div>
                                <div className="type_session">Session {studentData.annee}</div>
                            </div>  

                            <div className="donneesBulletins border bg-light">
                                <div className="donnees entete d-flex justify-content-between align-items-center">
                                    <div className="unite">UE</div>
                                    <div className="elementEnseignementTitle">ELEMENT D'ENSEIGNEMENT</div>
                                    <div className="credits">CD</div>
                                    <div className="cotes">COTES</div>
                                </div>
                            </div>

                            <div className="donneesBulletins border">
                                <div className="donnees entete d-flex justify-content-between align-items-center">
                                    <div className="unite">1</div>
                                    <div className="elementEnseignement">Informatique</div>
                                    <div className="credits">5</div>
                                    <div className="cotes">{studentData.u2info5c}</div>
                                </div>
                            </div>
                            <div className="donneesBulletins border">
                                <div className="donnees entete d-flex justify-content-between align-items-center">
                                    <div className="unite">1</div>
                                    <div className="elementEnseignement">Informatique</div>
                                    <div className="credits">5</div>
                                    <div className="cotes">{studentData.u2info5c}</div>
                                </div>
                            </div>
                            <div className="donneesBulletins border">
                                <div className="donnees entete d-flex justify-content-between align-items-center">
                                    <div className="unite">1</div>
                                    <div className="elementEnseignement">Informatique</div>
                                    <div className="credits">5</div>
                                    <div className="cotes">{studentData.u2info5c}</div>
                                </div>
                            </div>
                            <div className="donneesBulletins border">
                                <div className="donnees entete d-flex justify-content-between align-items-center">
                                    <div className="unite">1</div>
                                    <div className="elementEnseignement">Informatique</div>
                                    <div className="credits">5</div>
                                    <div className="cotes">{studentData.u2info5c}</div>
                                </div>
                            </div>
                            <div className="donneesBulletins border">
                                <div className="donnees entete d-flex justify-content-between align-items-center">
                                    <div className="unite">1</div>
                                    <div className="elementEnseignement">Informatique</div>
                                    <div className="credits">5</div>
                                    <div className="cotes">{studentData.u2info5c}</div>
                                </div>
                            </div>
                            <div className="donneesBulletins border">
                                <div className="donnees entete d-flex justify-content-between align-items-center">
                                    <div className="unite">1</div>
                                    <div className="elementEnseignement">Informatique</div>
                                    <div className="credits">5</div>
                                    <div className="cotes">{studentData.u2info5c}</div>
                                </div>
                            </div>
                            <div className="donneesBulletins border">
                                <div className="donnees entete d-flex justify-content-between align-items-center">
                                    <div className="unite">1</div>
                                    <div className="elementEnseignement">Informatique</div>
                                    <div className="credits">5</div>
                                    <div className="cotes">{studentData.u2info5c}</div>
                                </div>
                            </div>
                            <div className="donneesBulletins border">
                                <div className="donnees entete d-flex justify-content-between align-items-center">
                                    <div className="unite">1</div>
                                    <div className="elementEnseignement">Informatique</div>
                                    <div className="credits">5</div>
                                    <div className="cotes">{studentData.u2info5c}</div>
                                </div>
                            </div>
                            <div className="donneesBulletins border">
                                <div className="donnees entete d-flex justify-content-between align-items-center">
                                    <div className="unite">1</div>
                                    <div className="elementEnseignement">Informatique</div>
                                    <div className="credits">5</div>
                                    <div className="cotes">{studentData.u2info5c}</div>
                                </div>
                            </div>
                            <div className="donneesBulletins border">
                                <div className="donnees entete d-flex justify-content-between align-items-center">
                                    <div className="unite">1</div>
                                    <div className="elementEnseignement">Informatique</div>
                                    <div className="credits">5</div>
                                    <div className="cotes">{studentData.u2info5c}</div>
                                </div>
                            </div>
                            <div className="donneesBulletins border">
                                <div className="donnees entete d-flex justify-content-between align-items-center">
                                    <div className="unite">1</div>
                                    <div className="elementEnseignement">Informatique</div>
                                    <div className="credits">5</div>
                                    <div className="cotes">{studentData.u2info5c}</div>
                                </div>
                            </div>
                            <div className="donneesBulletins border">
                                <div className="donnees entete d-flex justify-content-between align-items-center">
                                    <div className="unite">1</div>
                                    <div className="elementEnseignement">Informatique</div>
                                    <div className="credits">5</div>
                                    <div className="cotes">{studentData.u2info5c}</div>
                                </div>
                            </div>
                            
                            <div className="bulletin_foot notations d-flex border mt-4">
                                <div>crédits validés</div>
                                <div>{studentData.credits_valides}/{studentData.credits}</div>
                                <div>Echecs : {studentData.echecs}</div>
                                <div>COMPLEMENTS : {studentData.complements}</div>
                            </div>
                            <div className="bulletin_foot notations d-flex border mb-4">
                                <div>Moyenne ponderée</div>
                                <div>{studentData.moyenne_ponderee}/20</div>
                                <div>DECISION : {studentData.decision_jury}</div>
                                <div>COMPLEMENTS VALIDES : {studentData.complements_valides}</div>
                            </div>

                            <div className="signatues d-flex justify-content-between mb-4">
                                <div className="sec_jury">
                                    <div>Secretaire du Jury</div>
                                    <span>{studentData.systeme}</span>
                                </div>
                                <div className="pre_jury">
                                    <div className="titre">President du Jury</div>
                                    <div>{studentData.systeme}</div>
                                </div>
                            </div>

                            <p className="infosMsg"><strong>NB :</strong> Ce document est d'usage interne et ne peut jamais prendre la place d'un bullatin de cotes, il vous est delivré à titre informatif.</p>
                            
                        </div>
                    ) : (
                        <p>Aucune donnée correspondante trouvée...</p>
                    )}
                </div>
            :
                <div className={darkMode ? "text-light w-100" : "text-dark w-100"}>
                    <div className={"home_img position-relative"}>
                        <img src={urls.home} className={darkMode ? "text-light rounded" : "text-dark rounded"} alt='logo' />
                        <div className="header_university d-flex justify-content-center align-items-center">
                            <div>
                                <h4 className={darkMode ? "text-light" : "text-light"}>The university's page</h4>
                                <h4 className={darkMode ? "text-light" : "text-light"}>Welcom to your page on TTiska !</h4>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 row">
                        <div className={darkMode ? "links_univ col-md-12 col-lg-6" : "links_univ col-md-12 col-lg-6"}>
                            <Link to="/" className={darkMode ? "d-flex justify-content-start align-items-center" : "d-flex justify-content-start align-items-center"}>The ninetenn of March 2024 result</Link>
                            <Link to="/" className={darkMode ? "d-flex justify-content-start align-items-center" : "d-flex justify-content-start align-items-center"}>Make a gaze (check) to our academics courses</Link>
                        </div>
                        <div className={darkMode ? "links_univ col-md-12 col-lg-6" : "links_univ col-md-12 col-lg-6"}>
                            <Link to="/" className={darkMode ? "d-flex justify-content-start align-items-center" : "d-flex justify-content-start align-items-center"}>The ninetenn of March 2024 result</Link>
                            <Link to="/" className={darkMode ? "d-flex justify-content-start align-items-center" : "d-flex justify-content-start align-items-center"}>The ninetenn of March 2024 result</Link>
                            <Link to="/" className={darkMode ? "d-flex justify-content-start align-items-center" : "d-flex justify-content-start align-items-center"}>The ninetenn of March 2024 result</Link>
                            
                        </div>
                        
                    </div>
                </div>
            }

        </div>
    );
};

export default Cba;