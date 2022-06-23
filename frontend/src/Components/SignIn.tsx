import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextFieldProps,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { signinUser } from "../services/user.service";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const naviagte = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
      passwordConfirmation: confirmPasswordRef.current?.value as string,
      name: nameRef.current?.value as string,
      role,
    };
    const response = await dispatch(signinUser(data));
    if (response.payload) {
      naviagte("/login");
    }
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const textFieldStyle = { margin: "3px 0" };

  const emailRef = useRef<TextFieldProps>(null);
  const passwordRef = useRef<TextFieldProps>(null);
  const confirmPasswordRef = useRef<TextFieldProps>(null);
  const nameRef = useRef<TextFieldProps>(null);
  const [role, setRole] = useState<string>("");

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid alignContent="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label="Name"
          placeholder="Enter Name"
          type="text"
          fullWidth
          required
          style={textFieldStyle}
          inputRef={nameRef}
        />
        <TextField
          label="Email"
          placeholder="Enter Email"
          type="email"
          fullWidth
          required
          style={textFieldStyle}
          inputRef={emailRef}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          inputRef={passwordRef}
          style={textFieldStyle}
        />
        <TextField
          label="Password Confirm"
          placeholder="Password Confirm"
          type="password"
          fullWidth
          required
          inputRef={confirmPasswordRef}
          style={textFieldStyle}
        />
        <FormControl fullWidth style={textFieldStyle}>
          <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
          <Select
            label="Role"
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={role}
            onChange={(e) => setRole(e.target.value as string)}
          >
            <MenuItem value={"Company"}>Company</MenuItem>
            <MenuItem value={"Applicant"}>Applicant</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleSubmit}
        >
          Sign in
        </Button>
        <Typography>
          Already have a account?<Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SignIn;
