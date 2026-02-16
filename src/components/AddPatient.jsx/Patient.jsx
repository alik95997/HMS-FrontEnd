import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import api from "../../utils/axios";
import EditPatient from "./EditPatient";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";

import {
  useGetPatientsQuery,
  useDeletePatientMutation,
} from "../../services/patientApi.js";
import AddPatient from "./AddPatient";
const Patient = () => {
  const [deletePatient] = useDeletePatientMutation();
  const {
    data: patients,
    error: patientError,
    isLoading: isLoadingPatient,
  } = useGetPatientsQuery();

  const [selectedPatient, setSelectedPatient] = useState({});
  const [open, setOpen] = React.useState(false);

  const editPatient = (id) => {
    setOpen(true);
    const toEditPatient = patients.find((patient) => patient._id === id);
    setSelectedPatient(toEditPatient);
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid",
        p: 2,
        gap: 2,
      }}
    >
      {/* Add new Patient Box  */}

      <AddPatient />
      {/* Show Patient */}
      <Stack flexDirection="column" alignItems={"center"} gap={2}>
        <Typography color="primary" fontWeight={"bold"}>
          All Patient
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 3,
          }}
        >
          {patientError ? (
            <>Error Fething Patients</>
          ) : isLoadingPatient ? (
            <>Loading...</>
          ) : (
            <>
              {patients.map((item, index) => {
                return (
                  <Stack gap={2} key={index}>
                    <Typography>Name: {item.name}</Typography>
                    <Typography>Age: {item.age}</Typography>
                    <Typography>Gender: {item.gender}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          editPatient(item._id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          deletePatient(item._id);
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
      {/* Show Edit Option  */}
      {open && (
        <Box>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <Button
              sx={{ alignSelf: "flex-end" }}
              variant="contained"
              color="error"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              <CloseIcon />
            </Button>
            <EditPatient user={selectedPatient} />
          </Drawer>
        </Box>
      )}
    </Box>
  );
};

export default Patient;
