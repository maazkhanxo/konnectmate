import express from "express"
const router = express.Router()
import Notification from '../models/Notification.js'
import { verifyToken } from "../middleware/auth.js";


// This route will return a user's notifications
router.get('/', verifyToken, async (req, res) => {
  try {
    // Fetch notifications for the current user from the database
    const notifications = await Notification.find({ toUser: req.user._id }).sort({ _id: -1 });;
    res.status(200).json({ notifications });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id',verifyToken,async(req,res)=>{
  try {
    const notificationForUser = await Notification.find({toUser:req.params.id}).sort({ _id: -1 });
    res.status(200).json({notificationForUser})
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

router.post('/',verifyToken, async (req, res) => {
  try {
    const { fromUser, toUser, jobId, type, message } = req.body;
    const notification = new Notification({
      fromUser,
      toUser,
      jobId,
      type,
      message
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


export default router
