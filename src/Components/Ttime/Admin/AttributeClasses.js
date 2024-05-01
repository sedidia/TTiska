import { useEffect, useState, useMemo  } from "react";
import SideLinks from "../SideLinks";
import { Link } from "react-router-dom";
import urls from "../../Config/Config";

const AttributeClasses = ( {darkMode, hangeMoveContentPage, activeContent, etats, allDatas, setAllDatas} ) => {
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [foundedClasse, setFoundedClasse] = useState([]);
    const [sections, setSections] = useState([]);
    const [updateClasse, setUpdateClasse] = useState([]);
    
    const [classesEmpty, setClassesEmpty] = useState(false);
    const [sectionsEmpty, setSectionsEmpty] = useState(false);

    const [classeExist, setClasseExist] = useState(false);
    const [sectionExist, setSectionExist] = useState(false);
    

    const ttiskaSync = async () => {
        console.log("salut sync");
        try {
          const response = await fetch('http://localhost:3001/collections');
          const data = await response.json();
          setAllDatas(data);

          data.classes.filter(classe => classe.univId === etats.univId).length === 0 ? setClassesEmpty(true) : setClassesEmpty(false)
          data.users.filter(user => user.univId !== null).filter(user => user.univId === etats.univId).filter(user => user.userType === "doorman").length === 0 ? setSectionsEmpty(true) : setSectionsEmpty(false)

            //   init states
            // setSelectedClass("")
            // setSelectedSection("")
            // setFoundedClasse([])
            // setSections([])
            // setUpdateClasse([])
            // setClassesEmpty(false)
            // setSectionsEmpty(false)
            // setClasseExist(false)
            // setSectionExist(false)
            //   init states
        } catch (error) {
          console.error('Erreur lors de la récupération des données :', error);
        }
    };
    useEffect(() => {
        allDatas.classes.filter(classe => classe.univId === etats.univId).length === 0 ? setClassesEmpty(true) : setClassesEmpty(false)
        allDatas.users.filter(user => user.univId !== null).filter(user => user.univId === etats.univId).filter(user => user.userType === "doorman").length === 0 ? setSectionsEmpty(true) : setSectionsEmpty(false)
    }, [])
    
    const handleSendClasses = () => {
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
                ttiskaSync()
            })
            .catch(error => console.error(error));
            return
        }
        console.log("Vous ne pouvez pas envoyer un tableau sans objets...");
    }

    const handleSerchClasse = (e, message) => {
        setSelectedClass(e.target.value)
        if(allDatas.classes
            .filter(classe => classe.section === null)
            .filter(classe => classe.name.toLowerCase() === e.target.value.toLowerCase())
            .filter(classe => classe.univId.toLowerCase() === etats.univId.toLowerCase())
            .length > 0
        ){
            setClasseExist(true)
        }else{
            setClasseExist(false)
        }
        
        setFoundedClasse(
            allDatas.classes
            .filter(classe => classe.section === null)
            .filter(classe => classe.univId.toLowerCase() === etats.univId.toLowerCase())
            .filter(classe => classe.name.toLowerCase().includes(message === "classe" ? e.target.value.toLowerCase() : "AAAWWW"))
        );  
        
    }
    const handleSerchSection = (e, message) => {
        setSelectedSection(e.target.value)
        if(allDatas.users
            .filter(user => user.univId !== null)
            .filter(user => user.section !== null)
            .filter(user => user.userType === "doorman")
            .filter(user => user.univId.toLowerCase() === etats.univId.toLowerCase())
            .filter(user => user.section.toLowerCase() === e.target.value.toLowerCase()).length > 0
        ){
            setSectionExist(true)
        }else{
            setSectionExist(false)
        }
        
        setSections(
            allDatas.users
            .filter(user => user.univId !== null)
            .filter(user => user.section !== null)
            .filter(user => user.userType === "doorman")
            .filter(user => user.univId.toLowerCase() === etats.univId.toLowerCase())
            .filter(user => user.section.toLowerCase().includes(message === "section" ? e.target.value.toLowerCase() : "AAAWWW") )
        );  
    }
    
    const handleClassSelected = (e, message, item) => {
        e.preventDefault()
        message === "section" ? setSelectedSection(item.section) : setSelectedClass(item.name)

        if(allDatas.classes
            .filter(classe => classe.section === null)
            .filter(classe => classe.name.toLowerCase() === selectedClass.toLowerCase())
            .filter(classe => classe.univId.toLowerCase() === etats.univId.toLowerCase())
            .length > 0
        ){
            setClasseExist(true)
        }else{
            setClasseExist(true)
        }

        if(allDatas.users
            .filter(user => user.univId !== null)
            .filter(user => user.section !== null)
            .filter(user => user.userType === "doorman")
            .filter(user => user.univId.toLowerCase() === etats.univId.toLowerCase())
            .filter(user => user.section.toLowerCase() === selectedSection.toLowerCase()).length > 0
        ){
            setSectionExist(true)
        }else{
            setSectionExist(true)
        }

        if(message !== "section"){
            setUpdateClasse([
                {
                    "name": item.name,
                    "section": selectedSection,
                    "univId": item.univId,
                }
            ]);
        }

        
        setFoundedClasse([])
        setSections([])
    }

    return (
        <div className={darkMode ? "container d-flex justify-content-center mt-4 text-light" : "container d-flex justify-content-center mt-4"}>
            <div>
                <div className=" row">
                    {!classesEmpty && !sectionsEmpty ?
                    <div className={darkMode ? "dark_object rounded p-4 card-body pt-3 col-md-12 col-lg-6" : "bg-white rounded p-4 card-body pt-3 col-md-12 col-lg-6"}>
                        <label htmlFor="selectedClass" className={"d-flex justify-content-between mt-4 mb-1"}>
                            Classe
                        </label>
                        <input onChange={ (e) => handleSerchClasse(e, "classe") } className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="text" id="selectedClass" value={selectedClass} placeholder="The class name" required /> 
                        {selectedClass !== "" && foundedClasse.map(item => (
                        <Link className="d-flex text-decoration-none" to="" key={item._id} onClick={(e) => handleClassSelected(e, "classe", item)}>{item.name}</Link>
                        ))} 
                        
                        
                        <label htmlFor="selectedSection" className={"d-flex justify-content-between mt-4 mb-1"}>
                            Sections/Doormen
                        </label>
                        <input onChange={ (e) => handleSerchSection(e, "section") } className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="text" id="selectedSection" value={selectedSection} placeholder="The section's name" required /> 
                        {selectedSection !== "" && sections.map(item => (
                        <Link className="d-flex text-decoration-none p-2" to="" key={item._id} onClick={(e) => handleClassSelected(e, "section", item)}>Section: {item.section} Appariteur: {item.username === null ? "Non confirmé":item.username}</Link>
                        ))} 
                    </div>
                    :
                    <div className={darkMode ? "dark_object rounded p-4 card-body pt-3 col-md-12 col-lg-6" : "bg-white rounded p-4 card-body pt-3 col-md-12 col-lg-6"}>
                        <h5 className="mb-4">Selection</h5>
                        {classesEmpty ?
                        <div className="">
                            <div className="mb-4">Aucune classe enregistrée pour l'instant.</div>
                            <Link to="" onClick={() => hangeMoveContentPage("SaveClasses")} className="btn btn-outline-info">Enregistrer une salle de classe.</Link>
                        </div>
                        :""}
                        {sectionsEmpty ?
                        <div className="">
                            <div className="">Aucune section enregistrée pour l'instant.</div>
                            <Link to="" onClick={() => hangeMoveContentPage("SaveClasses")} className="btn btn-outline-info">Enregistrer un appariteur de section.</Link>
                        </div>
                        :""}
                        <Link to="" onClick={ttiskaSync} className="btn btn-outline-info mt-4">

                        <i className="icon-sync"></i>
                        </Link>
                    </div>
                    }

                    {!classesEmpty && !sectionsEmpty ?
                    <div className={darkMode ? "dark_object rounded p-4 card-body pt-3 col-md-12 col-lg-6" : "bg-white rounded p-4 card-body pt-3 col-md-12 col-lg-6"}>
                        {classeExist && sectionExist && selectedClass !== "" && selectedSection !== "" ?
                        <div>
                            <h5>Selection</h5>
                            <h5 className="iconSorry">✔</h5>
                            <div className="">Selon votre selection, la salle {selectedClass} sera attribuée à <br/> la section {selectedSection}</div>
                            <Link onClick={handleSendClasses} to="" className="btn btn-primary mt-4"><i className="icon-sync"></i> Confirmer L'attribution</Link>
                        
                        </div>
                        :
                        <div>
                            <h5 className="iconSorry">😢</h5>
                            <div className="">Oooooops</div>
                            <Link to="" onClick={ttiskaSync} className="btn btn-outline-info mt-4">

                        <i className="icon-sync"></i>
                        </Link>
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