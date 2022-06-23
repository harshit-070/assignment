import { Paper, Grid, Typography, Button, Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Applicant {
  user: { name: string };
  resume: string;
}

interface Job {
  _id: string;
  title: string;
  description: string;
  applicants: Applicant[];
}

function Applicants() {
  const { jobId } = useParams();

  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/job/response/${jobId}`);
      console.log(response);
      setJob(response.data.job);
    };
    fetch().catch((e) => console.log(e));
  }, [jobId]);

  if (!job) {
    return <div>Loading</div>;
  }

  return (
    <Box textAlign="center">
      <Typography variant="h4">{job?.title}</Typography>
      <Box sx={{ m: 3 }} />
      <Typography variant="subtitle1">
        Following People Applied for this Job
      </Typography>
      <Box sx={{ m: 1 }} />
      {job.applicants.length === 0
        ? "No One Applied"
        : job.applicants.map((applicant, index) => {
            return <ApplicantCard applicant={applicant} key={index} />;
          })}
      <Box sx={{ m: 3 }} />
    </Box>
  );
}

const ApplicantCard: React.FC<{ applicant: Applicant }> = ({ applicant }) => {
  const paperStyle = {
    padding: 20,
    width: "80%",
    margin: "2px auto",
    cursor: "pointer",
  };
  const {
    user: { name },
    resume,
  } = applicant;
  return (
    <Paper elevation={3} style={paperStyle}>
      <Grid container>
        <Grid item xs={7} textAlign="left">
          <Typography variant="h6" gutterBottom>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={5} textAlign="right">
          <a href={`http://localhost:5000/public/uploads/resume/${resume}`}>
            <Button variant="contained">Download Resume</Button>
          </a>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Applicants;
