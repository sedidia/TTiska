import { useEffect, useState, useMemo  } from "react";
import SideLinks from "../SideLinks";
import { Link } from "react-router-dom";
import urls from "../../Config/Config";
import IsLoading from "../../SmallComponents/IsLoading";

const ProgramSchedulesCourses = ( {darkMode, hangeMoveContentPage, activeContent, etats, allDatas, setAllDatas, handleSuccess} ) => {
    const [selectedClass, setSelectedClass] = useState("");
    
    const [selectedSection, setSelectedSection] = useState("");
    const [foundedClasse, setFoundedClasse] = useState([]);
    const [sections, setSections] = useState([]);
    const [updateClasse, setUpdateClasse] = useState([]);
    const [schedules, setSchedules] = useState([]);
    
    const [hideList, setHideList] = useState(false);
    const [classesEmpty, setClassesEmpty] = useState(false);
    const [sectionsEmpty, setSectionsEmpty] = useState(false);

    const [classeExist, setClasseExist] = useState(false);
    const [sectionExist, setSectionExist] = useState(false);
    const [isSearching, setIsSearching] = useState(true);
    
    const [cours, setCours] = useState("");
    const [section, setsection] = useState("")
    const [filiere, setfiliere] = useState("")
    const [promotion, setpromotion] = useState("")
    const [teacherNumber, setteacherNumber] = useState("")
    const [teacherName, setteacherName] = useState("")
    const [semester, setsemester] = useState("")
    const [activeDate, setactiveDate] = useState("")

    const [myActiveDate, setmyActiveDate] = useState("")

    const [dates, setdates] = useState("")
    const [classId, setclassId] = useState("")
    const [className, setclassName] = useState("")
    const [univId, setunivId] = useState("")

    const [startTime, setstartTime] = useState("")
    const [endTime, setendTime] = useState("")

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

    const handleChanges = (e, title) => {
        setHideList(false)
        title === "cours" ? setCours(e) :
        title === "classe" ? setSelectedClass(e.target.value) :
        title === "activeDate" ? setactiveDate(""+e.target.value+" : "+startTime+" - "+endTime+"") :
        title === "startTime" ? setactiveDate(""+myActiveDate+" : "+e.target.value+" - "+endTime+"") :
        title === "endTime" ? setactiveDate(""+myActiveDate+" : "+startTime+" - "+e.target.value+"") :
        console.log("non title info")
        // if(title === "activeDate" || title === "startTime" || title === "endTime"){
        //     setactiveDate(""+myActiveDate+" : "+startTime+" - "+endTime+"")
        // }
    }
    const selectCours = (data) => {
        setHideList(true)
        handleChanges(data.cours, "cours")
        handleChanges(data.className, "classe")
        setdates(data.dates)
        setsection(data.section)
        setfiliere(data.filiere)
        setpromotion(data.promotion)
        setteacherNumber(data.teacherNumber)
        setteacherName(data.teacherName)
        setsemester(data.semester)
        // setactiveDate(data.activeDate)
        setclassId(data._id)
        setunivId(data.univId)
    }
    const addSchedule = () => {
        const newCours = { 
            cours,
            section,
            filiere,
            promotion,
            teacherNumber,
            teacherName,
            semester,
            activeDate,
            dates,
            classId,
            className,
            univId,
            
        };
        setSchedules([...schedules, newCours]); 
    }
    const handleConfirmeSchedule = () => {
        console.log(schedules);
    }

    
    return (
        <div className={darkMode ? "container d-flex justify-content-center mt-4 text-light" : "container d-flex justify-content-center mt-4"}>
            <div>
                <div className="row p-3">
                    {!classesEmpty && !sectionsEmpty ?
                    <div className={darkMode ? "dark_object rounded p-4 card-body pt-3 col-md-12 col-lg-6" : "bg-white rounded p-4 card-body pt-3 col-md-12 col-lg-6"}>
                        <p>Veillez écrire les noms de la classe et de la section à la main pour une meillere confirmation !</p>
                        <form className="was-validated">
                            <label htmlFor="selectedClass" className={"d-flex justify-content-between mt-4 mb-1"}>Veillez selectionner une classe</label>
                            <select name="selectedClass" value={selectedClass} onChange={ (e) => handleChanges(e, "classe") } className="form-control">
                                <option value={""}>Veillez choisir une classe</option>
                                {allDatas.classes
                                .filter(univ => univ.univId === etats.univId)
                                .filter(univ => univ.section === etats.section)
                                .map(u => (
                                    <option key={u._id} value={u.name}>{u.name}</option>
                                ))}
                            </select>

                            <label htmlFor="cours" className={"d-flex justify-content-between mt-4 mb-1"}>Veillez selectionner un cours</label>
                            {/* <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="text" id="cours" value={cours} name="cours" onChange={ (e) => handleChanges(e, "cours") } placeholder="Le cours" required />  */}
                            <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="text" id="cours" value={cours} name="cours" onChange={ (e) => setCours(e.target.value) } placeholder="Le cours" required /> 
                            
                            {/* {cours !== ""?
                            :""} */}
                            {!hideList && cours !== ""?
                            allDatas.courses
                            .filter(cours => cours.univId === etats.univId)
                            .filter(c => c.cours.includes(cours))
                            .map(myCourse => (
                                <div key={myCourse._id} onClick={() => selectCours(myCourse)} className="d-flex p-2">{myCourse.cours}</div>
                            ))
                            :""}


                            <label htmlFor="activeDate" className={"d-flex justify-content-between mt-4 mb-1"}>Veillez selectionner une date</label>
                            <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="date" id="activeDate" value={activeDate} name="activeDate" onChange={ (e) => handleChanges(e, "activeDate") } placeholder="La date" required /> 
                                
                            <div className="d-flex justify-content-between">
                                <div className="m-4">
                                    de
                                </div>
                                <input className={darkMode ? "m-4 bg-dark form-control text-light" : "m-4 bg-light form-control text-dark"}  type="time" id="startTime" value={startTime} name="startTime" onChange={ (e) => handleChanges(e, "startTime") } placeholder="L'heure de debut" required /> 
                                <div className="m-4">
                                    à
                                </div>
                                <input className={darkMode ? "m-4 bg-dark form-control text-light" : "m-4 bg-light form-control text-dark"}  type="time" id="endTime" value={endTime} name="endTime" onChange={ (e) => handleChanges(e, "endTime") } placeholder="L'heure de fin" required /> 
                               
                            </div>

                            {activeDate !== "" && cours !== "" && selectedClass !== "" && startTime !== "" && endTime !== ""?
                            <Link to="" onClick={ addSchedule } className="btn btn-outline-info">Ajouter.</Link>
                            :""}
                            {schedules.length > 0 ?
                            <Link to="" onClick={ handleConfirmeSchedule } className="btn btn-outline-info">Confirmer la programmation.</Link>
                            :""}
                        </form>
                        
                        
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
                            <Link to="" onClick={ () => hangeMoveContentPage("SaveClasses") } className="btn btn-outline-info">Enregistrer un appariteur de section.</Link>
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
                        {classeExist && sectionExist && selectedClass !== "" && selectedSection !== "" ?
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

                    <div className="pt-3 col-md-12 col-lg-6 ">
                        <SideLinks hangeMoveContentPage={hangeMoveContentPage} activeContent={activeContent} etats={etats} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProgramSchedulesCourses;