import express from "express";
import { getJobs, getJobById, createJob, updateJob, getAppliedJob, applyJob, deleteJob } from "../controllers/jobs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getJobs);
router.get("/:id", verifyToken, getJobById);

/* CREATE */
router.post("/", verifyToken, createJob);

/* UPDATE */
router.patch("/:id", verifyToken, updateJob);

/*Read Applied Jobs*/
router.get('/applied/:id', verifyToken, getAppliedJob)

/*Apply Job*/
router.patch("/apply/:id", verifyToken, applyJob)

/* DELETE */
router.delete("/:id", verifyToken, deleteJob);

export default router;