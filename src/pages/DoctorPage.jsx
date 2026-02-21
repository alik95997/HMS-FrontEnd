import { Drawer, Fade, Slide } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import AddDoctor from "../components/Doctor/AddDoctor";
import EditDoctor from "../components/Doctor/EditDoctor";

import {
  useGetDoctorsQuery,
  useDeleteDoctorMutation,
} from "../services/doctorApi";
import DashboardLayout from "../layout/DashboardLayout";
const DoctorPage = () => {
  const { data: doctors, isLoading, error } = useGetDoctorsQuery();
  console.log(doctors);
  const [deleteDoctor] = useDeleteDoctorMutation();

  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState({});

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // edit doctor function incomplete
  const editDoctor = async (theId) => {
    setOpen(true);
    console.log(theId);
    const toEditTheDoctor = doctors.find((doctor) => doctor._id === theId);
    console.log(toEditTheDoctor);
    setSelectedDoctor(toEditTheDoctor);
  };

  return (
    <DashboardLayout>
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
        <AddDoctor />
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
    </DashboardLayout>
  );
};

export default DoctorPage;
