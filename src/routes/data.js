const { FilesStorage } = require('../files/files-storage');
const CODES = require('../enums/codes');
const { log } = require('../logger');

const localFileStorage = new FilesStorage();
exports.localFileStorage = localFileStorage;

exports.get = (req, res) => {
  try {
    const fileName = req.params.id;
    const hasFile = localFileStorage.hasFileSync(fileName);

    if (!hasFile) {
      res.status(CODES.NOT_FOUND);
      res.json();
    } else {
      res.status(CODES.SUCCESS);
      res.json(localFileStorage.getFileSync(fileName));
    }
  } catch (e) {
    res.status(CODES.BAD_REQUEST);
    res.json({ error: true });
    log.error(e);
  }
};

exports.put = (req, res) => {
  try {
    const fileName = req.params.id;
    if (localFileStorage.hasFileSync(fileName)) throw `File ${fileName} exist in storage`;
    localFileStorage.addFileSync(fileName, req.body);
    res.status(CODES.SUCCESS);
    res.json({ ok: true });
  } catch (e) {
    res.status(CODES.BAD_REQUEST);
    res.json({ error: true });
    log.error(e);
  }
};

exports.delete = (req, res) => {
  try {
    const fileName = req.params.id;
    const hasFile = localFileStorage.hasFileSync(fileName);

    if (!hasFile) {
      res.status(CODES.NOT_FOUND);
      res.json();
    } else {
      localFileStorage.removeFileSync(fileName);
      res.status(CODES.SUCCESS);
      res.json({ ok: true });
    }
  } catch (e) {
    res.status(CODES.BAD_REQUEST);
    res.json({ error: true });
    log.error(e);
  }
};
