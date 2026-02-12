import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import api from "../../utils/axios";
import { toast } from "react-toastify";
const EditDoctor = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      age: user.age,
      gender: user.gender,
      speciality: user.speciality,
    },
  });
  console.log(user);
  const editDoctor = async (data) => {
    try {
      console.log(user._id);
      const response = await api.patch(`/doctor/${user._id}`, data);
      if (response) {
        toast.success("Doctor Updated");
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ width: 350, p: 2 }} role="presentation">
      <Stack>
        <Typography fontWeight={"bold"} color="primary">
          Edit Doctor
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(editDoctor)}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              label="Dr ID"
              type="text"
              value={user._id}
              disabled
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <TextField
              type="text"
              label="Dr Name"
              {...register("name")}
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <TextField
              type="number"
              label="Dr Age"
              {...register("age")}
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <TextField
              type="text"
              label="Dr Gender"
              {...register("gender")}
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <TextField
              type="text"
              label="Dr speciality"
              {...register("speciality")}
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <Button size="medium" type="submit" variant="contained" fullWidth>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditDoctor;
