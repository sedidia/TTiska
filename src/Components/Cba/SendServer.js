import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileSubmit = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('/', {
        method: 'POST',
        body: formData
      }).then(response => {
        console.log('File uploaded successfully');
      }).catch(error => {
        console.error('Error uploading file', error);
      });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileSubmit}>Envoyer</button>



      <Carousel>
      <Carousel.Item>
        <div>
          hjhjhs
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div>
          hjhjhs
        </div>
      </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default FileUploader;





// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUploadComponent = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       await axios.post('http://localhost:3000/', formData);
//       alert('Fichier envoyé avec succès !');
//     } catch (error) {
//       console.error('Une erreur s\'est produite lors de l\'envoi du fichier :', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" onChange={handleFileChange} />
//       <button type="submit">Envoyer</button>
//     </form>
//   );
// };

// export default FileUploadComponent;
