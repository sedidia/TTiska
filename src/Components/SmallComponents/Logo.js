import urls from "../Config/Config";
import React from 'react';
const Logo = () => {
    return ( 
        <div className="d-flex justify-content-center  align-items-center logoSymbol">
            <img src={urls.logo1} alt=''/>
        </div>
    )
  }
  
  export default Logo;