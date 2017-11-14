const candidates  = require('./db/db.json');
const problems    = require('./db/interview.json');

module.exports = function() {
  return {
    candidates  : candidates,
    problems    : problems
  }
}
