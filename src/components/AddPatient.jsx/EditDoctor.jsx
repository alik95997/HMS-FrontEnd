import { Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
const EditDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Box>
      <Typography>Edit Patient</Typography>
      <form action="">
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField label="Patient ID" {...register} />
          </Grid>
          <Grid size={6}>
            <Item>size=4</Item>
          </Grid>
          <Grid size={6}>
            <Item>size=4</Item>
          </Grid>
          <Grid size={6}>
            <Item>size=8</Item>
          </Grid>
          <Grid size={12}>
            <Item>size=8</Item>
          </Grid>
          <Grid size={12}>
            <Item>size=8</Item>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditDoctor;
