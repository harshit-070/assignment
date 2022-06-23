import { useEffect, useState } from "react";
import { Chip, Grid, Paper, Typography, Stack } from "@mui/material";
import { Box } from "@mui/system";
import ApplyJob from "./ApplyJob";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Job {
  _id: string;
  title: string;
  description: string;
  stipend: {
    min: number;
    max: number;
  };
  duration: number;
  date: string;
  issuedBy: { name: string };
  skills: string[];
}

function ViewJob() {
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/job/view/${jobId}`);
      setJob(response.data.job);
    };

    fetch().catch((e) => console.log(e));
  }, [jobId]);

  const paperStyle = {
    padding: 20,
    width: "80%",
    margin: "2px auto",
    cursor: "pointer",
  };

  const ChipStyle = {
    margin: "2px",
  };

  if (!job) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Typography variant="h4" textAlign="center">
        {job.title}
      </Typography>
      <Paper elevation={3} style={paperStyle}>
        <Stack textAlign="left">
          <Typography variant="h6" gutterBottom>
            {job.title}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Issued By {job.issuedBy.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Staring Date</Typography>
              <Typography variant="subtitle2">
                {new Date(job.date).toLocaleDateString("en-IN")}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Duration</Typography>
              <Typography variant="subtitle2">{job.duration} months</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Min Stipend</Typography>
              <Typography variant="subtitle2">
                {job.stipend.min} per month
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Max Stipend</Typography>
              <Typography variant="subtitle2">
                {job.stipend.max} per month
              </Typography>
            </Grid>
          </Grid>
          <hr />
          <Typography variant="h6">Description</Typography>
          <Typography variant="body2">{job.description}</Typography>
          <Box sx={{ m: 1 }} />
          <Typography variant="body1">Skills Required</Typography>
          <Grid>
            <Grid>
              {job.skills.map((skill, index) => {
                return (
                  <Chip
                    variant="filled"
                    label={skill}
                    style={ChipStyle}
                    key={index}
                  />
                );
              })}
            </Grid>
          </Grid>
        </Stack>
      </Paper>
      <ApplyJob />
    </div>
  );
}

export default ViewJob;
