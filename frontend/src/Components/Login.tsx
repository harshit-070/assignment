import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  TextFieldProps,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { loginUser } from "../services/user.service";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    const data = {
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
    };
    const response = await dispatch(loginUser(data));
    const { success, role } = response.payload as any;
    console.log(success, role);
    if (success) {
      if (role === "Company") {
        navigate("/dashboard");
      } else {
        navigate("/viewJobs");
      }
    }
  };

  const emailRef = useRef<TextFieldProps>(null);
  const passwordRef = useRef<TextFieldProps>(null);

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid alignContent="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Log In</h2>
        </Grid>
        <TextField
          label="Email"
          placeholder="Enter Email"
          type="email"
          fullWidth
          required
          margin="normal"
          inputRef={emailRef}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          inputRef={passwordRef}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography>
          Do you have an account ?<Link to="/signin">Sign In</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
