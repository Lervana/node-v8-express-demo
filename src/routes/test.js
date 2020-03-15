const testGet = (req, res) => res.send({ test: { ok: true } });

exports.get = testGet;
