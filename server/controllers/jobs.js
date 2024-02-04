import Jobs from "../models/Jobs.js";
import Notification from "../models/Notification.js";

/* CREATE */

export const createJob = async (req, res) =>{
  try {
    const {userId, title, description, location, salary, type, category, skills, experience } = req.body;
    const newJob = new Jobs({
      userId,
      title,
      description,
      location,
      salary,
      type,
      category,
      skills,
      experience
    });
    await newJob.save();

    const jobs = await Jobs.find().sort({ _id: -1 });
    res.status(201).json(jobs);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find().sort({ _id: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findById(id).sort({ _id: -1 });;
    res.status(200).json(job);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, salary, type, category, skills, experience } = req.body;
    const updatedJob = await Jobs.findByIdAndUpdate(
      id,
      { title, description, location, salary, type, category, skills, experience },
      { new: true }
    );
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


//Get Applied JOBS
export const getAppliedJob = async (req, res) => {
  try {
    const job = await Jobs.findById(req.params.id);
    const isApplied = job.applicants.includes(req.user.id);
    res.json({ isApplied });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// APPLY JOB
export const applyJob = async (req, res) => {
  try {
    const job = await Jobs.findById(req.params.id);
    const {userId} = req.body
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    console.log(job)
    if (job.applicants.includes(userId)) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }
    else{
      job.applicants.push(userId);
      await job.save();
    }

    // Send notification to the job poster
    const notification = new Notification({
      fromUser: req.user._id,
      toUser: job.userId,
      jobId: job._id,
      type: 'jobApplication',
      message: `${req.user.firstName} ${req.user.lastName} has applied to your job '${job.title}'`,
    });
    await notification.save();

    res.status(200).json({ message: 'Applied successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

/* DELETE */
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Jobs.findByIdAndRemove(id);
    res.status(200).json({ message: "Job deleted successfully." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
