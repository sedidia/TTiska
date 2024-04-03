import React, { useState } from 'react';
import axios from 'axios';

const FileUploadComponent = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('excelFile', file);

        try {
            const response = await axios.post('http://localhost:3001/createFolderAndUploadFile', formData);
            
            console.log('Fichier envoyé avec succès !');
        } catch (error) {
            console.error('Erreur lors de l\'envoi du fichier :', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Envoyer</button>
        </form>
    );
};

export default FileUploadComponent;
