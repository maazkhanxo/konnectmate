import React, {  useState,useEffect} from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { setJobs } from "state";

const JobsPosting = () => {
  // State variables for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');

  // Change handlers for form fields
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  const { _id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  // Submit handler for form
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Get the form data
    const formData = {
      userId:_id,
      title,
      description,
      location,
      salary,
      type,
      category,
      skills,
      experience
    };
    // Log the form data or send it to a server
    //TODO: save jobpost to database

    const response = await fetch(`http://localhost:3001/jobs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const updatedJobs = await response.json();
    dispatch(setJobs({ jobs:updatedJobs }));
    // Reset the form fields
    setTitle('');
    setDescription('');
    setLocation('');
    setSalary('');
    setType('');
    setCategory('');
    setSkills('');
    setExperience('');
  };


  return (
    <Box >
      <Container maxWidth="md">
        <Paper style={{ margin: '16px', padding: '16px' }}>
          <form onSubmit={handleSubmit}  >
            <Typography variant="h4" align="center">
              Post a Job
            </Typography>
            <Typography variant="subtitle1" align="center">
              Fill out the form below to create a job listing
            </Typography>
            <FormControl fullWidth margin="normal" required>
              <InputLabel htmlFor="title">Job Title</InputLabel>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={handleTitleChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel htmlFor="description">Job Description</InputLabel>
              <Input
                id="description"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                multiline
                rows={3}
              />
              <FormHelperText>
                Describe the main responsibilities and requirements for this job
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel htmlFor="location">Job Location</InputLabel>
              <Input
                id="location"
                name="location"
                value={location}
                onChange={handleLocationChange}
              />
              <FormHelperText>Enter the city or remote option</FormHelperText>
            </FormControl>
            {/* Skills */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel htmlFor="title">Skills Required</InputLabel>
              <Input
                id="skills"
                name="skills"
                value={skills}
                onChange={handleSkillsChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel htmlFor="salary">Job Salary</InputLabel>
              <Input
                id="salary"
                name="salary"
                value={salary}
                onChange={handleSalaryChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="type-label">Job Type</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                name="type"
                value={type}
                onChange={handleTypeChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="full-time">Full-Time</MenuItem>
                <MenuItem value="part-time">Part-Time</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
                <MenuItem value="internship">Internship</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="category-label">Job Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={category}
                onChange={handleCategoryChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="web-development">Web Development</MenuItem>
                <MenuItem value="mobile-development">Mobile Development</MenuItem>
                <MenuItem value="data-science">Data Science</MenuItem>
                <MenuItem value="frontend">Frontend Development</MenuItem>
                <MenuItem value="backend">Backend Development</MenuItem>
                <MenuItem value="full-stack">Full Stack</MenuItem>
              </Select>
            </FormControl>


            {/* Experience Level */}
            <Typography variant="h5" style={{ marginTop: '16px' ,marginBottom:'4px'}}>
              Experience Level
            </Typography>
            <RadioGroup
              style={{margin:"6px",padding:'3px',gap:"6px"}}
              aria-label="experience"
              name="experience"
              value={experience}
              onChange={handleExperienceChange}
            >
              <FormControlLabel
                value="junior"
                control={<Radio />}
                label="Junior"
              />
              <FormControlLabel
                value="mid-level"
                control={<Radio />}
                label="Mid-Level"
              />
              <FormControlLabel
                value="senior"
                control={<Radio />}
                label="Senior"
              />
            </RadioGroup>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '16px' }}
              disabled={!experience}
            >
              Post Job
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );

}

export default JobsPosting;