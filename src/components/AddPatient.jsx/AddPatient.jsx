import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import api from "../../utils/axios";

const AddPatient = () => {
  const [patients, setPatients] = useState([]);
  console.log(patients);
  const fetchPatients = async () => {
    const res = await api.get("/patient/");
    console.log(res.data.resPatient);
  };
  useEffect(() => {
    fetchPatients();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid",
        p: 2,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography
          mb={2}
          textAlign="center"
          color="primary"
          fontWeight={"bold"}
        >
          Add New Patient
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={3}>
            <TextField
              id="outlined-helperText"
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
      <Stack gap={2}>
        <Typography>Name</Typography>
        <Typography>Age:</Typography>
        <Typography>Gender:</Typography>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Button variant="contained">Edit</Button>
          <Button variant="contained">Delete</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AddPatient;
