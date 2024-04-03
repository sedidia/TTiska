import { useEffect, useState } from "react";
import CreateCourseProcess from "./CreateCourseProcess";
import CreateTeacherProcess from "./CreateTeacherProcess";
import CreateSemestersProcess from "./CreateSemestersProcess";
import ProgramTeacherProcess from "./ProgramTeacherProcess";
import IsLoading from "../../SmallComponents/IsLoading";

const Appariteur = ({darkMode}) => {
    const [activeStep, setActiveStep] = useState(""); // createCourse createSemesters programTeacher
    const [courseSaved, setCourseSaved] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [apparitoConfigYet, setApparitoConfigYet] = useState(false);
    
    const nextStep = (e, nextContent) => {
        e.preventDefault(false)
        // active the next buttom
        if(nextContent === "programTeacher"){
            setSearchActive(true)
            setTimeout(() => {
                setActiveStep(nextContent)
                setSearchActive(false)
            }, 3000);
            return
        }
        setActiveStep(nextContent)
    }

    const saveCourses = () => {
        // active the next buttom
        setCourseSaved(true)
    }

    useEffect(() => {
        // setApparitoConfigYet(true)
        if(apparitoConfigYet)
        {
            setActiveStep("programTeacher")
            return
        }
        setActiveStep("createCourse")
    }, [apparitoConfigYet])

    return (
        <div className={darkMode ? "bg-dark text-light p-2" : "bg-light p-2"}>
            <div className="container mt-4 processes">
                <div className={
                    activeStep === "createCourse" ? "appariteurProcess createCourse" :
                    activeStep === "createTeacher" ? "appariteurProcess createTeacher" :
                    activeStep === "createSemesters" ? "appariteurProcess createSemesters" :
                    activeStep === "programTeacher" ? "appariteurProcess programTeacher"
                    : ""
                }>
                    <div className="createCourseProcess d-flex justify-content-center">
                        <CreateCourseProcess darkMode={darkMode} courseSaved={courseSaved} saveCourses={saveCourses} nextStep={nextStep} />
                    </div>
                    <div className="createCourseProcess d-flex justify-content-center">
                        <CreateTeacherProcess darkMode={darkMode} courseSaved={courseSaved} saveCourses={saveCourses} nextStep={nextStep} />
                    </div>
                    <div className="createSemestersProcess">
                        {!searchActive ?
                        <CreateSemestersProcess darkMode={darkMode} courseSaved={courseSaved} saveCourses={saveCourses} nextStep={nextStep} />
                        : 
                        <div>
                            <IsLoading darkMode={darkMode} />
                            <div>Chargement de vos information.</div>
                        </div>
                        }
                    </div>
                    <div className="programTeacherProcess">
                        <ProgramTeacherProcess darkMode={darkMode} courseSaved={courseSaved} saveCourses={saveCourses} nextStep={nextStep} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Appariteur;