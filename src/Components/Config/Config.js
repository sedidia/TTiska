import logo_univ from "../Assets/Imgs/ines.jpg";

import game from "../Assets/Imgs/game.jpg";
import ines from "../Assets/Imgs/ines.jpg";
import b2 from "../Assets/Imgs/2.jpg";
import contact from "../Assets/Imgs/contact.jfif";
import homePainCotidien from "../Assets/Imgs/homePainCotidien.jpg";
import home from "../Assets/Imgs/home.jfif";
import baccool from "../Assets/Imgs/baccool.jfif";
import painCotudien from "../Assets/Imgs/pain.jpg";
import pain_logo from "../Assets/Imgs/pain_logo.jpg";
import numerique1 from "../Assets/Imgs/numerique1.jpg";
import numerique2 from "../Assets/Imgs/numerique2.jpg";
import numerique3 from "../Assets/Imgs/numerique3.jpg";
import numerique from "../Assets/Imgs/numerique.jpg";

import ttiska_light from "../Assets/Imgs/ttiska_light.png";
import ttiska_dark from "../Assets/Imgs/ttiska_dark.png";

import sauts from "../Assets/Videos/sauts.mp4";
// import en_co1 from "../Assets/Videos/en_co1.mp4";
// import en_co2 from "../Assets/Videos/en_co2.mp4";

import the_street_called_mercy from "../Assets/Videos/the_street_called_mercy.mp4";
import goodgrace_video from "../Assets/Videos/goodgrace_video.mp4";

// import sedidia1 from "../Assets/Videos/sedidia1.mp4";

// const startApp = "http://localhost/api-unilu/api/api-res/startApp.php?param=001";
// const urlApi = "http://localhost/api-unilu/api/api-res";
// const shareLink = "http://localhost:3000";

import exGrille from "../Assets/Excels/2024_Master1_Semestre1.xlsx";
import courses_teachers from "../Assets/Excels/courses_teachers.xlsx";


// routes api
const urlApi = `http://localhost:3001`;
// routes api


const ulrs = {
    // urls
    urlApi,

    // images
    game, contact, homePainCotidien, home, baccool, b2, ines, logo_univ, painCotudien, pain_logo,
    numerique1, numerique2, numerique3, numerique,
    ttiska_light, ttiska_dark,
    // videos
    sauts, 
    the_street_called_mercy, goodgrace_video,

    // excel
    exGrille, courses_teachers
};

export default ulrs;