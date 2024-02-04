import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  skills: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  }, 
  applicants: {
    type: [String],
    default: []
  }
},
  { timestamps: true }
);

export default mongoose.model('Jobs', jobSchema);