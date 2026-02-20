import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FullWidthTabs from "./components/Tabs/Tabs";
import Patient from "./components/Patient/Patient";
import api from "./utils/axios";

// import axios from "axios";
function App() {
  return (
    <>
      <FullWidthTabs />
    </>
  );
}

export default App;
