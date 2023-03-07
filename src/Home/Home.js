
import React from "react";
import Navbars from "../Navbars/Navbars";
import Carousel from '../Home/Carousel'

export default function Home() {

  return (
    <div className="mb-3">
      <Navbars />
      <div className="mt-3 offset-1 col-10 mb-2" >
        <Carousel />
      </div>
    </div>
  );
};