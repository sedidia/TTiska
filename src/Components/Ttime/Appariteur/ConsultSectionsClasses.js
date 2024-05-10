import SideLinks from "../SideLinks";

const ConsultSectionsClasses = ( {darkMode, hangeMoveContentPage, activeContent, etats, allDatas} ) => {
    console.log(allDatas);
    return (
        <div className={darkMode ? "container d-flex justify-content-center mt-4 text-light" : "container d-flex justify-content-center mt-4"}>
            <div>
                <div className=" row">
                    <div className={darkMode ? "dark_object rounded p-4 card-body pt-3 col-md-12 col-lg-6" : "bg-white rounded p-4 card-body pt-3 col-md-12 col-lg-6"}>
                        {/* <h2 className={darkMode ? "card-title pb-4 text-light d-flex" : "card-title pb-4 text-dark d-flex"}>Les classes de la sections</h2> */}
                        <h2 className="d-flex justify-content-start w-100 border mt-2 p-2">Les salles pour la section {etats.section} </h2>
                        {allDatas.classes
                        .filter(item => item.univId === etats.univId)
                        .filter(item => item.section === etats.section)
                        .map(item => (
                            <div key={item._id}>
                                <p className="d-flex">La salle <strong className="text-info">{item.name}</strong></p>
                                
                            </div>
                        )) }
                        
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