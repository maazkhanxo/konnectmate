import React, { useState } from 'react';
import { Card, CardContent, Container, TextField, Button, useMediaQuery } from '@mui/material';
import { setJob } from "state";
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';


const UpdateJob = ({ getJob, setOpen, deleteJob }) => {
    const [title, setTitle] = useState(getJob.title);
    const [description, setDescription] = useState(getJob.description);
    const [location, setLocation] = useState(getJob.location);
    const [salary, setSalary] = useState(getJob.salary);
    const [type, setType] = useState(getJob.type);
    const [category, setCategory] = useState(getJob.category);
    const [skills, setSkills] = useState(getJob.skills);
    const [experience, setExperience] = useState(getJob.experience);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 900px)");

    const handleSubmit = (e) => {
        setOpen(false);
        window.location.reload()
        fetch(`http://localhost:3001/jobs/${getJob._id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                location,
                salary,
                type,
                category,
                skills,
                experience
            })
        })
            .then(res => res.json())
            .then(data => {
                dispatch(setJob({ jobs: data }))
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            {isNonMobileScreens ? (
                <Container maxWidth="md">
                    <Card style={{ margin: "4px", padding: "6px" }} elevation={2}>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth margin="normal" />
                                <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth margin="normal" />
                                <TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} fullWidth margin="normal" />
                                <TextField label="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} fullWidth margin="normal" />
                                <TextField label="Type" value={type} onChange={(e) => setType(e.target.value)} fullWidth margin="normal" />
                                <TextField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} fullWidth margin="normal" />
                                <TextField label="Skills Required" value={skills} onChange={(e) => setSkills(e.target.value)} fullWidth margin="normal" />
                                <TextField label="Experience Level" value={experience} onChange={(e) => setExperience(e.target.value)} fullWidth margin="normal" />
                                <Button style={{ marginRight: "3px" }} variant="contained" color="primary" type="submit"><UpdateIcon /></Button>
                                <Button style={{ margin: "2px" }} variant="contained" color="error" onClick={() => deleteJob(getJob._id)}><DeleteIcon /></Button>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            ) : (
                <Container maxWidth="sm">
                    <Card style={{ margin: "4px", padding: "6px" }} elevation={2}>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth margin="normal" />
                                <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth margin="normal" />
                                <TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} fullWidth margin="normal" />
                                <TextField label="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} fullWidth margin="normal" />
                                <TextField label="Type" value={type} onChange={(e) => setType(e.target.value)} fullWidth margin="normal" />
                                <TextField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} fullWidth margin="normal" />
                                <TextField label="Skills Required" value={skills} onChange={(e) => setSkills(e.target.value)} fullWidth margin="normal" />
                                <TextField label="Experience Level" value={experience} onChange={(e) => setExperience(e.target.value)} fullWidth margin="normal" />
                                <Button variant="contained" color="primary" type="submit"><UpdateIcon /></Button>
                                <Button style={{ marginTop: "2px" }} variant="contained" color="error" onClick={() => deleteJob(getJob._id)}><DeleteIcon /></Button>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            )}
        </>
    );
};

export default UpdateJob;