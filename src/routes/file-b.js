const path = require('path');

const FILES = require('../files/files');
const fm = require('../files/files-manager');
const { log } = require('../logger');

const filePath = path.join(path.resolve('data'), FILES.TXT.B);

exports.get = async (req, res) => {
  try {
    const content = await fm.readFile(filePath);
    res.type('text/plain');
    res.send(content);
  } catch (err) {
    log.error(err && err.message);
    res.status(500);
    res.send();
  }
};
