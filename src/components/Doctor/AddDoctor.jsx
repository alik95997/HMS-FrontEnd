import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useAddDoctorMutation } from "../../services/doctorApi";
import { useForm } from "react-hook-form";

import React from "react";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addDoctor, { error: addDoctorError }] = useAddDoctorMutation();

  const handleAddDoctor = async (data) => {
    try {
      await addDoctor(data);
      toast.success("Doctor added successfuly");
    } catch (error) {
      toast.error(addDoctorError);
    }
  };
  return (
    <Box>
      <Typography
        sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
        color="primary"
      >
        Add New doctor
      </Typography>
      <form onSubmit={handleSubmit(handleAddDoctor)}>
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
  );
};

export default AddDoctor;
