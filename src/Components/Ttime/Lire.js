import React, { useState } from 'react';
import axios from 'axios';

const FileDownloadComponent = () => {
    const [fileData, setFileData] = useState([]);
    const [error, setError] = useState('');

    const fetchFile = async () => {
        try {
            const response = await axios.post('http://localhost:3001/getFolderAndFile', { nom_dossier: 'isc', nom_fichier: 'isc_isc_test.xlsx' });

            const fileContent = response.data;
            console.log(fileContent);
            
            // Convertir les données Excel en tableaux d'objets JSON
            const lines = fileContent.split('\n');
            const headers = lines[0].split('\t'); // Assumption: Data is tab-separated
            const jsonData = lines.slice(1).map(line => {
                const values = line.split('\t');
                const obj = {};
                headers.forEach((header, index) => {
                    obj[header] = values[index];
                });
                return obj;
            });

            setFileData(jsonData);
            setError('');
        } catch (error) {
            console.error('Erreur lors de la récupération du fichier :', error);
            setError('Erreur lors de la récupération du fichier.');
        }
    };

    return (
        <div>
            <button onClick={fetchFile}>Télécharger le fichier Excel</button>
            {error && <div>{error}</div>}
            {fileData.length > 0 && (
                <div>
                    <h2>Contenu du fichier Excel :</h2>
                    {/* Affichage des données sous forme de tableau */}
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(fileData[0]).map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {fileData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Object.values(row).map((value, colIndex) => (
                                        <td key={colIndex}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FileDownloadComponent;
