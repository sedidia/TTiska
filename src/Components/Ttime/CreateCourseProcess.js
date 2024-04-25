import { Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';

const CreateCourseProcess = ({darkMode, courseSaved, saveCourses, nextStep}) => {
    const [file, setFile] = useState(null);
    const [folderName, setFolderName] = useState('isc');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            console.error('Veuillez sélectionner un fichier.');
            return;
        }

        const newFileName = folderName + '_' + file.name;

        const formData = new FormData();
        formData.append('excelFile', file, newFileName);
        formData.append('nom_dossier', folderName);

        try {
            const response = await axios.post('http://localhost:3001/createFolderAndUploadFile', formData);
    
            if (response.status === 200) {
                console.log('Fichier envoyé avec succès !');
                console.log('Réponse de l\'API :', response.data.id+" : "+response.data.message); // Afficher le message de l'API
            } else {
                console.error('#1. Erreur lors de l\'envoi du fichier :', response.data.id+" : "+response.data.message);
            }
        } catch (error) {
            console.error('#2. Erreur lors de l\'envoi du fichier :', error.response.data.message);
        }
    };

    return (
        <div className={darkMode ? "dark_object rounded p-4 position-relative col-md-12 col-lg-6 mb-4" : "bg-white rounded p-4 position-relative col-md-12 col-lg-6 mb-4"}>
            <div className="card-body pt-3">
                <h5 className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Etape 1 : Commençons par l'enregistrement des cours</h5>
                <p className={darkMode ? "text-light" : "text-dark"}>Pour une bonne gestion des horaires pour votre établissement, nous trouvons bon de commencer par l'enregistrement des cours. Le nom de votre fichier Excel doit ressembler à <strong>isc2024_1semestre_bac1_info.xlsx</strong> afin de permettre à la plateforme de bien gérer votre fichiers </p>
                                
                                
                <form onSubmit={handleSubmit} className="was-validated">
                    <label htmlFor='liste' className="mb-3 d-flex justify-content-start align-items-center">Veillez selectionner unfichier !</label> 
                    <div className="mb-3">
                        <input type="file" onChange={handleFileChange} id='liste' className={darkMode ? "bg-dark mb-3 form-control text-light" : "bg-light mb-3 form-control text-dark"} aria-label="file example" required />
                    </div> 
                    
                    {!courseSaved ?
                    <button type="submit" className="mt-3 btn btn-outline-info" onClick={saveCourses}>Enregistrer le fichier</button>
                    :
                    <Link to="" className="mt-3 btn btn-outline-info" onClick={(e) => nextStep(e, "createTeacher")}>Aller à Etape suivante du processus</Link>
                    }
                </form>
            </div>
        </div>
    )
}
export default CreateCourseProcess;


