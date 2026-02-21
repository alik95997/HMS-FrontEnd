import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import { useState } from "react";
import api from "../../utils/axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import EditAppointment from "./EditAppointment";
import {
  useGetApointmentQuery,
  useDeleteApointmentMutation,
} from "../../services/appointment";
import CloseIcon from "@mui/icons-material/Close";

const GetAppointments = () => {
  const { data: appointments, isError, isLoading } = useGetApointmentQuery();
  const [deleteApointment] = useDeleteApointmentMutation();
  const [open, setOpen] = useState(false);
  const [selectedAppointmentID, setSelectedAppointmentID] = useState("");

  const editAppointment = (appointmentID) => {
    try {
      setOpen(true);
      console.log(appointmentID);
      setSelectedAppointmentID(appointmentID);
    } catch (error) {
      console.log(error.message);
    }
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <Stack flexDirection="column" alignItems={"center"} gap={2}>
        <Typography fontWeight={"bold"} color="primary">
          Appointments
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          {appointments &&
            appointments.map((appointment, index) => {
              return (
                <Stack gap={2} key={index}>
                  <Typography>
                    Patient Name :{appointment?.patientId?.name}
                  </Typography>
                  <Typography>
                    Doctor Name :{appointment?.doctorId?.name}
                  </Typography>
                  <Typography>
                    Date {dayjs(appointment?.date).format("DD MMMM  YYYY")}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        editAppointment(appointment._id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        deleteApointment(appointment._id);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Stack>
              );
            })}
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
            <EditAppointment onClick={toggleDrawer(false)} />
          </Drawer>
        </Box>
      )}
    </>
  );
};

export default GetAppointments;
