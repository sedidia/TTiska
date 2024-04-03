import React from 'react';
const IsLoading = ({darkMode}) => {
  return ( 
    <div className={darkMode ? "d-flex flex-column align-items-center" : "d-flex flex-column align-items-center"}>
      <div className="spinner-border text-info" role="status"></div>
      <span className={darkMode ? "text-light p-2" : "text-dark p-2"}>TTiska</span>
    </div>
  )
}

export default IsLoading;