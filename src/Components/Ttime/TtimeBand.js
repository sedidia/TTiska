const Ttime = ( {darkMode} ) => {
    return (
        <div className={darkMode ? "container bg-dark rounded p-4" : "container bg-light rounded p-4"}>
            <h4 className={darkMode ? "text-light" : "text-dark"}>T time</h4>
            <p className={darkMode ? "text-light" : "text-dark"}>Are you a community or a university ? Use our solution online to manage your time to help your students to assist to lessons you supply.</p>
            
            <button className={darkMode ? "dark_object mr-2 btn0 position-relative text-info" : "mr-2 btn0 position-relative"} >
                I wanna manage my time
                <div className="linebtns"><div className="linebtn"></div><div className="linebtn"></div><div className="linebtn"></div><div className="linebtn"></div></div>
            </button>
        </div>
    )
}

export default Ttime;