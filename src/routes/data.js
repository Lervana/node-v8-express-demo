const { FilesStorage } = require('../files/files-storage');
const CODES = require('../enums/codes');
const { log } = require('../logger');

const localFileStorage = new FilesStorage();

exports.put = (req, res) => {
  try {
    const fileName = req.params.id;
    if (localFileStorage.hasFileSync(fileName)) throw `File ${fileName} exist in storage`;
    localFileStorage.addFileSync(fileName, req.body);
    res.status(CODES.SUCCESS);
    res.json({ ok: true });
  } catch (e) {
    res.status(CODES.SUCCESS);
    res.json({ error: true });
    log.error(e);
  }
};
