const mongoose = require('mongoose');
mongoose
  .connect('mongodb+srv://admin:admin@cluster0.iw20o.mongodb.net/test?authSource=admin&replicaSet=atlas-thakvp-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('Connected to MongoDB'))
  .catch(console.error);
