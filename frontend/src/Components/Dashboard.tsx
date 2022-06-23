import { Button, Paper, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Job {
  _id: string;
  title: string;
}

function Dashboard() {
  const divStyle = {
    margin: "30px auto",
    width: "80%",
  };

  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchMyJobs = async () => {
      const response = await axios.get("/job/getMyPostedJobs");
      if (response.data.success) {
        setJobs(response.data.jobs);
      }
    };
    fetchMyJobs().catch((e) => console.log(e));
  }, []);

  return (
    <div style={divStyle}>
      <Box textAlign="right">
        <Link
          to="/createJob"
          style={{ color: "white", textDecoration: "none" }}
        >
          <Button variant="contained">Post Job</Button>
        </Link>
      </Box>
      <Box sx={{ m: 5 }} />
      <Typography variant="h5">Your Jobs</Typography>
      <Box sx={{ m: 3 }} />
      {jobs.map((job) => {
        const { _id } = job;
        return <JobCard key={_id} job={job} />;
      })}
    </div>
  );
}

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const paperStyle = {
    padding: 20,
    width: "80%",
    margin: "8px auto",
    cursor: "pointer",
  };

  return (
    <Paper elevation={3} style={paperStyle}>
      <Grid container>
        <Grid item xs={7} textAlign="left">
          <Typography variant="h6" gutterBottom>
            {job.title}
          </Typography>
        </Grid>
        <Grid item xs={5} textAlign="right">
          <Link to={`/response/${job._id}`}>
            <Button variant="contained">View Response </Button>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Dashboard;
