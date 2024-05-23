import { useEffect, useState } from "react";
import urls from "../Config/Config"
import { Link } from "@react-pdf/renderer";
import { drawPoint } from "chart.js/helpers";

const ConsultResult = ( {darkMode, setDarkMode, activeContent, setActiveContent, hangeMoveContentPage, etats, handleSuccess } ) => {
    // const [results, setResults] = useState([]);
    const [results, setResults] = useState([]);
    const [Noms, setNoms] = useState("KAYAMBA KASONGO IDRIS")
    const [selectOptions, setSelectOptions] = useState(false)
    
    const [fac, setFac] = useState("");
    const [dep, setDep] = useState("");
    const [fil, setFil] = useState("");
    const [prom, setProm] = useState("");

    const [facultes, setFacultes] = useState([]);
    const [departements, setDepartements] = useState([]);
    const [filieres, setFilieres] = useState([]);
    const [promotions, setPromotions] = useState([]);

    const ttiskaSync = async () => {
        console.log("salut rech");
        try {
            // Envoie de la requête à la route qui récupère toutes les collections de la base de données "local"
            const response = await fetch('http://localhost:3001/collections');
            const data = await response.json();
            
            setResults(
                data.cba_bulletins
            );

            setFacultes(Array.from( new Set(data.cba_bulletins.map((obj) => obj.faculte)) ))
            setDepartements(Array.from( new Set(data.cba_bulletins.map((obj) => obj.departement)) ))
            setFilieres(Array.from( new Set(data.cba_bulletins.map((obj) => obj.filiere)) ))
            setPromotions(Array.from( new Set(data.cba_bulletins.map((obj) => obj.promotion)) ))
            
            
            
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };
    
    useEffect(() => {
        ttiskaSync()
    }, [])
    return (
        <div className='container pt-4'>
            {!selectOptions ?
            <button className="btn btn-primary m-2" onClick={() => setSelectOptions(true)}>Manage the select form</button>
            :""}
            
            <div className={
                selectOptions && darkMode ? "bg-dark selectANDconsult active p-4" 
                : selectOptions && !darkMode ? "bg-light selectANDconsult active p-4" 
                : !selectOptions && !darkMode ? "bg-light selectANDconsult p-4" 
                : "bg-dark selectANDconsult p-4"}>
                <h4 className={darkMode ? "text-light":"text-dark"}>election *</h4>
                <p className={darkMode ? "text-light":"text-dark"}>Effectuer votre selection pour voir les bulletins correspondantes *</p>
                                        
                <select name="fac" value={fac} onChange={ (e) => setFac(e.target.value) } className="form-control m-2">
                    <option value={""}>faculté</option>
                    {facultes.map(fac => (
                        <option key={fac._id} value={fac}>{fac}</option>
                    ))}
                </select>
                <select name="dep" value={dep} onChange={ (e) => setDep(e.target.value) } className="form-control m-2">
                    <option value={""}>Département</option>
                    {departements.map(dep => (
                        <option key={dep._id} value={dep}>{dep}</option>
                    ))}
                </select>
                <select name="fil" value={fil} onChange={ (e) => setFil(e.target.value) } className="form-control m-2">
                    <option value={""}>Filière</option>
                    {filieres.map(fil => (
                        <option key={fil._id} value={fil}>{fil}</option>
                    ))}
                </select>
                <select name="prom" value={prom} onChange={ (e) => setProm(e.target.value) } className="form-control m-2">
                    <option value={""}>Promotion</option>
                    {promotions.map(prom => (
                        <option key={prom._id} value={prom}>{prom}</option>
                    ))}
                </select>

                <button className="btn btn-danger m-2" onClick={() => setSelectOptions(false)}>Terminer la selection</button>
            </div>
            
            <div className="d-flex justify-content-center">
                {results
                    // .filter(item => item.Noms === Noms)
                    .filter(item => item.faculte === fac)
                    .filter(item => item.departement === dep)
                    .filter(item => item.filiere === fil)
                    .filter(item => item.promotion === prom).length === 0 ? <div className="p-4 h100">Aucune correspondance trouvée</div> :""}
            </div>
            <div className="d-flex justify-content-center">
                <div className="bulletinScrollable p-4">
                    {results.length > 0 && results
                    // .filter(item => item.Noms === Noms)
                    .filter(item => item.faculte === fac)
                    .filter(item => item.departement === dep)
                    .filter(item => item.filiere === fil)
                    .filter(item => item.promotion === prom)
                    .map(item => (
                        
                        <div key={item._id} className="bulletin bg-white mb-4">
                            <div className="headBulletin d-flex justify-content-between align-items-center">
                                <div className="logoUniv">                    
                                    <img src={urls.logo_univ} alt="Logo de unilu" />
                                </div>

                                <div className="infos_univ">
                                    <h4 style={{ fontSize: '20px' }} className='p-0 m-0'>UNIVERSITE DE LUBUMBASHI</h4>
                                    <h5 style={{ fontSize: '18px' }} className='p-0 m-0'>FACULTE DES {item.faculte}</h5>
                                    <h6 style={{ fontSize: '18px' }} className='p-0 m-0'>Département de {item.departement}</h6>
                                </div>
                                <div className="logoUniv">                    
                                    <img src={urls.logo_univ} alt="Logo de unilu" />
                                </div>
                            </div>
                            <div className="nomBulletin p-4">
                                <h5 style={{ fontSize: '18px' }}>BULLETIN DE DELIBERATION N°{item.systeme}/REC-RATTR/202262023</h5>
                            </div>

                            <div className="identite_etudia mb-2">
                                <div className="noms">Nom, Post-nom et Prenom : {item.Noms}</div>
                                <div className="promotion">Promotion : {item.promotion} {item.filiere}</div>
                                <div className="type_session">Session {item.annee}</div>
                            </div>  

                            <div className="donneesBulletins border bg-light">
                                <div className="donnees entete d-flex justify-content-between align-items-center">
                                    <div className="unite">UE</div>
                                    <div className="elementEnseignementTitle">ELEMENT D'ENSEIGNEMENT</div>
                                    <div className="credits">CD</div>
                                    <div className="cotes">COTES</div>
                                </div>
                            </div>

                            {Object.keys(item)
                            .filter(item => item !== "_id")
                            .filter(item => item !== "Noms")
                            .filter(item => item !== "annee")
                            .filter(item => item !== "faculte")
                            .filter(item => item !== "departement")
                            .filter(item => item !== "promotion")
                            .filter(item => item !== "filiere")
                            .filter(item => item !== "complements")
                            .filter(item => item !== "complements_valides")
                            .filter(item => item !== "credits")
                            .filter(item => item !== "credits_valides")
                            .filter(item => item !== "echecs")
                            .filter(item => item !== "decision_jury")
                            .filter(item => item !== "moyenne_ponderee")
                            .filter(item => item !== "systeme")
                            .filter(item => item !== "univId")
                            .map(key => (
                            <div className="donneesBulletins border">
                                <div className="donnees entete d-flex justify-content-between align-items-center">
                                    <div className="unite">{item[key].unite}</div>
                                    <div className="elementEnseignement">{key}</div>
                                    <div className="credits">{item[key].credit}</div>
                                    <div className="cotes">{item[key].cote}</div>
                                </div>
                            </div>
                            ) ) }

                            
                            <div className="bulletin_foot notations d-flex border mt-4">
                                <div>crédits validés</div>
                                <div>{item.credits_valides}/{item.credits}</div>
                                <div>Echecs : {item.echecs === "null" ? "":item.echecs}</div>
                                <div>COMPLEMENTS : {item.complements === "null" ? "":item.complements}</div>
                            </div>
                            <div className="bulletin_foot notations d-flex border mb-4">
                                <div>Moyenne ponderée</div>
                                <div>{parseFloat(item.moyenne_ponderee)}/20</div>
                                <div>DECISION : {item.decision_jury}</div>
                                <div>COMPLEMENTS VALIDES : {item.complements_valides === "null" ? "":item.complements_valides}</div>
                            </div>

                            <div className="signatues d-flex justify-content-between mb-4">
                                <div className="sec_jury">
                                    <div>Secretaire du Jury</div>
                                    <span>{item.systeme}</span>
                                </div>
                                <div className="pre_jury">
                                    <div className="titre">President du Jury</div>
                                    <div>{item.systeme}</div>
                                </div>
                            </div>

                            <p className="infosMsg"><strong>NB :</strong> Ce document est d'usage interne et ne peut jamais prendre la place d'un bullatin de cotes, il vous est delivré à titre informatif.</p>
                            
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}
export default ConsultResult;