
import React from "react";
import Navbars from "../Navbars/Navbars";
import Carousel from '../Home/Carousel';
import { useAuditLogging } from '../Utility/useAuditLogging';

export default function Home() {

  const [triggerAction, setUser] = useAuditLogging('Visited the Home page');

  return (
    <div>
      <Navbars />
      <div className="mt-1 offset-1 col-10 mb-3" >
        <Carousel />
      </div>
    </div>
  );
};