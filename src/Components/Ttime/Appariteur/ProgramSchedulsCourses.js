import SideLinks from "../SideLinks";

const ConsultSectionsClasses = ( {darkMode, hangeMoveContentPage, activeContent, etats} ) => {
    return (
        <div className={darkMode ? "container d-flex justify-content-center mt-4 text-light" : "container d-flex justify-content-center mt-4"}>
            <div>
                <div className=" row">
                    <div className={darkMode ? "dark_object rounded p-4 card-body pt-3 col-md-12 col-lg-6" : "bg-white rounded p-4 card-body pt-3 col-md-12 col-lg-6"}>
                        <h2 className={darkMode ? "card-title pb-4 text-light" : "card-title pb-4 text-dark"}>Les classes de la sections</h2>
                        
                    </div>
                    <div className="pt-3 col-md-12 col-lg-6 ">
                        <SideLinks hangeMoveContentPage={hangeMoveContentPage} activeContent={activeContent} etats={etats} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ConsultSectionsClasses;