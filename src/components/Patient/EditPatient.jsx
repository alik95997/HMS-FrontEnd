import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useUpdatePatientMutation } from "../../services/patientApi";
import { toast } from "react-toastify";
const EditPatient = ({ user }) => {
  const [updatePatient, { isLoading, isError }] = useUpdatePatientMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      _id: user._id,
      name: user.name,
      age: user.age,
      gender: user.gender,
    },
  });

  const handleEditPatient = async (data) => {
    await updatePatient(data);
  };
  if (isError) return <p>There was an error creating patient</p>;
  if (isLoading) return <p>Loading...</p>;
  return (
    <Box sx={{ width: 350, p: 2 }} role="presentation">
      <Typography>Edit Patient</Typography>
      <form onSubmit={handleSubmit(handleEditPatient)}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField label="Patient ID" />
          </Grid>
          <Grid size={6}>
            <TextField label="Patient Name" {...register("name")} />
          </Grid>
          <Grid size={6}>
            <TextField label="Patient Age" {...register("age")} />
          </Grid>
          <Grid size={6}>
            <TextField label="Patient Gender" {...register("gender")} />
          </Grid>
          <Grid size={12}></Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" disabled={isLoading}>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditPatient;
