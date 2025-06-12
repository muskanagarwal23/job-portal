
const express = require('express');
const router = express.Router();
const { applyToJob,getApplicationsForEmployer,updateApplicationStatus } = require('../controllers/applicationController');
const { protect,authorize } = require('../middleware/authMiddleware');
const { getMyApplications } = require('../controllers/applicationController');
router.post('/apply/:jobId', protect, applyToJob);
router.get(
  '/employer',
  protect,
  authorize('employer'),
  getApplicationsForEmployer
);
router.put('/status/:id', protect, updateApplicationStatus);
router.get('/test', (req, res) => {
  res.json({ message: 'Application routes working' });
});
router.get('/my', protect, authorize('employee'), getMyApplications);

module.exports = router;
