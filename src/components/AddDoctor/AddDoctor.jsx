import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import api from "../../utils/axios";
const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addDoctor = async (data) => {
    console.log(data);
    const response = await api.post("/doctor/add-doctor", data);
    console.log(response);
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
          sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
          color="primary"
        >
          Add New doctor
        </Typography>
        <form onSubmit={handleSubmit(addDoctor)}>
          <Stack gap={3}>
            <TextField
              id="outlined-helperText"
              label="Name"
              variant="outlined"
              {...register("name")}
              type="text"
            />

            <TextField
              id="outlined-basic"
              {...register("age")}
              label="Age"
              variant="outlined"
              type="number"
            />
            <TextField
              id="outlined-basic"
              label="Gender"
              {...register("gender")}
              variant="outlined"
              type="text"
            />
            <TextField
              id="outlined-basic"
              label="Speciality"
              {...register("speciality")}
              variant="outlined"
              type="text"
            />
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
      {/* Show Doctor  */}
      <Stack gap={2}>
        <Typography>GFG</Typography>
        <Typography>Age</Typography>
        <Typography>Male</Typography>
        <Typography>Speciality:</Typography>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Button variant="contained" onClick={() => {}}>
            Edit
          </Button>
          <Button variant="contained" onClick={() => {}}>
            Delete
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AddDoctor;
