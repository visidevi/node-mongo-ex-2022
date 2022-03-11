const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
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

const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => {
  console.log('Server started on port 3000');
});
