const path = require('path');

const asyncForEach = require('../helpers/async-forEach');
const handleError = require('../helpers/error-handler');
const fm = require('../files/files-manager');
const FILES = require('../enums/files');
const CODES = require('../enums/codes');

const namesDirPath = path.resolve(FILES.LINKED.NAMES);
const valuesDirPath = path.resolve(FILES.LINKED.VALUES);

//Helpers
const getNameFilePath = name => path.join(namesDirPath, name);
const getValueFilePath = id => path.join(valuesDirPath, id + '.txt');
const nameTrim = name =>
  name
    .split('.')
    .slice(0, -1)
    .join('');
const getId = content => Number(content.toString().trim());
const valueTrim = value => value.toString().trim();

//GET - callbacks
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

//GET - promises
const getResponse = (name, res) =>
  fm.fs
    .readFileAsync(getNameFilePath(name))
    .then(content => {
      const id = getId(content);
      return fm.fs
        .readFileAsync(getValueFilePath(id))
        .then(value => ({ name: nameTrim(name), id, value: valueTrim(value) }))
        .catch(err => handleError(err, res, true));
    })
    .catch(err => handleError(err, res, true));

exports.getPromise = (req, res) => {
  return fm.fs
    .readdirAsync(namesDirPath)
    .then(fileNames => {
      const promises = fileNames.map(name => getResponse(name, res));
      return Promise.all(promises).then(response => {
        res.status(CODES.SUCCESS);
        res.json(response);
      });
    })
    .catch(err => handleError(err, res, true));
};

//GET - async/await
exports.getAwait = async (req, res) => {
  try {
    const response = [];
    const fileNames = await fm.fs.readdirAsync(namesDirPath);

    await asyncForEach(fileNames, async name => {
      const content = await fm.fs.readFileAsync(getNameFilePath(name));
      const id = getId(content);
      const value = await fm.fs.readFileAsync(getValueFilePath(id));
      response.push({ name: nameTrim(name), id, value: valueTrim(value) });
    });

    res.status(CODES.SUCCESS);
    res.json(response);
  } catch (err) {
    handleError(err, res, true);
  }
};
