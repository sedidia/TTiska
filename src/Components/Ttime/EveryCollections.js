import React, { useState, useEffect } from 'react';

const DataFetchingComponent = () => {
    const [serverData, setServerData] =useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Envoie de la requête à la route qui récupère toutes les collections de la base de données "local"
        const response = await fetch('http://localhost:3001/collections');
        const data = await response.json();
        
        setServerData(data.ttime); // collection "ttime"
        console.log(data.ttime);
        // console.log(data.startup_log);
        // setServerData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Fetching Data</h2>
        {serverData.map((item, index) => (
            <div key={index}>
                {item.prenom}
                {item.nom}
            </div>
        ))}
    </div>
  );
};

export default DataFetchingComponent;



