// import { useEffect, useState } from "react";
import IsLoading from "../../SmallComponents/IsLoading";
import { Link } from "react-router-dom";
import url from "../../Config/Config";
import { useState } from "react";
import SideLinks from "../SideLinks";
import axios from "axios";

const CreateTime = ( { handleSuccess, allDatas, setAllDatas, hangeMoveContentPage, etats, darkMode, setDarkMode, activeContent, setActiveContent } ) => {
    const [classeName, setClasseName] = useState('');

    const currentDate = new Date();
    
    const [teacherTime, setTeacherTime] = useState([]);

    const [univId, setUnivId] = useState("");
    const [freeSemester, setFreeSemester] = useState("");
    const [userNumber, setUserNumber] = useState("");
    const [username, setUsername] = useState("");
    const [created, setCreated] = useState("");
    const [dates, setDates] = useState("");

    const handleChanges = (e, title) => {
        const myId = e.target.value;

        setCreated(currentDate)
        setUserNumber(etats.userNumber)
        setUsername(etats.username)

        // console.log(currentDate);
        // console.log(allDatas.teachersTime);

        if(title === "freeSemester"){
            allDatas.semesters
            .filter(sem => sem._id === myId)
            .map(sem => {
                setFreeSemester(sem.name)
                setDates(sem.startDate+" - "+sem.endDate)
            })
        } 
        if(title === "univId"){
            setUnivId(e.target.value)
        }
    }

    const handleAddUser = (e) => {
        e.preventDefault()
        const newTeacherTime = { userNumber, username, freeSemester, univId, created, dates };
        if(freeSemester !== ""){
            const iFind =  allDatas.teachersTime
            .filter(semest => semest.userNumber === userNumber)
            .filter(semest => semest.freeSemester === freeSemester)
            .filter(semest => semest.username === username)
            .filter(semest => semest.univId === univId)

            if (iFind > 0) {
                handleSuccess("Ajout en memoire", "Un objet avec la date spécifiée a été trouvé")
                console.log("Un objet avec la date spécifiée a été trouvé:", iFind);
            } else {
                console.log("Aucun objet avec la date spécifiée n'a été trouvé.");
                console.log('Insertion...');
                setTeacherTime([...teacherTime, newTeacherTime]); 
                setFreeSemester('');
                setUnivId('');
                console.log(teacherTime);
                return;
            }
        }
        console.log("Veuillez renseigner tous les champs !");
    }

    const handleSendClasses = () => {
        if (teacherTime.length > 0) {
            fetch(`${url.urlApi}/saveTeachersTime`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teacherTime),
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
            return
        }
        console.log("Vous ne pouvez pas envoyer un tableau sans objets...");
    }

    const handleSendData = (e) => {
        e.preventDefault()
        if(freeSemester !== "" && univId !== ""){
            handleAddUser()
            handleSendClasses()
            setTeacherTime([])
            console.log(teacherTime);
            return
        }
        handleSendClasses()
        setTeacherTime([])
        console.log(teacherTime);

    };

    const handleDelete = async (item) => {
        try {
            const response = await axios.post(`${url.urlApi}/deleteTimeRecording`,
            {
                _id: item._id,
                freeSemester: item.freeSemester,
                univId: item.univId,
                userNumber: item.userNumber,
                username: item.username,
                created: item.created,
            }
            );
        
            if (response.status === 200) {
                console.log(response);
                handleSuccess("Message de suppression", response.data.message)
              //   ttiskaSync();
            } else {
                console.error('#1. Erreur lors de l\'envoi du fichier :', response);
            }
        } catch (error) {
            console.error('#2. Erreur lors de l\'envoi :', error);
        }
    };

    return (
        <div className={darkMode ? "d-flex justify-content-center align-items-center mt-4 text-light container":"d-flex justify-content-center align-items-center mt-4 container"}>     
            <div className="row">     
                <div className="col-md-12 col-lg-6 mb-4">
                    <h5 className={darkMode ? "pb-4 text-light" : "pb-4 text-dark"}>Supply your time.</h5>
                    <div className={darkMode ? "dark_object rounded p-4 position-relative " : "bg-white rounded p-4 position-relative "}>
                        <div className="card-body pt-3">
                            {/* <h2 className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Enregistrer les semestres pour {etats.univId}.</h2> */}
                            
                            <form className="was-validated">
                                <label htmlFor="univId" className={"d-flex justify-content-between mt-4 mb-1"}>Veillez selectionner une université</label>
                                <select name="univId" value={univId} onChange={ (e) => handleChanges(e, "univId") } className="form-control">
                                    <option value={""}>Veillez choisir votreuniversité</option>
                                    {allDatas.users
                                    .filter(univ => univ.userType === "university")
                                    .map(u => (
                                        <option key={u._id} value={u.univId}>{u.univId}</option>
                                    ))}
                                </select>

                                <label htmlFor="freeSemester" className={"d-flex justify-content-between mt-4 mb-1"}>Veillez selectionner un semestre</label>
                                <select name="freeSemester" value={freeSemester} onChange={ (e) => handleChanges(e, "freeSemester") } className="form-control">
                                    <option value={""}>Veillez choisir le semestre</option>
                                    {allDatas.semesters
                                    .filter(sem => sem.univId === univId)
                                    .map(sem => (
                                        <option key={sem._id} value={sem._id}>De {sem.startDate} à {sem.endDate} </option>
                                    ))}
                                </select>

                                
                                <div className="d-flex mt-4">
                                    <button className="btn btn-outline-info m-1" onClick={handleAddUser}>Ajouter en memoire</button>
                                    {teacherTime.length > 0 && freeSemester === "" && univId === "" ?
                                    <button className="btn btn-primary m-1" onClick={handleSendData}>Envoyer au serveur</button>
                                    :""}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-lg-6">
                    <h5 className="d-flex justify-content-start border-bottom pb-4">Your free time</h5>

                    {allDatas.teachersTime.filter(tt => tt.userNumber === etats.userNumber).length === 0 ?
                    <p className="d-flex justify-content-start">When you will register your time, we will show all your informations at this side of the form.</p>
                    :
                    <div className="p-4 border">
                        <p className="d-flex justify-content-start">make a gaze to your registrement time for universities.</p>
                        {[...new Set(allDatas.teachersTime.map((item) => item.univId))]
                        .map((univId) => (
                        <div key={univId}>
                            <p className="d-flex justify-content-start">{univId}</p>
                            {allDatas.teachersTime
                            .filter(tt => tt.userNumber === etats.userNumber)
                            .filter(tt => tt.univId === univId)
                            .map(tt => (
                                <div className="p-2" key={tt._id}>
                                    <p className="d-flex justify-content-start">{tt.freeSemester}</p>
                                    <p className="d-flex justify-content-start">{tt.created}</p>
                                    <button onClick={() => handleDelete(tt)} className="btn btn-outline-danger">Supprimer cet élément</button>
                                </div>
                            ))}
                        </div>
                        ))}
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default CreateTime;