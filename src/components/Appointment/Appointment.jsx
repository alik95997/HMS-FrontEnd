import Box from "@mui/material/Box";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useEffect, useState } from "react";
import api from "../../utils/axios";
import { toast } from "react-toastify";
import { Button, Stack, Typography } from "@mui/material";
import GetAppointments from "./GetAppointments";
import EditAppointment from "./EditAppointment";
import { useGetPatientsQuery } from "../../services/patientApi.js";
import { useGetDoctorsQuery } from "../../services/doctorApi.js";
export default function BasicSelect() {
  // const [doctors, setDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [value, setValue] = useState(dayjs(new Date()));
  const {
    data: patients,
    error: patientsError,
    isLoading: isLoadingPatients,
  } = useGetPatientsQuery();
  const {
    data: doctors,
    error: doctorsError,
    isLoading: isLoadingDoctors,
  } = useGetPatientsQuery();

  // const fetchDoctors = async () => {
  //   try {
  //     const fetchedDoctor = await api.get("/doctor/");
  //     // console.log(fetchedDoctor?.data?.resDoctor);
  //     setDoctors(fetchedDoctor?.data?.resDoctor);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchDoctors();
  // }, []);

  const handleChange = (event) => {
    setSelectedPatient(event.target.value);
  };
  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };
  // console.log(selectedPatient);
  // console.log(selectedDoctor);
  // console.log(value);
  const obj = {
    doctorId: selectedDoctor._id,
    patientId: selectedPatient._id,
    date: value,
  };
  console.log(obj);

  const createAppointment = async () => {
    try {
      const response = await api.post("/appointment/", obj);
      if (response) {
        toast.success("Appointment created Successfully");
      }
    } catch (error) {
      toast.error("Erro creating appontment");
      console.log(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid",
        p: 2,
        alignItems: "",
        justifyContent: "start",
        gap: 2,
      }}
    >
      <Stack gap={3}>
        <Typography color="primary" fontWeight="bold">
          Create Appointment
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Patients</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedPatient}
            label="Patient Name"
            onChange={handleChange}
          >
            {patients.map((patient) => (
              <MenuItem value={patient}>
                {patient.name} {patient.gender} {patient.age}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Doctors</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedDoctor}
            label="Doctor Name"
            onChange={handleDoctorChange}
          >
            {doctors.map((doctor) => (
              <MenuItem value={doctor}>
                {doctor.name} {doctor.speciality}
                {doctor._id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Controlled picker"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </LocalizationProvider>
        <Button variant="contained" onClick={createAppointment}>
          Create Appointment
        </Button>
      </Stack>
      <GetAppointments />
    </Box>
  );
}
