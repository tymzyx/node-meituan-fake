let login = require('./login');
let store = require('./store');
let v1 = require('./v1');
let register = require('./register')

module.exports = {
   router(app) {
       app.use('/api/v1', v1);
       app.use('/api', register);
       app.use('/api/store', store);
       app.use('/api', login);
   }
};