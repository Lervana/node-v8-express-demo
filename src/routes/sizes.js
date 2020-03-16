const fetch = require('node-fetch');

const { URLS, getApiUrl } = require('../urls');
const { wrapJsonRoute } = require('../wrappers/route-wrapper');

const getFileSize = async name => {
  const response = await fetch(getApiUrl(URLS.SIZE + `?name=${name}`));

  if (response.status === 200) {
    const { size } = await response.json();
    return { name, size };
  }

  return { name, size: 'error' };
};

exports.get = wrapJsonRoute(async () => {
  const response = await fetch(getApiUrl(URLS.FILENAMES));

  if (response.status === 200) {
    const fileNames = await response.json();
    if (!fileNames || fileNames.length === 0) return [];

    const promises = [];
    fileNames.forEach(({ name }) => promises.push(getFileSize(name)));
    return await Promise.all(promises);
  } else throw 'Cannot get file names';
});
