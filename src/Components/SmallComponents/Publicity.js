import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import publicity_img from "../assets/Imgs/happy_people.jpg";

const Publicity = ( historyData, { openSocialMedia } ) => {
    const history = useHistory();

    useEffect(() => {
      console.log(historyData.historyData);
    }, [])

    const handleHistory = () => {
      console.log(historyData.historyData);
      if(historyData === "painquotidien"){
        history.push(`/${historyData}`)
      }
    }
    return ( 
      <div className="d-flex justify-content-center">
        <div className="row container pt-4 mb-4">
          <div className="col-md-12 col-lg-6 p-2">
            <div className={historyData.historyData === "painquotidien" ? "alert alert-info d-flex justify-content-center align-items-center":"alert alert-info d-flex justify-content-center align-items-center"}>
              <div>
                  <h4>Application's need.</h4>
                <p className="d-flex justify-content-center align-items-center">
                I need an application for my church/company/own/...<br />
                    «« Let's talk about your need »»
                </p>
                  {/* <p>🤷👌👪😍❤️💕🙌🧑🏿‍🤝‍🧑🏿😍👩🏼‍❤️‍👨🏿👩🏿‍❤️‍👨🏿👨‍👩‍👧‍👦👨‍👩‍👧‍👧👩🏼‍🤝‍👩🏾</p> */}
                <Link className="btn btn-outline-info mt-4 mt-4" to="#footer" onClick={ (e) => window.open("https://wa.me/+243977077791", '_blank') }>» Express your need to us on whatsapp</Link>
              </div>
            </div>
          </div>
          {historyData.historyData === "painquotidien" ?
          <div className="col-md-12 col-lg-6 p-2">
            <div className="alert alert-info d-flex justify-content-center align-items-center" role="alert">
              <div>
                  <h4>Le Pain Cotidien</h4>
                <p className="d-flex justify-content-center align-items-center">
                Hey, it shall be so great to have you between young of christ. The are looking for people to bring to Jesus, so do you wanna work together with them to accomplish the good word of god ?<br />
                    «« God is love »»
                </p>
                  <p>🤷👌👪😍❤️💕🙌🧑🏿‍🤝‍🧑🏿😍👩🏼‍❤️‍👨🏿👩🏿‍❤️‍👨🏿👨‍👩‍👧‍👦👨‍👩‍👧‍👧👩🏼‍🤝‍👩🏾</p>
                <Link className="btn btn-info mt-4 mt-4" to='' onClick={ (e) => openSocialMedia(e, "https://github.com/sedidia") }>» Let me view the group first</Link>
              </div>
            </div>
            <div className="alert alert-danger d-flex justify-content-center align-items-center" role="alert">
              <div>
                <p>Their socials media</p>
              <div>
                <Link to="" className="me-4 text-reset text-decoration-none">
                  <i className={"icon-linkedin"}></i>
                </Link>
                <Link to="" className="me-4 text-reset text-decoration-none">
                  <i className={"icon-facebook-f"}></i>
                </Link>
                <Link to="" className="me-4 text-reset text-decoration-none">
                  <i className={"icon-google"}></i>
                </Link>
                <Link to="" className="me-4 text-reset text-decoration-none">
                  <i className={"icon-instagram"}></i>
                </Link>
                <Link to="" className="me-4 text-reset text-decoration-none">
                  <i className={"icon-twitter"}></i>
                </Link>
                <Link to="" className="me-4 text-reset text-decoration-none">
                  <i className={"icon-youtube"}></i>
                </Link>
              </div>
                
              </div>
            </div>
          </div>
          :
          <div className="col-md-12 col-lg-6 p-2">
            <div className="alert alert-dark d-flex justify-content-center align-items-center" role="alert">
              <div>
                <h4>Pain Cotidien</h4>
                <p className="d-flex justify-content-center align-items-center">
                  Hey, it's so great to have you between us. We are looking for people to bring to Jesus, so do you wanna work together with us to accomplish the good word of god ?<br />
                    «« Let's talk »»
                </p>
                <p>More love 🤷👪😍❤️💕😍👩🏼‍❤️‍👨🏿👩🏿‍❤️‍👨🏿</p>
                <Link className="btn btn-info mt-4 m-2 mt-4" to={`/`} onClick={handleHistory}>» Let's do  it together.</Link>
                <Link className="btn btn-outline-danger mt-4 m-2 mt-4" to={`/`} onClick={handleHistory}>» let me see your posts</Link>
              </div>
            </div>

            <div className="alert alert-primary" role="alert">
            <p>Our socials media</p>
            <div className="d-flex justify-content-center align-items-center">
              <div>
                <Link to="" className="me-4 text-reset text-decoration-none">
                  <i className={"icon-linkedin"}></i>
                </Link>
                <Link to="" className="me-4 text-reset text-decoration-none">
                  <i className={"icon-facebook-f"}></i>
                </Link>
                <Link to="" className="me-4 text-reset text-decoration-none">
                  <i className={"icon-google"}></i>
                </Link>
                <Link to="" className="me-4 text-reset text-decoration-none">
                  <i className={"icon-instagram"}></i>
                </Link>
                <Link to="" className="me-4 text-reset text-decoration-none">
                  <i className={"icon-twitter"}></i>
                </Link>
                <Link to="" className="me-4 text-reset text-decoration-none">
                  <i className={"icon-youtube"}></i>
                </Link>
              </div>
            </div>
            </div>
            
            
          </div>
          }
        </div>
      </div>
    )
  }
  
  export default Publicity;