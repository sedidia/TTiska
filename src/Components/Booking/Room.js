const Room = ( {darkMode, goBooking, setGoBooking} ) => {
    return (
        <div className={darkMode ? "bg-dark p-4 text-light" : "bg-light p-4 text-light"}>
            <h4 className={darkMode ? "text-light" : "text-dark"}>Book a room in our hotels</h4>
            <p className={darkMode ? "text-light" : "text-dark"}>Are you a community or a university ? Use our solution online to manage your time to help your students to assist to lessons you supply.</p>
            
            <button className={darkMode ? "dark_object mr-2 btn0 position-relative text-info" : "mr-2 btn0 position-relative"} onClick={() => setGoBooking(true)} >
                I'm gonna fill up my informations
                <div className="linebtns"><div className="linebtn"></div><div className="linebtn"></div><div className="linebtn"></div><div className="linebtn"></div></div>
            </button>
        </div>
    )
}

export default Room;