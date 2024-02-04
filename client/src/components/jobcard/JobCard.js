import ModeIcon from '@mui/icons-material/Mode';
import React from 'react';
import { Card, CardContent, Container, Typography, Box } from '@mui/material';
import UpdateJob from './UpdateJob';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs } from 'state';
import ApplyButton from './ApplyButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  // margin:"6px",
  border: "none",
  background: "transparent"
};

const JobCard = ({ getJob }) => {

  const loggedInUserId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const { _id,userId, title, description, location, salary, type, category, skills, experience } = getJob;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteJob = async () => {
    setOpen(false);
    window.location.reload()
    const response = await fetch(`http://localhost:3001/jobs/${_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    dispatch(setJobs({ jobs: data }))
  }


  return (

    <Container maxWidth="lg">
      <Card style={{ margin: "4px", padding: "6px" }} elevation={2}>
        <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <Typography variant="h5" style={{ color: "#3f51b5" }}>
            {title}
          </Typography>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <UpdateJob setOpen={setOpen} deleteJob={deleteJob} getJob={getJob} />
            </Box>
          </Modal>

          {(loggedInUserId===userId)&&(<ModeIcon style={{ cursor: "pointer" }} onClick={handleOpen} variant="contained" color="primary"></ModeIcon>)}

        </CardContent>
        <CardContent>
          <Typography color="GrayText" >
            Location: {location}
          </Typography>
          <Typography color="textSecondary" variant="body1" component="p" >
            Description: {description}
          </Typography>
          <Typography color="textSecondary" >
            Salary: {salary}
          </Typography>
          <Typography color="textSecondary">
            Type: {type}
          </Typography>
          <Typography color="textSecondary">
            Category: {category}
          </Typography>
          <Typography color="textSecondary">
            Skills Required: {skills}
          </Typography>
          <Typography color="textSecondary">
            Experience Level: {experience}
          </Typography>
          <Box sx={{display: "flex", justifyContent: "flex-end"}}>
           {(loggedInUserId!==getJob.userId)&&<ApplyButton getJob={getJob} />}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default JobCard;
