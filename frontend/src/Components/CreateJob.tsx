import { Grid, Paper, TextField, Button, TextFieldProps } from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ChipInput from "material-ui-chip-input";
import axios from "axios";
import { useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";
import { setMessage } from "../reducers/message.reducer";

function CreateJob() {
  const paperStyle = {
    padding: 20,
    height: "90vh",
    width: "90%",
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };
  const textFieldStyle = { margin: "3px auto 1px auto" };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const data = {
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        stipend: {
          min: parseInt(minStipendRef.current?.value as string),
          max: parseInt(maxStipendRef.current?.value as string),
        },
        opening: parseInt(openingRef.current?.value as string),
        duration: parseInt(durationRef.current?.value as string),
        date,
        skills,
      };
      const response = await axios.post("/job/create", data);
      if (response.data.success) {
        dispatch(setMessage({ message: "Job Posted", variant: "success" }));
        navigate("/dashboard");
        return true;
      }
      return false;
    } catch (error: any) {
      console.log(error);
      dispatch(
        setMessage({ message: error.response.data.message, variant: "error" })
      );
    }
  };

  const titleRef = useRef<TextFieldProps>(null);
  const descriptionRef = useRef<TextFieldProps>(null);
  const minStipendRef = useRef<TextFieldProps>(null);
  const maxStipendRef = useRef<TextFieldProps>(null);
  const openingRef = useRef<TextFieldProps>(null);
  const durationRef = useRef<TextFieldProps>(null);
  const [date, setDate] = React.useState<Date | null>(null);
  const [skills, setSkills] = React.useState<String[]>([]);
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid alignContent="center">
          <h1>Create Job</h1>
        </Grid>
        <TextField
          label="Title"
          placeholder="Enter Title"
          fullWidth
          required
          margin="normal"
          style={textFieldStyle}
          inputRef={titleRef}
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={10}
          fullWidth
          required
          style={textFieldStyle}
          inputRef={descriptionRef}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                required
                label="Min Stipened"
                fullWidth
                type="number"
                inputRef={minStipendRef}
                style={textFieldStyle}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                label="Max Stipened"
                type="number"
                inputRef={maxStipendRef}
                fullWidth
                style={textFieldStyle}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                label="Number of Opening"
                type="number"
                inputRef={openingRef}
                style={textFieldStyle}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                required
                label="Duration in months"
                type="number"
                style={textFieldStyle}
                inputRef={durationRef}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider ider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Starting Date"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      style={textFieldStyle}
                      required
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
        <ChipInput
          defaultValue={skills}
          onChange={(chips) => setSkills(chips)}
          style={textFieldStyle}
          fullWidth
          label="Skills"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleSubmit}
        >
          Post
        </Button>
      </Paper>
    </Grid>
  );
}

export default CreateJob;
