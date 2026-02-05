const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Admin } = require('./models');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gym-cms');
    console.log('MongoDB Connected');

    const username = 'admin';
    const password = 'password123';

    let admin = await Admin.findOne({ username });
    if (admin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    admin = new Admin({ username, password });
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    await admin.save();

    console.log(`Admin created successfully.\nUsername: ${username}\nPassword: ${password}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
