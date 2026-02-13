import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FullWidthTabs from "./components/Tabs/Tabs";
import AddPatient from "./components/AddPatient.jsx/AddPatient";
import api from "./utils/axios";
import { ToastContainer, toast } from "react-toastify";
import GetAppointments from "./components/Appointment/GetAppointments";

// import axios from "axios";
function App() {
  return (
    <>
      <FullWidthTabs />
      {/* <GetAppointments /> */}
    </>
  );
}

export default App;
