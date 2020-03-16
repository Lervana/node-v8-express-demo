const path = require('path');

const handleError = require('../helpers/error-handler');
const fm = require('../files/files-manager');
const FILES = require('../enums/files');
const CODES = require('../enums/codes');

const namesDirPath = path.resolve(FILES.LINKED.NAMES);
const valuesDirPath = path.resolve(FILES.LINKED.VALUES);

//Helpers
const readFileContent = (path, res, cb) => {
  fm.fs.readFile(path, (err, content) => {
    if (err) handleError(err, res, true);
    else cb(content);
  });
};

const readFileNames = (res, cb) => {
  fm.fs.readdir(namesDirPath, (err, names) => {
    if (err) handleError(err, res, true);
    else cb(names);
  });
};

const getNameFilePath = name => path.join(namesDirPath, name);
const getValueFilePath = id => path.join(valuesDirPath, id + '.txt');
const nameTrim = name =>
  name
    .split('.')
    .slice(0, -1)
    .join('');
const getId = content => Number(content.toString().trim());
const valueTrim = value => value.toString().trim();

//Endpoints
exports.get = (req, res) => {
  (cb => {
    const response = [];

    readFileNames(res, filenames => {
      filenames.forEach(name => {
        readFileContent(getNameFilePath(name), res, content => {
          const id = getId(content);

          readFileContent(getValueFilePath(id), res, value => {
            response.push({ name: nameTrim(name), id, value: valueTrim(value) });
            if (response.length === filenames.length) cb(response);
          });
        });
      });
    });
  })(response => {
    res.status(CODES.SUCCESS);
    res.json(response);
  });
};
