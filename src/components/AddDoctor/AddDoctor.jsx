import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import api from "../../utils/axios";
const AddDoctor = () => {
  const [theDoctors, settheDoctors] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //get the patient
  const fetchDoctors = async () => {
    try {
      const fetchedDoctor = await api.get("/doctor/");
      console.log(fetchedDoctor?.data?.resDoctor);
      settheDoctors(fetchedDoctor?.data?.resDoctor);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  //add the doctor
  const addDoctor = async (data) => {
    console.log(data);
    const response = await api.post("/doctor/add-doctor", data);
    console.log(response);
  };

  const editDoctor = async (id) => {
    setIsEditOpen(true);
    const response = await api.patch(`doctor/${id}`,data);
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
      <Box display={"flex"} flexDirection={"column"} gap={2} flexWrap={"wrap"}>
        {theDoctors &&
          theDoctors.map((item, index) => {
            return (
              <Stack key={index} gap={2}>
                <Typography>Name: {item.name}</Typography>
                <Typography>Age: {item.age}</Typography>
                <Typography>Male : {item.male}</Typography>
                <Typography>Speciality: {item.speciality}</Typography>
                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                  <Button variant="contained" onClick={() => {}}>
                    Edit
                  </Button>
                  <Button variant="contained" onClick={() => {}}>
                    Delete
                  </Button>
                </Stack>
              </Stack>
            );
          })}
      </Box>
    </Box>
  );
};

export default AddDoctor;
