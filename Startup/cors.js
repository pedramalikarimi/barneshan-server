const cors = require("cors");

module.exports = function(app) {
  app.use(cors());
  app.options('*', cors())
};