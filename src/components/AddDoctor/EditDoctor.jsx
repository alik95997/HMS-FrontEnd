import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
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
    <form onSubmit={handleSubmit(editDoctor)}>
      {/* <input type="text" value={user._id} disabled /> */}
      <input type="text" {...register("name")} />
      <input type="number" {...register("age")} />
      <input type="text" {...register("gender")} />
      <input type="text" {...register("speciality")} />
      <Button type="submit" variant="contained">
        Save
      </Button>
    </form>
  );
};

export default EditDoctor;
