// import { useEffect, useState } from "react";
import IsLoading from "../../SmallComponents/IsLoading";
import { Link } from "react-router-dom";
import url from "../../Config/Config";
import { useState } from "react";
import SideLinks from "../SideLinks";
// import SuccessAlert from './SuccessAlert';

const SaveClasses = ( {darkMode, hangeMoveContentPage, activeContent, etats, handleSuccess, allDatas} ) => {
    const [classeName, setClasseName] = useState('');

    const [name, setName] = useState('');
    const [section, setSection] = useState("");
    const [classes, setClasses] = useState([]);
    const [univId, setUnivId] = useState(etats.univId);
    const [existClass, setExistClass] = useState(0);


    const handleChanges = (e, title) => {
        setExistClass(allDatas.classes.filter(item => item.name.toLowerCase() === e.target.value.toLowerCase()).length);

        setUnivId(etats.univId)
        title === "name" ? setName(e.target.value) : console.log("Oops...");
        const filtered = classes.filter(classe => 
            classe.name.toLowerCase().includes( e.target.value.toLowerCase() )
        );
        // setFilteredUsers(filtered);
        if (filtered.length === 0) {
            console.log('Aucune classe trouvé.');
        } else {
            console.log(filtered.name);
        }

        // title === "name" ? setName(e.target.value) : setSection(e.target.value)
    }

    const handleAddUser = () => {
        const newClass = { name, section, univId };
        if(name !== ""){
            setClasses([...classes, newClass]); 
            setName('');
            setSection('');
            console.log(classes);
            handleSuccess("Ajout d'une salle de classe", "La salle de classe a été enregistrée et attend son envoi au serveur !")
            return
        }
        console.log("Veillez renseigner les champs obligatoires");
    };

    const handleSendClasses = () => {

        if (classes.length > 0) {
            fetch(`${url.urlApi}/saveClasses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(classes),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                handleSuccess("Enregistrement dans la base des données", data.message)
            })
            .catch(error => console.error(error));
            return
        }
        console.log("Vous ne pouvez pas envoyer un tableau sans objets...");
    }

    const handleSendData = () => {
        if(name !== ""){
            handleAddUser()
            handleSendClasses()
            console.log(classes);
            return
        }
        handleSendClasses()
        console.log(classes);

    };
    return (
        <div className={darkMode ? "d-flex justify-content-center align-items-center mt-4 text-light container":"d-flex justify-content-center align-items-center mt-4 container"}>     
            <div className="row">     
                <div className="col-md-12 col-lg-6">
                    <div className={darkMode ? "dark_object rounded p-4 position-relative " : "bg-white rounded p-4 position-relative "}>
                        <div className="card-body pt-3">
                            <h2 className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Enregistrer une salle.</h2>
                            <p className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Veillez saisir le nom de la salle.</p>
                            <form className="was-validated">
                            <label htmlFor="name" className={"d-flex justify-content-between mt-4 mb-1"}>

                                {(name === null || name === "" || name === " ") ? "Le nom de la classe ne doit pas etre vide.":
                                "Merci d'avoir saisi un nom de classe valide !"
                                }
                            </label>
                            <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="text" id="name" value={name} name="name" onChange={ (e) => handleChanges(e, "name") } placeholder="The class name" required /> 
                            
                            <div className="d-flex mt-4">
                                {existClass === 0 ?
                                <button className="btn btn-outline-info" onClick={handleAddUser}>Ajouter à la liste</button>
                                :""}
                                {classes.length > 0 && name === "" ?
                                <button className="btn btn-outline-info" onClick={handleSendData}>Terminer</button>
                                :""}
                            </div>

                            {existClass !== 0?
                            <div className="mt-4">
                                <div className={"border p-1 m-2 text-danger"}>
                                    {`Ooops, ${existClass} salle(s) de classe portant le nom "${name}" existe(nt) déjà`}
                                </div> 
                            </div>
                            :""}
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-lg-6">
                    <SideLinks hangeMoveContentPage={hangeMoveContentPage} activeContent={activeContent} etats={etats} />
                </div>
            </div>
        </div>
    )
}
export default SaveClasses;


// EditObjects
// import React, { useState } from 'react';

// const EditObjects = ({ objects }) => {
//   const [selectedObject, setSelectedObject] = useState(null);
//   const [editedName, setEditedName] = useState('');
//   const [editedAge, setEditedAge] = useState('');

//   const handleSelectObject = (object) => {
//     setSelectedObject(object);
//     setEditedName(object.name);
//     setEditedAge(object.age);
//   };

//   const handleNameChange = (e) => {
//     setEditedName(e.target.value);
//   };

//   const handleAgeChange = (e) => {
//     setEditedAge(e.target.value);
//   };

//   const handleSendObjects = () => {
//     if (!selectedObject) {
//       return;
//     }

//     const updatedObjects = objects.map(obj => {
//       if (obj._id === selectedObject._id) {
//         return {
//           ...obj,
//           name: editedName,
//           age: editedAge
//         };
//       }
//       return obj;
//     });

//     fetch('/updateObjects', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(updatedObjects)
//     })
//     .then(response => {
//       // Gérer la réponse du serveur
//     })
//     .catch(error => {
//       // Gérer les erreurs
//     });
//   };

//   return (
//     <div>
//       <ul>
//         {objects.map((object) => (
//           <li key={object._id} onClick={() => handleSelectObject(object)}>
//             {object.name} - {object.age}
//           </li>
//         ))}
//       </ul>
//       {selectedObject && (
//         <div>
//           <input type="text" value={editedName} onChange={handleNameChange} />
//           <input type="number" value={editedAge} onChange={handleAgeChange} />
//           <button onClick={handleSendObjects}>Envoyer</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditObjects;

// filter
// import React, { useState } from 'react';

// const FilterUsers = ({ classes }) => {
//   const [searchValue, setSearchValue] = useState('');
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSearch = (value) => {
//     setSearchValue(value);
//     const filtered = classes.filter(user => user.name.toLowerCase().includes(value.toLowerCase()));
//     setFilteredUsers(filtered);
//     if (filtered.length === 0) {
//       setErrorMessage('Aucun utilisateur trouvé.');
//     } else {
//       setErrorMessage('');
//     }
//   };

//   const handleSelectUser = (user) => {
//     setSelectedUser(user);
//     setSearchValue(user.name);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={searchValue}
//         onChange={(e) => handleSearch(e.target.value)}
//         placeholder="Rechercher un utilisateur par nom"
//       />
//       {errorMessage && <p>{errorMessage}</p>}
//       {filteredUsers.length > 0 && (
//         <ul>
//           {filteredUsers.map((user) => (
//             <li key={user.id} onClick={() => handleSelectUser(user)}>
//               {user.name}
//             </li>
//           ))}
//         </ul>
//       )}
//       {selectedUser && <p>Sélectionné : {selectedUser.name}</p>}
//     </div>
//   );
// };

// export default FilterUsers;


// test
// import React, { useState } from 'react';

// const UserForm = () => {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [classes, setClasses] = useState([]);

//   const handleAddUser = () => {
//     const newClass = { name, age };
//     setClasses([...classes, newClass]); 
//     setName('');
//     setAge('');
//     console.log(classes);
//   };

//   const handleSendData = () => {
//     if (classes.length > 0) {
//       fetch('http://your-api-url', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(classes),
//       })
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.error(error));
//     }
//   };

//   return (
//     <div>
//       <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
//       <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
//       <button onClick={handleAddUser}>Add</button>
//       <button onClick={handleSendData}>Send</button>
//     </div>
//   );
// };

// export default UserForm;


// filtre efficace
// import React, { useState } from 'react';

// const SelectOptions = () => {
//   const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
//   const [selectedOption, setSelectedOption] = useState('');

//   const handleChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   return (
//     <div>
//       <select value={selectedOption} onChange={handleChange}>
//         <option value="">Sélectionnez une option</option>
//         {options.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//       <p>Option sélectionnée : {selectedOption}</p>
//     </div>
//   );
// };

// export default SelectOptions;


// import React, { useState } from 'react';

// const NomsFilter = () => {
//   const noms = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
//   const [nomFiltre, setNomFiltre] = useState('');
//   const [nomSelectionne, setNomSelectionne] = useState('');

//   const handleChange = (e) => {
//     setNomFiltre(e.target.value);
//   };

//   const handleSelection = (nom) => {
//     setNomSelectionne(nom);
//     setNomFiltre(nom);
//   };

//   const nomsFiltres = noms.filter((nom) =>
//     nom.toLowerCase().includes(nomFiltre.toLowerCase())
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         value={nomFiltre}
//         onChange={handleChange}
//         placeholder="Entrez un nom..."
//       />
//       <ul>
//         {nomsFiltres.map((nom) => (
//           <li key={nom} onClick={() => handleSelection(nom)}>
//             {nom}
//           </li>
//         ))}
//       </ul>
//       <p>Nom sélectionné : {nomSelectionne}</p>
//     </div>
//   );
// };

// export default NomsFilter;



// import React from 'react';
// import SuccessAlert from './SuccessAlert';

// const MyComponent = () => {
//     const handleSuccess = () => {
//         // Perform your successful operation here
//         console.log('Success!');

//         // Display the success alert
//         SuccessAlert({ message: 'Your operation was successful!' });
//     };

//     return (
//         <div>
//             <button onClick={handleSuccess}>Submit</button>
//         </div>
//     );
// };

// export default MyComponent;
