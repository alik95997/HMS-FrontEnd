import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import api from "../../utils/axios";
import EditPatient from "./EditPatient";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer } from "@mui/material";

const AddPatient = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [open, setOpen] = React.useState(false);

  const fetchPatients = async () => {
    const res = await api.get("/patient/");
    setPatients(res?.data?.resPatient);
    
  };
  useEffect(() => {
    fetchPatients();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const addPatient = async (data) => {
    console.log(data);
    const response = await api.post("/patient/", data);
    console.log(response.data);
  };
  const deletePatient = async (id) => {
    const response = await api.delete(`patient/${id}`);
    if (response) {
      alert("deleted successfully");
    }
    fetchPatients();
  };
  const editPatient = (id) => {
    setOpen(true);
    const toEditPatient = patients.find((patient) => patient._id === id);
    setSelectedPatient(toEditPatient);
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid",
        p: 2,
        alignItems: "center",
        justifyContent: "start",
        gap: 2,
      }}
    >
      {/* <ul> */}

      <Box>
        <Typography
          mb={2}
          textAlign="center"
          color="primary"
          fontWeight={"bold"}
        >
          Add New Patient
        </Typography>
        <form onSubmit={handleSubmit(addPatient)}>
          <Stack gap={3}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              {...register("name")}
            />

            <TextField
              id="outlined-basic"
              {...register("age")}
              label="Age"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Gender"
              {...register("gender")}
              variant="outlined"
            />

            <Button variant="contained" type="submit" fullWidth>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
      {/* Show Patient */}
      {patients &&
        patients.map((item, index) => {
          return (
            <Stack gap={2} key={index}>
              <Typography>Name: {item.name}</Typography>
              <Typography>Age: {item.age}</Typography>
              <Typography>Gender: {item.gender}</Typography>
              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Button
                  variant="contained"
                  onClick={() => {
                    editPatient(item._id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    deletePatient(item._id);
                  }}
                >
                  Delete
                </Button>
              </Stack>
              {open && (
                <Box>
                  <Drawer open={open} onClose={toggleDrawer(false)}>
                    <Button
                      sx={{ alignSelf: "flex-end" }}
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setOpen((prev) => !prev);
                      }}
                    >
                      <CloseIcon />
                    </Button>
                    <EditPatient user={selectedPatient} />
                  </Drawer>
                </Box>
              )}
            </Stack>
          );
        })}
    </Box>
  );
};

export default AddPatient;
