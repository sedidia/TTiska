import React from 'react';
import { Link } from "react-router-dom";

const Nav = (  ) => {
  return ( 
    <div className="navigation bg-light p-1 text- border-bottom sticky-top">                    
      <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-start align-items-center">
            <i className='icon-reorder2'></i>   
          </div>
                      
          <div className="d-flex justify-content-center align-items-center">
            <Link to="#" className="text-decoration-none p-2 text-dark">Search</Link>                          
            <Link to="#" className="text-decoration-none p-2  text-dark">
                <i className="icon-log-in"></i> Register        
            </Link>                          
          </div>
      </div> 
    </div>
  )
}
  
  export default Nav;