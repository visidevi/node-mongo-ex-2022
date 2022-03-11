const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => {
  console.log('Server started on port 3000');
});
