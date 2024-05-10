import SideLinks from "../SideLinks";
import { useState } from "react";

const ConsultSectionsClasses = ( {darkMode, hangeMoveContentPage, activeContent, etats, allDatas} ) => {
    const [semester, setSemester] = useState("");
    let indic = 0;
    return (
        <div className={darkMode ? "container d-flex justify-content-center mt-4 text-light" : "container d-flex justify-content-center mt-4"}>
            <div>
                <div className=" row">
                    <div className={darkMode ? "dark_object rounded p-4 card-body pt-3 col-md-12 col-lg-6" : "bg-white rounded p-4 card-body pt-3 col-md-12 col-lg-6"}>
                        <h2 className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Les cours par semestre</h2>
                        <p className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Les salles de classe suivantes appartiennent à la section {etats.section}.</p>

                        <label htmlFor="semester" className={"d-flex justify-content-between mt-4 mb-1"}>
                            {(semester === null || semester === "" || semester === " ") ? "Le nom de la semester ne doit pas etre vide.":
                            "Merci d'avoir saisi un nom valide !"
                            }
                        </label>
                        {/* <label htmlFor="semester" className={"d-flex justify-content-between mt-4 mb-1"}>Quelle semester gerera-t-il ?</label> */}
                        <select name="semester" value={semester} onChange={ (e) => setSemester(e.target.value) } className="form-control">
                            <option value={""}>Veillez choisir votreuniversité</option>
                            {allDatas.semesters
                            .filter(univ => univ.univId === etats.univId)
                            .map(u => (
                                <option key={u._id} value={u.cours}>{u.name}</option>
                            ))}
                        </select>

                        {allDatas.courses
                        .filter(item => item.section === etats.section)
                        .map(item => (
                            <li className="d-flex justify-content-between p-2">0{indic=indic+1} : {item.cours} par {item.teacherName} <button className="btn btn-outline-primary">Aligner</button> </li>
                        ))}
                        
                    </div>
                    <div className="pt-3 col-md-12 col-lg-6 ">
                        <SideLinks hangeMoveContentPage={hangeMoveContentPage} activeContent={activeContent} etats={etats} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ConsultSectionsClasses;