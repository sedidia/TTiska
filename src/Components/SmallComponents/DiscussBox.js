const DiscussBox = ( {isDBActive, setIsDBActive, darkMode, setDarkMode} ) => {
    return (
        <div>
            {/* {isDBActive ?
            : ""} */}
            <div className={
                isDBActive && darkMode ? " active bg-dark" : isDBActive && !darkMode ? " active bg-light" : !isDBActive && darkMode ? " bg-dark" : "" }>
                    <div className={darkMode ? "container text-light" : "container text-dark"}>
                        <h4 className={darkMode ? "text-light p-4" : "text-dark p-4"}>FILL UP YOUR INFORMATIONS</h4>
                        <div className="d-flex">
                            <li className="align-items-center d-flex p-2" >
                                <h6 className={darkMode ? "text-light" : "text-dark"}>I'm a Company</h6>
                            </li>
                            <li className="align-items-center d-flex p-2" >
                                <h6 className={darkMode ? "text-light" : "text-dark"}>I'm a Company</h6>
                            </li>
                        </div>
                    </div>
                
            </div>         
        </div>
    )
}

export default DiscussBox;