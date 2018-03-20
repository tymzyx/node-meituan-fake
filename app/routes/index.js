let login = require('./login')
let store = require('./store')

module.exports = {
   router(app) {
       app.use('/api', login);
       app.use('/api', store);
   }
};