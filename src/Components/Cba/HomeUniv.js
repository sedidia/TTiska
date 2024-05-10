import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
// import axios from 'axios';
import urls from "../Config/Config";

const Cba = ( {darkMode, setDarkMode, activeContent, setActiveContent, etats, allDatas} ) => {
    const [studentData, setStudentData] = useState([]);
    const [columnIsMissing, setColumnIsMissing] = useState(false);
    let indiceC = 0;


    const checkColumns = (data) => {
        data.map(item => {
            item.cours || item.option ? 
            console.log(columnIsMissing) : setColumnIsMissing(true)
        })
    }

    useEffect(() => {
        console.log(etats.univId);
        const fetchData = async () => {
            const response = await fetch(urls.courses_teachers ); // Chemin vers le fichier Excel
            const data = await response.arrayBuffer();
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0]; // Supposons que les données se trouvent dans la première feuille
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
    
            const gotStudent = jsonData.find(student => student.promotion === 'm1');
            setStudentData(jsonData);
            // console.log(jsonData);
            // setStudentData(gotStudent);
            // console.log(gotStudent);
            checkColumns(jsonData)
        };
        fetchData();
    }, []);

    return (
        <div className={darkMode ? 'container bulletin_card d-flex justify-content-center align-items-center text-light' : 'container bulletin_card d-flex justify-content-center align-items-center'}>

            {activeContent === "CbaExport" ?
                <div className="d-flex justify-content-center align-items-center">
                    
                    <div className="col-md-12 col-lg-6 mb-4">
                        <div className={darkMode ? "dark_object rounded p-4 position-relative " : "bg-white rounded p-4 position-relative "}>
                            <div className="card-body pt-3">
                                <h5 className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Selectionnez votre fichier content les cours selon leurs section, filière et option.</h5>
                                {columnIsMissing ?
                                <p className={darkMode ? "text-light" : "text-dark"}>Il y a des colonnes manquantes dans le fichier excel selectionné.<br/>Votre fichier doit contenir plus de 11 colonnes suivantes : cours, section, option, promotion, teacherNumber, teacherName, semester, activeDate, classId, className, univId </p>
                                :""}
                                
                                <form className="was-validated">
                                    <label htmlFor='liste' className="mb-3 d-flex justify-content-start align-items-center">Liste de paiment</label> 
                                    <div className="mb-3">
                                        <input type="file"  id='liste' className={darkMode ? "bg-dark mb-3 form-control text-light" : "bg-light mb-3 form-control text-dark"} aria-label="file example" required />
                                    </div> 

                                    <button type="submit" className="mt-3 btn btn-outline-info" >Continuer</button>
                                </form>
                                {/* {studentData.map(item => (
                                    <div key={indiceC = indiceC+1} className="mb-3">
                                        {item.cours}
                                    </div> 
                                ))} */}
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
                                <h4 className={darkMode ? "text-light" : "text-light"}>La page "université".</h4>
                                <h4 className={darkMode ? "text-light" : "text-light"}>{etats.username}, bienvenue sur Horaire pour les universités !</h4>
                                <h4 className={darkMode ? "text-light" : "text-light"}>Votre université : {etats.univId}</h4>
                                <h4 className={darkMode ? "text-light" : "text-light"}>Votre statut : {etats.userType === "doorman" ? "appariteur" : etats.userType === "student" ? "Etudiant" : etats.userType === "university" ? "Université" : etats.userType}</h4>
                                {/* <h4 className={darkMode ? "text-light" : "text-light"}>The university's page</h4>
                                <h4 className={darkMode ? "text-light" : "text-light"}>{etats.username}, welcom on TTiska for universities !</h4>
                                <h4 className={darkMode ? "text-light" : "text-light"}>Your university : {etats.univId}</h4>
                                <h4 className={darkMode ? "text-light" : "text-light"}>Your status is : {etats.userType}</h4> */}
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div>
                            {etats.isOnline ?
                            <div>
                                {etats.userType === "university"?
                                <div className='row'> 
                                    {activeContent !== "SaveCourses"?
                                    <div className="col-md-6 col-lg-4 overCard">
                                        <div className={darkMode ? "p-4 bg-dark" : "p-4 bg-light"}>
                                            <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Nous vous rendons le travail facile et rapide avec nos solutions numériques en ligne. </p>
                                            <Link className="btn btn-outline-info" to="#footer" onClick={() => setActiveContent("SaveCourses")}>Je veux sauvegarder les cours</Link>
                                        </div>
                                    </div>
                                    :""}    
                                    {activeContent !== "CreateSemester"?
                                    <div className="col-md-6 col-lg-4 overCard">
                                        <div className={darkMode ? "p-4 bg-dark" : "p-4 bg-light"}>
                                            <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Nous vous rendons le travail facile et rapide avec nos solutions numériques en ligne. </p>
                                            <Link className="btn btn-outline-info" to="#footer" onClick={() => setActiveContent("CreateSemester")}>Je veux enregistrer les semestres</Link>
                                        </div>
                                    </div>
                                    :""}
                                    {activeContent !== "SaveClasses"?
                                    <div className="col-md-6 col-lg-4 overCard">
                                        <div className={darkMode ? "p-4 bg-dark" : "p-4 bg-light"}>
                                            <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Nous vous rendons le travail facile et rapide avec nos solutions numériques en ligne. </p>
                                            <Link className="btn btn-outline-info" to="#footer" onClick={() => setActiveContent("SaveClasses")}>Je veux enregistrer les salles</Link>
                                        </div>
                                    </div>
                                    :""}
                                    {activeContent !== "SaveApparitor"?
                                    <div className="col-md-6 col-lg-4 overCard">
                                        <div className={darkMode ? "p-4 bg-dark" : "p-4 bg-light"}>
                                            <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Nous vous rendons le travail facile et rapide avec nos solutions numériques en ligne. </p>
                                            <Link className="btn btn-outline-info" to="#footer" onClick={() => setActiveContent("SaveApparitor")}>Je veux enregistrer les appariteurs</Link>
                                        </div>
                                    </div>
                                    :""}
                                    {activeContent !== "AttributeClasses"?
                                    <div className="col-md-6 col-lg-4 overCard">
                                        <div className={darkMode ? "p-4 bg-dark" : "p-4 bg-light"}>
                                            <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Nous vous rendons le travail facile et rapide avec nos solutions numériques en ligne. </p>
                                            <Link className="btn btn-outline-info" to="#footer" onClick={() => setActiveContent("AttributeClasses")}>Je veux gérer les attributions</Link>
                                        </div>
                                    </div>
                                    :""}
                                </div>
                                :""}
                                {etats.userType === "doorman"?
                                <div className='row'>  
                                    {activeContent !== "ConsultSectionsClasses"?
                                    <div className="col-md-6 col-lg-4 overCard">
                                        <div className={darkMode ? "p-4 bg-dark" : "p-4 bg-light"}>
                                            <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Nous vous rendons le travail facile et rapide avec nos solutions numériques en ligne. </p>
                                            <Link className="btn btn-outline-info" to="#footer" onClick={() => setActiveContent("ConsultSectionsClasses")}>Consult my section's classes</Link>
                                        </div>
                                    </div>
                                    :""}
                                    {activeContent !== "ProgramSchedulsCourses"?
                                    <div className="col-md-6 col-lg-4 overCard">
                                        <div className={darkMode ? "p-4 bg-dark" : "p-4 bg-light"}>
                                            <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Nous vous rendons le travail facile et rapide avec nos solutions numériques en ligne. </p>
                                            <Link className="btn btn-outline-info" to="#footer" onClick={() => setActiveContent("ProgramSchedulsCourses")}>Program schedul's courses</Link>
                                        </div>
                                    </div>
                                    :""}
                                    {activeContent !== "ProgramSemestersCourses"?
                                    <div className="col-md-6 col-lg-4 overCard">
                                        <div className={darkMode ? "p-4 bg-dark" : "p-4 bg-light"}>
                                            <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Nous vous rendons le travail facile et rapide avec nos solutions numériques en ligne. </p>
                                            <Link className="btn btn-outline-info" to="#footer" onClick={() => setActiveContent("ProgramSemestersCourses")}>Program semester's courses</Link>
                                        </div>
                                    </div>
                                    :""}
                                </div>
                                :""}
                                {etats.userType === "teacher"?
                                <div className='row'>  
                                    {activeContent !== "CreateTime"?
                                    <div className="col-md-6 col-lg-4 overCard">
                                        <div className={darkMode ? "p-4 bg-dark" : "p-4 bg-light"}>
                                            <p className={darkMode ? "text-light p-2" : "text-dark p-2"}>Nous vous rendons le travail facile et rapide avec nos solutions numériques en ligne. </p>
                                            <Link className="btn btn-outline-info" to="#footer" onClick={() => setActiveContent("CreateTime")}>Supply my time</Link>
                                        </div>
                                    </div>
                                    :""}
                                </div>
                                :""}
                                {etats.userType === "student"?
                                <div className='row mt-4'>  
                                    <h2>Liste des cours programés</h2>
                                    
                                    {allDatas.courses
                                    .filter(item => item.univId === etats.univId)
                                    .filter(item => item.promotion === etats.promotion)
                                    .filter(item => item.filiere === etats.filiere)
                                    .filter(item => item.activeDate !== null)
                                    .filter(item => item.activeDate !== "")
                                    .map(item => (
                                    <div key={item._id}>  
                                        <li>{item.cours} : {item.className} {item.activeDate} </li>
                                        
                                        <li className='col-md-6 col-lg-4 p-2'>
                                            <div className='card'>
                                                <h4 className='d-flex p-2'>Cours : {item.cours}</h4>
                                                <p className='d-flex p-2'>Salle : {item.className}</p>
                                                <p className='d-flex p-2'>Date et heures : {item.activeDate} </p>
                                            </div>
                                        </li>
                                    </div>
                                    ))}
                                </div>
                                :""}
                            </div>
                            :
                            <div className={darkMode ? "btn btn-outline-info" : "btn btn-outline-dark"} onClick={ () => setActiveContent("Auth") }>You're offline, Log in</div>
                            }
                        </div>
                        
                    </div>
                </div>
            }

        </div>
    );
};

export default Cba;