// import React, { useState } from 'react';
// import axios from 'axios';
// // import XLSX from 'xlsx';
// import XLSX from "xlsx-to-json"

// const CreateCourseProcess = ({ darkMode, courseSaved, saveCourses, nextStep }) => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       console.error('Veuillez sélectionner un fichier.');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(sheet);

//       // Vérifier les colonnes (nom, promotion, age, filiere)
//       if (!jsonData.every(row => ['nom', 'promotion', 'age', 'filiere'].every(col => Object.keys(row).includes(col)))) {
//         console.error('Les colonnes du fichier Excel ne sont pas correctes.');
//         return;
//       }

//       // Créer un tableau d'objets à partir des données du fichier Excel
//       const tableauObjets = jsonData.map(row => ({
//         nom: row.nom,
//         promotion: row.promotion,
//         age: row.age,
//         filiere: row.filiere
//       }));

//       // Envoyer le tableau d'objets à l'API Node.js
//       try {
//           // const response = await axios.post('http://localhost:3001/api-route', { data: tableauObjets });
//           const response = axios.post('http://localhost:3001/api-route', { data: tableauObjets });
//         console.log('Réponse de l\'API :', response.data);
//       } catch (error) {
//         console.error('Erreur lors de l\'envoi des données à l\'API :', error.response.data);
//       }
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Envoyer</button>
//       </form>
//     </div>
//   );
// };

// export default CreateCourseProcess;














import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Copie = ({darkMode, courseSaved, saveCourses, nextStep}) => {
    const [file, setFile] = useState(null);
    const [folderName, setFolderName] = useState('');
    const [insertOrReplace, setInsertOrReplace] = useState(false);

    useEffect(() => {
        setInsertOrReplace(false)
        setFolderName('unilu')
    }, [])

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            console.error('Veuillez sélectionner un fichier.');
            return;
        }

        // setFolderName("isc")
        // const newFileName = folderName + '_' + file.name;

        const formData = new FormData();
        formData.append('excelFile', file, file.name);
        formData.append('nom_dossier', folderName);
        formData.append('insertOrReplace', insertOrReplace);

        console.log(formData);

        try {
            const response = await axios.post('http://localhost:3001/createFolderAndUploadFile', formData);
    
            if (response.status === 200) {
                console.log('Fichier envoyé avec succès !');
                if(response.data.id === 10){
                    console.log("remplacer ?"); // the user must check yes to replace the file in the directory folder OR not to reject the server's request
                    return
                }
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
export default Copie;


