const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
  // server.close(() => {
  //   process.exit(1);
  // });
});

const app = require('./app');

// DB Config
const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log(`DB connection successful!, `);
  });
// .catch((err) => {
//   console.log(`DB connection error: ${err}`);
// });

const port = process.env.PORT || 5000;

// Start server
const server = app.listen(port, () => {
  console.log('Server started on port 3000');
});
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  // process.exit(1);
  server.close(() => {
    process.exit(1);
  });
});

