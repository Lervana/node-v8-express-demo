const path = require('path');

const FILES = require('../enums/files');
const { wrapEndedRoute } = require('../wrappers/route-wrapper');

const scriptPath = path.resolve(FILES.SCRIPTS.STRINGS);

const callChild = async (param, res) => {
  const { spawn } = require('child_process');
  const child = spawn('node', [scriptPath, param]);

  return new Promise((resolve, reject) => {
    child.stdout.on('data', msg => res.write(msg.toString()));
    child.stderr.on('data', () => reject('Error when executing script'));
    child.on('exit', code => {
      if (code !== 0) throw 'Cannot execute script';
      resolve();
    });
  });
};

exports.get = wrapEndedRoute(async (req, res) => {
  res.type('text/plain');

  const header = req.headers['x-json-data'];

  if (header) {
    const json = JSON.parse(header);
    if (json.param) {
      await callChild(json.param, res);
    }
  }
});
