const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  status: {
    type: String,
    enum: ['applied', 'viewed', 'interviewed', 'selected', 'rejected'],
    default: 'applied',
  },
  employeeName: String,
  employeeEmail: String,
  employeePhone: String,
  resumeFile: { type: String}
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
