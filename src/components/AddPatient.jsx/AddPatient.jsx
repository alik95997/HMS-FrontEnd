import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useCreatePatientMutation } from "../../services/patientApi.js";
const AddPatient = () => {
  const [createPatients] = useCreatePatientMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddPatient = async (data) => {
    try {
      console.log(data);
      await createPatients(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box>
      <Typography mb={2} textAlign="center" color="primary" fontWeight={"bold"}>
        Add New Patient
      </Typography>
      <form onSubmit={handleSubmit(handleAddPatient)}>
        <Stack gap={3}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            {...register("name")}
          />

          <TextField
            id="outlined-basic"
            {...register("age")}
            label="Age"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Gender"
            {...register("gender")}
            variant="outlined"
          />

          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddPatient;
