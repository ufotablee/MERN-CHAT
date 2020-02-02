import mongoose from 'mongoose';

mongoose.connect( process.env.MONGODB_URL || 'mongodb://localhost/chat', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});