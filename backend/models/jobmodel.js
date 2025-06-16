const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  jobType: String,
  location: String,
  salary: String,
  benefits: String,
  education: [String],
  experience: String,
  skills: [String],
  language: String,
  eligiblity: String,
  companyName: String,
  subheading: String,
  company_description: String,
  Url: String,
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
