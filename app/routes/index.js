let login = require('./login')

module.exports = {
   router(app) {
       app.use('/api', login);
   }
};