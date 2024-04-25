// import { useEffect, useState } from "react";
import IsLoading from "../../SmallComponents/IsLoading";
import { Link } from "react-router-dom";
import url from "../../Config/Config";
import { useState } from "react";
import SideLinks from "../SideLinks";

const SaveClasses = ( {darkMode, hangeMoveContentPage, activeContent, etats} ) => {
    const [classeName, setClasseName] = useState('');

const [name, setName] = useState('');
  const [section, setSection] = useState('');
  const [classes, setClasses] = useState([]);

  const handleChanges = (e, title) => {
    title === "name" ? setName(e.target.value) : setSection(e.target.value)
    const filtered = classes.filter(classe => 
        classe.name.toLowerCase().includes( (title === "name" ? e.target.value: e.target.value).toLowerCase())
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
    const newClass = { name, section };
    if(name !== "" && section !== ""){
        setClasses([...classes, newClass]); 
        setName('');
        setSection('');
        console.log(classes);
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
        .then(data => console.log(data))
        .catch(error => console.error(error));
        return
      }
      console.log("Vous ne pouvez pas envoyer un tableau sans objets...");
  }

  const handleSendData = () => {
    if(name !== "" && section !== ""){
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
                            <h2 className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Enregistrer une salle de section.</h2>
                            <p className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Veillez saisir le nom de la salle.</p>
                            <label htmlFor="name" className={"d-flex justify-content-between mt-4 mb-1"}>

                                {(name === null || name === "" || name === " ") ? "Le nom de la classe ne doit pas etre vide.":
                                "Merci d'avoir saisi un nom de classe valide !"
                                }
                            </label>
                            <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="text" id="name" value={name} name="name" onChange={ (e) => handleChanges(e, "name") } placeholder="The class name" /> 
                            
                            <label htmlFor="section" className={"d-flex justify-content-between mt-4 mb-1"}>

                                {(section === null || section === "" || section === " ") ? "Le nom de la section ne doit pas etre vide.":
                                "Merci d'avoir saisi un nom de section valide !"
                                }
                            </label>
                            <input className={darkMode ? "bg-dark form-control text-light" : "bg-light form-control text-dark"}  type="text" id="section" value={section} name="section" onChange={ (e) => handleChanges(e, "section") } placeholder="The section's name" /> 

                            <div className="d-flex mt-4">
                                <button className="btn btn-outline-info" onClick={handleAddUser}>Add</button>
                                {classes.length > 0 && name === "" && section === ""?
                                <button className="btn btn-outline-info" onClick={handleSendData}>Send</button>
                                :""}
                            </div>
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
