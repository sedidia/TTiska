import React from 'react';
import publicity_img from "../assets/Imgs/happy_people.jpg";

const Wish = () => {
    return ( 
      <div className="p-2 m-0">
        <div className="d-flex justify-content-center align-items-center pt-4">
            <img className="wish_img" src={publicity_img} alt="wish_img" />
        </div>
        <div className="alert alert-info d-flex justify-content-center align-items-center" role="alert">
            <div>
                <p>The ... team wishes you a good tuerday</p>
                <p>🤷👌👪😍❤️💕🙌🧑🏿‍🤝‍🧑🏿😍👩🏼‍❤️‍👨🏿👩🏿‍❤️‍👨🏿👨‍👩‍👧‍👦👨‍👩‍👧‍👧👩🏼‍🤝‍👩🏾</p>
            </div>
        </div>
      </div>
    )
  }
  
  export default Wish;