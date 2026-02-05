const { Hero, FooterContact, BMIContent } = require('../models');

// Generic handler for single documents (Hero, Footer, BMI)
exports.getSingle = (Model) => async (req, res) => {
  try {
    let doc = await Model.findOne();
    if (!doc) {
        // Initialize if empty
        doc = new Model({});
        await doc.save();
    }
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSingle = (Model) => async (req, res) => {
  try {
    let updateData = { ...req.body };
    
    // Handle file upload for Hero background
    if (req.file) {
      updateData.backgroundImage = `/uploads/${req.file.filename}`;
    } else {
        delete updateData.image; 
        delete updateData.backgroundImage;
    }

    // Clean up updateData to remove "undefined" or "null" strings from FormData
    Object.keys(updateData).forEach(key => {
        if (updateData[key] === 'undefined' || updateData[key] === 'null') {
            delete updateData[key];
        }
    });

    // Handle stats array if it exists (for Hero)
    if (updateData.stats && typeof updateData.stats === 'string') {
        try {
            updateData.stats = JSON.parse(updateData.stats);
        } catch (e) {
            // If parse fails, assume it's not a JSON string or remove it
            delete updateData.stats;
        }
    }

    // Use findOneAndUpdate with upsert option to handle concurrency and versioning better
    const doc = await Model.findOneAndUpdate({}, updateData, {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
    });
    
    res.json(doc);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.submitContact = async (req, res) => {
    try {
        const { ContactSubmission } = require('../models');
        const submission = new ContactSubmission(req.body);
        await submission.save();
        res.json({ message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getContactSubmissions = async (req, res) => {
    try {
        const { ContactSubmission } = require('../models');
        const submissions = await ContactSubmission.find().sort({ date: -1 });
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getSectionHeader = async (req, res) => {
    try {
        const { SectionHeader } = require('../models');
        let header = await SectionHeader.findOne({ sectionName: req.params.sectionName });
        if (!header) {
            header = new SectionHeader({ sectionName: req.params.sectionName, title: 'Default Title', subtitle: 'Default Subtitle' });
            await header.save();
        }
        res.json(header);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateSectionHeader = async (req, res) => {
    try {
        const { SectionHeader } = require('../models');
        const header = await SectionHeader.findOneAndUpdate(
            { sectionName: req.params.sectionName },
            req.body,
            { new: true, upsert: true }
        );
        res.json(header);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Generic handlers for collections (Services, Programs, etc.)
exports.getAll = (Model, sort = {}) => async (req, res) => {
    try {
        const docs = await Model.find().sort(sort);
        res.json(docs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getById = (Model) => async (req, res) => {
    try {
        const doc = await Model.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Not found' });
        res.json(doc);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.create = (Model) => async (req, res) => {
    try {
        const body = { ...req.body };
        
        // Handle comma-separated lists for array fields (like certifications)
        if (body.certifications && typeof body.certifications === 'string') {
            body.certifications = body.certifications.split(',').map(s => s.trim()).filter(s => s);
        }
        
        const doc = new Model(body);
        // Prioritize file upload, but fallback to body.image if it's a URL string
        if (req.file) {
            doc.image = `/uploads/${req.file.filename}`;
        } else if (req.body.image && typeof req.body.image === 'string') {
            doc.image = req.body.image;
        }

        await doc.save();
        res.json(doc);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
};

exports.update = (Model) => async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        } else if (req.body.image && typeof req.body.image === 'string') {
            // If explicit image URL provided (and no file), update it
            updateData.image = req.body.image;
        }
        // Note: if neither file nor string is provided, we don't overwrite existing image 
        // unless we want to allow clearing it, but typical edit flow preserves unless changed.
        
        const doc = await Model.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(doc);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.delete = (Model) => async (req, res) => {
    try {
        await Model.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
