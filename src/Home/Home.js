import React from "react";
import Navbars from "../Navbars/Navbars";

export default function Home() {

return (
    <div className="container">
      <Navbars/>  
      <div className="mt-3 offset-2 col-8" >
        <img src={require('../Images/web-design-3411373__480.jpg')} className="img-fluid" width={850} height={650} style={{verticalAlign:"middle"}} />
      </div> 
    </div>
  );
};