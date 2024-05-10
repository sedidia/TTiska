import { Link } from "react-router-dom";

const SideLinks = ( {darkMode, hangeMoveContentPage, activeContent, etats} ) => {
    // console.log(etats);
    return (
        <div className="p-4">     
            <h2 className="d-flex mt-2">Les liens operationnels</h2>
            <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("HomeUniv")}>Aller à la page d'accueil</Link>
            {etats.isOnline ?
            <div>
                {etats.userType === "university"?
                <div>     
                    {activeContent !== "SaveCourses"?
                    <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("SaveCourses")}>Je veux enregistrer les cours pour {etats.univId}.</Link>
                    :""}
                    {activeContent !== "CreateSemester"?
                    <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("CreateSemester")}>Je veux créer les semetres pour {etats.univId}.</Link>
                    :""}
                    {activeContent !== "SaveClasses"?
                    <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("SaveClasses")}>Enregistrer les salles de classes pour {etats.univId}.</Link>
                    :""}
                    {activeContent !== "SaveApparitor"?
                    <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("SaveApparitor")}>Enregistrer les appariteurs pour {etats.univId}.</Link>
                    :""}
                    {activeContent !== "AttributeClasses"?
                    <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("AttributeClasses")}>Gérer les attributions des salles aux sections</Link>
                    :""}
                </div>
                :""}
                {etats.userType === "doorman"?
                <div>     
                    {activeContent !== "ConsultSectionsClasses"?
                    <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("ConsultSectionsClasses")}>Consulter les salles des classes de la section.</Link>
                    :""}
                    {activeContent !== "ProgramSchedulsCourses"?
                    <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("ProgramSchedulsCourses")}>Programmer l'horaire des cours</Link>
                    :""}
                    {activeContent !== "ProgramSemestersCourses"?
                    <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("ProgramSemestersCourses")}>Programmer les cours à étudier par semestre</Link>
                    :""}
                </div>
                :""}
            </div>
            :<p>Vous etes hors connexion, veillez vous connecter !</p>}
            
        </div>
    )
}
export default SideLinks;