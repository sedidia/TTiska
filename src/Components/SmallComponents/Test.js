import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import emailjs from "emailjs-com";
import urls from '../Config/Config';
emailjs.init("f1f1daRRgGiNdplgo");

const Login = () => {
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [mdpIsValid, setMdpIsValid] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [sentWSuccess, setSentWSuccess] = useState(null);

    const history = useHistory();
        
    // fonction d'envoi de mail
    function sendEmail(e,to_name,to_email,message) {
      e.preventDefault();
      const templateParams = {
        from_name: 'UNILU',
        from_email: 'sedidiak@gmail.com',
        to_name: to_name,
        to_email: to_email,
        message: message
      };
    
      emailjs.send('service_zag6nfb', 'template_g3gx1ll', templateParams, "f1f1daRRgGiNdplgo")
      .then((result) => {
        console.log(result.text);
        setSentWSuccess("Email envoyé !");
      }, (error) => {
        console.log(error.text);
      });
    }
    // fonction d'envoi de mail

    const handleIsEmail = e => {
      const emailValue = e.target.value;
      setEmail(emailValue);
  
      // Vérifie si l'adresse e-mail est valide
      const emailRegEx = /\S+@\S+\.\S+/;
      setIsValid(emailRegEx.test(emailValue));
    };

    const handleChangeMdp = e => {
      const mdp = e.target.value;
      setPassword(mdp);
      if(mdp.length > 5 && mdp.length < 50){
        setMdpIsValid(true);
      }else{
        setMdpIsValid(false);
      }
    };    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isValid && mdpIsValid){
          setError("");
          try {
              const response = await axios.post(
                `${urls.urlApi}/.php?param=3&email=${email}&password=${password}`, 
                { email: email, password: password, }
              );
              if(response.data.success === 1){
                console.log(response.data);
                const type_user = response.data.type_user;
                const id_utilisateur = response.data.id_utilisateur;
                const id = response.data.id;
                const nom_user = response.data.nom_user;
                const sendMail = response.data.sendMail;
                const mdp = response.data.mdp;
                const etat = response.data.etat;
                
                // definir les informations d'auth
                localStorage.setItem('id', id);
                localStorage.setItem('id_utilisateur', id_utilisateur);
                localStorage.setItem('nom_user', nom_user);
                              
                // variable de partage mails
                const to_name = response.data.nom_user;
                const to_email = response.data.sendMailTo;
                const message = "Votre mot de passe est : "+mdp+", à utiliser à chaque fois que vous aimeriez vous connecter";
                // variable de partage mails
                
                if(type_user === 'admin'){
                  let type_u = 'admin';
                  localStorage.setItem('type_u', type_u);
                  history.push('/Admin');
                }
                if(type_user === 'appariteur'){
                  localStorage.setItem('type_u', 'appariteur');
                  
                  if(sendMail === 1){
                    // envoi de l'email
                    sendEmail(e,to_name,to_email,message);
                    // envoi de l'email
                  }else{
                    history.push('/Appariteur');
                  }
                }
                if(type_user === 'jury'){
                  localStorage.setItem('etat', etat);
                  localStorage.setItem('type_u', 'jury');
                  localStorage.setItem('president', response.data.president);
                  localStorage.setItem('secretaire', response.data.secretaire);
                  localStorage.setItem('appariteur', response.data.appariteur);
                  localStorage.setItem('nfora', response.data.nom_faculte_appariteur);
                  localStorage.setItem('email', response.data.email);
                  
                  if(sendMail === 1){
                    // envoi de l'email
                    sendEmail(e,to_name,to_email,message);
                    // envoi de l'email
                  }else{
                    history.push('/Jury');
                  }
                }
                if(type_user === 'etudiant'){
                  let type_u = 'etudiant';
                  localStorage.setItem('type_u', type_u);
                  localStorage.setItem('id_jury', response.data.id_jury);
                  
                  if(sendMail === 1){
                    // envoi de l'email
                    sendEmail(e,to_name,to_email,message);
                    // envoi de l'email
                  }else{
                    history.push('/Etudiant');
                  }
                }
              }else{
                console.log(response.data);
                setError(response.data.msg);
              }
              // mettre à jour votre état ou rediriger vers une autre page ici
          } catch (error) {
              console.error(error);
              setError("Impossible d'acceder à l'api !");
          }
        }else if(isValid && !mdpIsValid){
          setError("Ce mot de passe est invalide.");
        }else{
          if(!isValid && mdpIsValid){
            setError("Cet email est invalide.");
          }else{
            setError("Tous les champs sont obligatoires.");
          }
        }
    };

    return (
      <div className="login bg-light">

        <div>
            <form className="cardLogin" onSubmit={handleSubmit}>
                <div className="head_of_login">
                  
                  <img src={urls.logo1} alt="Logo" />
                  <div>
                    <div>Connectez-vous !</div>
                    <p className="text-secondary">Résultats unilu</p>
                  </div>
                </div>
                
                {error && <p className="text-danger">{error}</p>}
                {sentWSuccess && <p className="text-info">Email envoyé !</p>}

                <label htmlFor="email" className="form-label">{isValid ? <p className="text-info">Votre adresse email <i className="icon-check-square-o"></i></p> : <p className="text-danger">Votre adresse email <i className="icon-close"></i></p>}</label>
                <input type="email" className="form-control" placeholder="Saisir votre email" id="email" value={email} onChange={handleIsEmail} />
                
                <label htmlFor="password" className="form-label">{mdpIsValid ? <p className="text-info">Votre mot de passe <i className="icon-check-square-o"></i></p> : <p className="text-danger">Votre mot de passe <i className="icon-close"></i></p>}</label>
                <input type="password" className="form-control" placeholder="Saisir
                 votre mot de passe" id="password" value={password} onChange={handleChangeMdp} />
                
                <button type="submit" className="btn btn-info">Se connecter</button> 
            </form>
        </div>
      </div>
    );
};

export default Login;