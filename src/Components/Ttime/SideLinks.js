import { Link } from "react-router-dom";

const SideLinks = ( {darkMode, hangeMoveContentPage, activeContent, etats} ) => {
    console.log(etats);
    return (
        <div className="p-4">     
            <h2 className="d-flex mt-2">Others operations links </h2>
            <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("Cba")}>I wanna go at the home page</Link>
            {etats.isOnline ?
            <div>
                {etats.userType === "university"?
                <div>     
                    {activeContent !== "CreateSemester"?
                    <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("CreateSemester")}>I wanna create a semesters</Link>
                    :""}
                    {activeContent !== "SaveClasses"?
                    <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("SaveClasses")}>I wanna save a Classe</Link>
                    :""}
                    {activeContent !== "SaveApparitor"?
                    <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("SaveApparitor")}>I wanna save an apparitor</Link>
                    :""}
                    {activeContent !== "AttributeClasses"?
                    <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("AttributeClasses")}>I wanna atteibute Classes to sections</Link>
                    :""}
                </div>
                :""}
                {etats.userType === "apparitor"?
                <div>     
                    {activeContent !== "ConsultSectionsClasses"?
                    <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("ConsultSectionsClasses")}>I wanna Consult sections classes</Link>
                    :""}
                    {activeContent !== "ProgramSchedulsCourses"?
                    <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("ProgramSchedulsCourses")}>I wanna Program the scheduls courses</Link>
                    :""}
                    {activeContent !== "ProgramSemestersCourses"?
                    <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("ProgramSemestersCourses")}>I wanna program semesters courses</Link>
                    :""}
                    {activeContent !== "SaveCourses"?
                    <Link className={darkMode ? "d-flex mt-4 text-info btn-info" : "d-flex mt-4 text-info btn-info"} to="#" onClick={() => hangeMoveContentPage("SaveCourses")}>I wanna save my section's courses</Link>
                    :""}
                </div>
                :""}
            </div>
            :<p>Vous etes hors connexion, veillez vous connecter !</p>}
            
        </div>
    )
}
export default SideLinks;