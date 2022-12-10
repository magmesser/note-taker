const uuid = require('uuid');

const noteID = uuid.v4().slice(0, 4);
console.log(noteID);

module.exports = noteID;