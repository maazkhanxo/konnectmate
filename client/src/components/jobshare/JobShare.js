import {  Container, LinearProgress, Typography } from '@mui/material';
import JobCard from 'components/jobcard/JobCard';
import { useDispatch, useSelector } from "react-redux";
import { setJobs } from "state";
import React, { useEffect, useState } from 'react';

const JobShare = () => { 

  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const [getJob, setgetJob] = useState(null)

  useEffect(() => {

      getUserJob();

  }, []);

  const getUserJob = async () => {
      const response = await fetch(`http://localhost:3001/jobs`, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
          },
      });
      const data = await response.json();

      dispatch(setJobs({ jobs: data }))
      setgetJob(data);
  };

  if (!getJob) {
      return <LinearProgress />;
  }
  return (
    <Container >
      <Typography variant="h3" align="center" paddingTop={3}>
        Available Jobs
      </Typography>
      <Typography variant="subtitle1" align="center" paddingBottom={2}>
        Choose any jobs according to your skills and flexibility
      </Typography>
      {getJob.map((item) => (
        <JobCard key={item._id} getJob={item} />
      ))}
    </Container>
  );
}

export default JobShare;