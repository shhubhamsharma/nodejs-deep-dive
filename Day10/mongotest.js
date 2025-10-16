require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/userdb';

async function testConnection() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connection successful!');

    // Optional: test a simple model
    const Test = mongoose.model('Test', new mongoose.Schema({ name: String }));
    const doc = await Test.create({ name: 'NodeJS Deep Dive' });
    console.log('🧩 Test document inserted:', doc);

    await mongoose.disconnect();
    console.log('🔌 Disconnected cleanly.');
  } catch (err) {
    console.error('❌ Connection error:', err);
  }
}

testConnection();
