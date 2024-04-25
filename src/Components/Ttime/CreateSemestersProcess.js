import { Link } from "react-router-dom";
const CreateSemestersProcess = ({darkMode, courseSaved, saveCourses, nextStep}) => {

    return (
        <div>
                            <h3>createSemestersProcess</h3>
                            <Link to="" className="mt-3 btn btn-outline-info" onClick={(e) => nextStep(e, "programTeacher")}>Suivant</Link>
                        </div>
    )
}
export default CreateSemestersProcess;