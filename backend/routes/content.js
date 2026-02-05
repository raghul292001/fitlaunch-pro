const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const contentController = require('../controllers/contentController');
const { Hero, Feature, Program, Coach, PricingPlan, PersonalTraining, Testimonial, BMIContent, FooterContact } = require('../models');
const auth = require('../middleware/auth');

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Helper for Routes
const createRoutes = (pathStr, Model, isSingle = false) => {
    if (isSingle) {
        router.get(pathStr, contentController.getSingle(Model));
        // Single docs usually have file uploads (Hero bg)
        router.put(pathStr, auth, upload.single('image'), contentController.updateSingle(Model));
    } else {
        router.get(pathStr, contentController.getAll(Model));
        router.get(`${pathStr}/:id`, contentController.getById(Model)); // Added for single item fetch (like blog post)
        router.post(pathStr, auth, upload.single('image'), contentController.create(Model));
        router.put(`${pathStr}/:id`, auth, upload.single('image'), contentController.update(Model));
        router.delete(`${pathStr}/:id`, auth, contentController.delete(Model));
    }
};

// Routes
createRoutes('/hero', Hero, true);
createRoutes('/features', Feature);
createRoutes('/programs', Program);
createRoutes('/coaches', Coach);
createRoutes('/pricing', PricingPlan);
createRoutes('/personal-training', PersonalTraining);
createRoutes('/testimonials', Testimonial);
createRoutes('/bmi', BMIContent, true);
createRoutes('/cta-banner', require('../models').CTABanner, true);
createRoutes('/footer', FooterContact, true);
createRoutes('/blog', require('../models').BlogPost);

// Contact Routes
router.post('/contact', contentController.submitContact);
router.get('/contact', auth, contentController.getContactSubmissions);

// Section Headers
router.get('/section/:sectionName', contentController.getSectionHeader);
router.put('/section/:sectionName', auth, contentController.updateSectionHeader);

module.exports = router;
