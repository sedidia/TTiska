import { useState, useEffect } from "react";

import Appariteur from "./Appariteur";
import Student from "./Student/Student";
import Teacher from "./Teacher/Teacher";

const TtimeHome = ( { darkMode } ) => {
    const [userType, setUserType] = useState("normal");

    useEffect(() => {
        setUserType("appariteur")
    }, [])

    return (
        <div>
            {userType === "appariteur" ?
            <Appariteur darkMode={darkMode} />
            : userType === "enseignant" ?
            <Teacher />
            : userType === "etudiant" ?
            <Student />
            : 
            <div>Please login</div>
            }
        </div>
    )
}
export default TtimeHome;