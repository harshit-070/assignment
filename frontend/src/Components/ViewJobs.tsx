import { useEffect, useState } from "react";

import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

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

export default function ViewJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("/job");
      setJobs(response.data.jobs);
    };
    fetch().catch((e) => console.log(e));
  }, []);

  return (
    <Box textAlign="center" margin="40px auto">
      <Typography variant="h4">Jobs Available</Typography>
      {jobs.map((job) => (
        <JobCard job={job} key={job._id} />
      ))}
    </Box>
  );
}

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const paperStyle = {
    padding: 20,
    width: "80%",
    margin: "10px auto",
    cursor: "pointer",
  };

  const ChipStyle = {
    margin: "2px",
  };

  return (
    <Paper elevation={3} style={paperStyle}>
      <Grid container>
        <Grid item xs={7} textAlign="left">
          <Typography variant="h6" gutterBottom>
            {job.title}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Issued By {job.issuedBy.name}
          </Typography>
          {job.skills.map((skill, index) => {
            return (
              <Chip
                label={skill}
                key={index}
                variant="outlined"
                style={ChipStyle}
              />
            );
          })}
        </Grid>
        <Grid item xs={5}>
          <Typography variant="button" gutterBottom display="block">
            {job.stipend.min}-{job.stipend.max} INR
          </Typography>
          <Link to={`/viewJob/${job._id}`}>
            <Button variant="contained">Apply Now</Button>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};
