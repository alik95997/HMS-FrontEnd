import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../utils/axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import EditAppointment from "./EditAppointment";

const GetAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointment/");
      console.log(response?.data?.appointmentResponse);
      setAppointments(response?.data?.appointmentResponse);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchAppointments();
  }, []);

  const editAppointment = (id) => {
    try {
      setOpen(true);
      setSelectedId(id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      const response = await api.delete(`/appointment/${id}`);
      toast.success("Appointment Deleted successfully ");
      fetchAppointments();
    } catch (error) {
      toast.error("Error deleting Appointment ");
      console.log(error.message);
    }
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
                        deleteAppointment(appointment._id);
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
      {open && <EditAppointment selectedAppointment={selectedId} />}
    </>
  );
};

export default GetAppointments;
