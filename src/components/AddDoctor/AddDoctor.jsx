import { Drawer, Fade, Slide } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import api from "../../utils/axios";
import { toast } from "react-toastify";
import EditDoctor from "./EditDoctor";
import CloseIcon from "@mui/icons-material/Close";
import { useGetDoctorsQuery } from "../../services/doctor";
const AddDoctor = () => {
  const { data: doctors, isLoading, error } = useGetDoctorsQuery();
  console.log(doctors)
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //get the patient
  // const fetchDoctors = async () => {
  //   try {
  //     const fetchedDoctor = await api.get("/doctor/");
  //     console.log(fetchedDoctor?.data?.resDoctor);
  //     settheDoctors(fetchedDoctor?.data?.resDoctor);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchDoctors();
  // }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  //delete doctor function
  const deleteDoctor = async (id) => {
    try {
      const response = await api.delete(`/doctor/${id}`);
      if (response) {
        toast.success("Doctor deleted successfully");
      }
      fetchDoctors();
    } catch (error) {}
  };
  //add the doctor function
  const addDoctor = async (data) => {
    console.log(data);
    const response = await api.post("/doctor/add-doctor", data);
    if (response) {
      toast.success("Doctor added successfully");
    }
    // fetchDoctors();
  };
  // edit doctor function incomplete
  const editDoctor = async (theId) => {
    setOpen(!open);
    console.log();
    const toEditTheDoctor = doctors.find((doctor) => doctor._id === theId);
    setSelectedDoctor(toEditTheDoctor);
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
      <Stack flexDirection="column" alignItems={"center"} gap={2}>
        <Typography color="primary" fontWeight={"bold"}>
          All Doctors
        </Typography>

        <Box sx={{ display: "flex", gap: 3 }}>
          {error ? (
            <>Error Fething Doctors</>
          ) : isLoading ? (
            <>Loading...</>
          ) : (
            <>
              {doctors.map((item, index) => {
                return (
                  <Stack gap={2} key={index}>
                    <Typography>Name: {item.name}</Typography>
                    <Typography>Age: {item.age}</Typography>
                    <Typography>Gender: {item.gender}</Typography>
                    <Typography>Speciality: {item.speciality}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          editDoctor(item._id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          deleteDoctor(item._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Stack>
                );
              })}
            </>
          )}
        </Box>
      </Stack>
      {open && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpen((prev) => !prev)}
              sx={{ alignSelf: "flex-end" }}
            >
              <CloseIcon />
            </Button>
            <EditDoctor onClick={toggleDrawer(false)} user={selectedDoctor} />
          </Drawer>
        </Box>
      )}
    </Box>
  );
};

export default AddDoctor;
