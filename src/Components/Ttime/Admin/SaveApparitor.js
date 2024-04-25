// import { useEffect, useState } from "react";
// import IsLoading from "../../SmallComponents/IsLoading";

import SideLinks from "../SideLinks";

const SaveApparitor = ( {darkMode, hangeMoveContentPage, activeContent, etats} ) => {
    return (
        <div className={darkMode ? "d-flex justify-content-center align-items-center mt-4 text-light container":"d-flex justify-content-center align-items-center mt-4 container"}>     
            <div className="row">     
                <div className="col-md-12 col-lg-6">
                    <div className={darkMode ? "dark_object rounded p-4 position-relative " : "bg-white rounded p-4 position-relative "}>
                        <div className="card-body pt-3">
                            <h2 className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Enregistrer un appariteur de section.</h2>
                            <p className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Veillez saisir le nom de la salle.</p>
                       input
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
export default SaveApparitor;