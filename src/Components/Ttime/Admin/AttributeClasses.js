import { useEffect, useState, useMemo  } from "react";
import SideLinks from "../SideLinks";
import { Link } from "react-router-dom";
import urls from "../../Config/Config";
import IsLoading from "../../SmallComponents/IsLoading";

const AttributeClasses = ( {darkMode, hangeMoveContentPage, activeContent, etats, allDatas, setAllDatas, handleSuccess} ) => {
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [foundedClasse, setFoundedClasse] = useState([]);
    const [sections, setSections] = useState([]);
    const [updateClasse, setUpdateClasse] = useState([]);
    
    const [classesEmpty, setClassesEmpty] = useState(false);
    const [sectionsEmpty, setSectionsEmpty] = useState(false);

    const [classeExist, setClasseExist] = useState(false);
    const [sectionExist, setSectionExist] = useState(false);
    const [isSearching, setIsSearching] = useState(true);
    const [sendAbled, setSendAbled] = useState(false);
    

    const ttiskaSync = (title, message) => {
        setIsSearching(true)
        fetch(`${urls.urlApi}/collections`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify(updateClasse),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setAllDatas(data);

            data.classes.filter(classe => classe.univId === etats.univId).length === 0 ? setClassesEmpty(true) : setClassesEmpty(false)
            data.users.filter(user => user.univId !== null).filter(user => user.univId === etats.univId).filter(user => user.userType === "doorman").length === 0 ? setSectionsEmpty(true) : setSectionsEmpty(false)
            setIsSearching(false)

            setSelectedClass("")
            setSelectedSection("")
            handleSuccess(title, message)
        })
        .catch (error => {
            setIsSearching(false)
            console.error('Erreur lors de la récupération des données :', error);
        })
    };
    useEffect(() => {
        setIsSearching(false)
        allDatas.classes.filter(classe => classe.univId === etats.univId).length === 0 ? setClassesEmpty(true) : setClassesEmpty(false)
        allDatas.users.filter(user => user.univId !== null).filter(user => user.univId === etats.univId).filter(user => user.userType === "doorman").length === 0 ? setSectionsEmpty(true) : setSectionsEmpty(false)
    }, [])
    
    const handleSendClasses = () => {
        setIsSearching(true)
        if (updateClasse.length > 0) {
            fetch(`${urls.urlApi}/saveClasses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateClasse),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSendAbled(false)
                ttiskaSync("Confirmation d'attribution", data.message)
            })
            .catch(error => {
                setIsSearching(true)
                console.error(error)
            });
            return
        }
        console.log("Vous ne pouvez pas envoyer un tableau sans objets...");
    }

    const handleSerchClasse = (e, message) => {
        setSelectedClass(e.target.value)
        
        if(e.target.value !== "" && selectedSection !== ""){
            setClasseExist(true)
        }else{
            setClasseExist(false)
        }
        
    }
    const handleSerchSection = (e, message) => {
        console.log(selectedClass);
        setSelectedSection(e.target.value)
        
        if(e.target.value !== "" && selectedClass !== ""){
            setSectionExist(true)
        }else{
            setSectionExist(false)
        }
    }
    
    const handleAddClasse = (e) => {
        e.preventDefault()
        setSendAbled(true)
        setUpdateClasse([
            ...updateClasse,
            {
                "name": selectedClass,
                "section": selectedSection,
                "univId": etats.univId,
            }
        ]);
        setSelectedClass("")
        console.log(updateClasse);
        handleSuccess("Ajout réussi", "Attribution éffectuée avec succès. Cliquez sur le bouton de confirmation pour enregistrer les modification dans la base des données.")
    }

    return (
        <div className={darkMode ? "container d-flex justify-content-center mt-4 text-light" : "container d-flex justify-content-center mt-4"}>
            <div>
                <div className="row p-3">
                    {!classesEmpty && !sectionsEmpty ?
                    <div className={darkMode ? "dark_object rounded p-4 card-body pt-3 col-md-12 col-lg-6" : "bg-white rounded p-4 card-body pt-3 col-md-12 col-lg-6"}>
                        <p>Veillez écrire les noms de la classe et de la section à la main pour une meillere confirmation !</p>
                        <label htmlFor="selectedClass" className={"d-flex justify-content-between mt-4 mb-1"}>
                            <div className="p-0">
                                
                                <span>Classe</span>
                                <span className="p-2 text-danger">{!classeExist && selectedClass !== "" ? "Aucune classe":""}</span> 
                            </div>
                            <Link to="" onClick={ () => hangeMoveContentPage("SaveClasses") } className="text-info">{!classeExist && selectedClass !== "" ? "Ajoutez en une":""}</Link> 
                        </label>
                        
                        <select name="selectedClass" value={selectedClass} onChange={ (e) =>  handleSerchClasse(e, "classe") } className="form-control">
                            <option value={""}>Veillez choisir une classe</option>

                            {allDatas.classes
                            .filter(classe => classe.section === "")
                            .filter(classe => classe.univId.toLowerCase() === etats.univId.toLowerCase())
                            .filter(classe => classe.name.toLowerCase().includes( selectedClass.toLowerCase() ))
                            .map(item => (
                                <option key={item._id} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                        
                        <label htmlFor="selectedSection" className={"d-flex justify-content-between mt-4 mb-1"}>
                            Sections/Doormen
                        </label>
                        <select name="selectedSection" value={selectedSection} onChange={ (e) => handleSerchSection(e, "section") } className="form-control">
                            <option value={""}>Veillez choisir la section</option>

                            {allDatas.users
                            .filter(user => user.univId !== null)
                            .filter(user => user.section !== null)
                            .filter(user => user.userType === "doorman")
                            .filter(user => user.univId.toLowerCase() === etats.univId.toLowerCase())
                            .filter(user => user.section.toLowerCase().includes( selectedSection.toLowerCase() ))
                            .map(item => (
                                <option key={item._id} value={item.section}>{item.section}</option>
                            ))}
                        </select>

                        {selectedClass !== "" && selectedSection !== "" ?
                        <Link to="" onClick={ handleAddClasse } className="btn btn-outline-info mt-4">Ajouter une salle de classe.</Link>
                        :""}
                    </div>
                    :
                    <div className={darkMode ? "dark_object rounded p-4 card-body pt-3 col-md-12 col-lg-6" : "bg-white rounded p-4 card-body pt-3 col-md-12 col-lg-6"}>
                        <h5 className="mb-4">Selection</h5>
                        {classesEmpty ?
                        <div className="">
                            <div className="mb-4">Aucune classe enregistrée pour l'instant.</div>
                            <Link to="" onClick={ () => hangeMoveContentPage("SaveClasses") } className="btn btn-outline-info">Enregistrer une salle de classe.</Link>
                        </div>
                        :""}
                        {sectionsEmpty ?
                        <div className="">
                            <div className="">Aucune section enregistrée pour l'instant.</div>
                            <Link to="" onClick={ () => hangeMoveContentPage("SaveApparitor") } className="btn btn-outline-info">Enregistrer un appariteur de section.</Link>
                        </div>
                        :""}

                        {isSearching ?
                        <IsLoading darkMode={darkMode} />
                        :
                        <Link to="" onClick={ () => ttiskaSync("Rechargement de données", "Great, toutes les données on été chargées avec succès") } className="btn btn-outline-info mt-4">
                            <i className="icon-sync"></i>
                        </Link>
                        }
                    </div>
                    }

                    {!classesEmpty && !sectionsEmpty ?
                    <div className={darkMode ? "dark_object rounded p-4 card-body pt-3 col-md-12 col-lg-6" : "bg-white rounded p-4 card-body pt-3 col-md-12 col-lg-6"}>
                        {sendAbled ?
                        <div>
                            <h5>Selection</h5>
                            <h5 className="iconSorry">✔</h5>
                            <div className="">Selon votre selection, la salle {selectedClass} sera attribuée à <br/> la section {selectedSection}</div>
                            {isSearching ?
                            <IsLoading darkMode={darkMode} /> :
                            <Link onClick={handleSendClasses} to="" className="btn btn-primary mt-4"><i className="icon-sync"></i> Confirmer L'attribution</Link>
                            }
                        </div>
                        :
                        <div>
                            <h5 className="iconSorry">😢</h5>
                            <div className="">Oooooops</div>
                            {isSearching ?
                            <IsLoading darkMode={darkMode} />
                            :
                            <Link to="" onClick={ () => ttiskaSync("Rechargement de données", "Great, toutes les données on été chargées avec succès") } className="btn btn-outline-info mt-4">
                                <i className="icon-sync"></i>
                            </Link>
                            }
                        </div>
                        }
                    </div>
                    :
                    <div className={darkMode ? "dark_object rounded p-4 card-body pt-3 col-md-12 col-lg-6" : "bg-white rounded p-4 card-body pt-3 col-md-12 col-lg-6"}>
                        <h5 className="iconSorry">😢</h5>
                        <div className="">Ooops</div>
                        <p className="">No class/section found</p>
                    </div>
                    }

                    {/* {!doesntExist ?
                    <div className={darkMode ? "dark_object rounded p-4 card-body pt-3 col-md-12 col-lg-6" : "bg-white rounded p-4 card-body pt-3 col-md-12 col-lg-6"}>
                        <h5>Selection</h5>
                        <div className="">Selon votre selection, la salle {selectedClass} sera attribuée à <br/> la section {selectedSection}</div>
                        <Link onClick={handleSendClasses} to="" className="btn btn-primary mt-4"><i className="icon-sync"></i> Confirmer L'attribution</Link>
                        
                    </div>
                    :""} */}
                    {/* {doesntExist || (selectedClass === "" && selectedSection === "") ?
                    <div className={darkMode ? "dark_object rounded p-4 card-body pt-3 col-md-12 col-lg-6" : "bg-white rounded p-4 card-body pt-3 col-md-12 col-lg-6"}>
                    </div>
                    :
                    <div className={darkMode ? "dark_object rounded p-4 card-body pt-3 col-md-12 col-lg-6" : "bg-white rounded p-4 card-body pt-3 col-md-12 col-lg-6"}>
                        <h5>Selection</h5>
                        <div className="">Selon votre selection, la salle {selectedClass} sera attribuée à <br/> la section {selectedSection}</div>
                        <Link onClick={handleSendClasses} to="" className="btn btn-primary mt-4"><i className="icon-sync"></i> Confirmer L'attribution</Link>
                        
                    </div>
                    } */}
                    <div className="pt-3 col-md-12 col-lg-6 ">
                        <SideLinks hangeMoveContentPage={hangeMoveContentPage} activeContent={activeContent} etats={etats} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AttributeClasses;