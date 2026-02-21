import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import DoctorPage from "./pages/DoctorPage";
import PatientPage from "./pages/PatientPage";
import AppointmentPage from "./pages/AppointmentPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DoctorPage />} />
        <Route path="/patients" element={<PatientPage />} />
        <Route path="/appointments" element={<AppointmentPage />} />
      </Routes>
    </>
  );
}

export default App;
