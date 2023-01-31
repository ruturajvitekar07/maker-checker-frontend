import React from "react";
import Navbars from "../Navbars/Navbars";

export default function Home() {

return (
    <div className="container-fluid">
      <Navbars/>  
      <div className="mt-3 offset-1 col-10" >
        <img src={require('C:/Intellij/Frontend/maker_checker_frontend/src/Images/web-design-3411373__480.jpg')} className="img-fluid" width={1000} height={800} style={{verticalAlign:"middle"}} />
      </div> 
    </div>
  );
};