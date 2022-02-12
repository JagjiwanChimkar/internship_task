import React from "react";
import './App.css';

const ProgressBar = ({name,fileLoaded}) => {
  return (
      <li className="row">
        <i className="fas fa-file-alt"></i>
        <div className="content">
          <div className="details">
            <span className="name">{name}• Uploading</span>
            <span className="percent">{fileLoaded}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{"width": `${fileLoaded}%`}}></div>
          </div>
        </div>
      </li>
  );
};

export default ProgressBar;
