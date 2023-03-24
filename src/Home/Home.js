
import React from "react";
import Navbars from "../Navbars/Navbars";
import Carousel from '../Home/Carousel'

export default function Home() {

  return (
    <div>
      <Navbars />
      <div className="mt-1 offset-1 col-10" >
        <Carousel />
      </div>
    </div>
  );
};