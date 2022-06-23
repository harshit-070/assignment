import { Button, Paper } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { setMessage } from "../reducers/message.reducer";
function ApplyJob() {
  const [resume, setResume] = useState<Blob | string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { jobId } = useParams();
  const handleRegister = async (e: any) => {
    try {
      e.preventDefault();

      if (!resume) {
        dispatch(setMessage({ message: "Select Resume", variant: "error" }));
        return;
      }

      const formData = new FormData();

      formData.set("resume", resume);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post(`/job/apply/${jobId}`, formData, config);
      dispatch(setMessage({ message: "Applied", variant: "success" }));
      navigate("/jobs");
    } catch (error: any) {
      if (error.response.data.message === "Already Applied") {
        dispatch(
          setMessage({
            message: error.response.data.message,
            variant: "success",
          })
        );
        navigate("/jobs");
      } else {
        dispatch(
          setMessage({ message: error.response.data.message, variant: "error" })
        );
      }
    }
  };

  const handleResumeChange = (e: any) => {
    setResume(e.target.files[0]);
  };

  const paperStyle = {
    padding: 20,
    width: "80%",
    margin: "10px auto",
    cursor: "pointer",
  };
  return (
    <Paper elevation={3} style={paperStyle}>
      <label>
        <input
          type="file"
          accept=".pdf"
          name="avatar"
          onChange={handleResumeChange}
        />
      </label>
      <Button variant="contained" onClick={handleRegister}>
        Apply for Job
      </Button>
    </Paper>
  );
}

export default ApplyJob;
