import { Link } from "react-router-dom";
const ProgramTeacherProcess = ({darkMode, courseSaved, saveCourses, nextStep}) => {

    return (
        <div>
                        <h3>programTeacherProcess</h3>
                        <Link to="" className="mt-3 btn btn-outline-info" onClick={(e) => nextStep(e, "createCourse")}>confirmer</Link>
                    </div>
    )
}
export default ProgramTeacherProcess;