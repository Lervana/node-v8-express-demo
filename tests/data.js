const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');

const Server = require('../src/server');
const dataRoutes = require('../src/routes/data');

chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.should();

const PORT = 6000;
const SUCCESS_RESPONSE = { ok: true };
const ERROR_RESPONSE = { error: true };
const expect = chai.expect;

const routes = [
  { method: 'PUT', path: '/data/:id', cbs: dataRoutes.put },
  { method: 'GET', path: '/data/:id', cbs: dataRoutes.get },
  { method: 'DELETE', path: '/data/:id', cbs: dataRoutes.delete },
];

let server;
let instance;

const fileContent = {
  a: 1,
  b: '2',
};

describe('Data endpoint tests', () => {
  before(() => {
    server = new Server();
    server.addRoutesSync(routes);

    return new Promise(resolve => {
      instance = server.instance.listen(PORT, () => resolve());
    });
  });

  after(() => instance && instance.close());

  describe('GET', () => {
    it('Should return 404 when file not found', done => {
      chai
        .request(instance)
        .get('/data/test-id.txt')
        .end((err, res) => {
          expect(res.status).eq(404);
          done();
        });
    });

    it('Should return 200 and file content when file found', done => {
      const id = 'test-x,json';
      const content = { a: 1, b: 2, c: 3 };
      dataRoutes.localFileStorage.addFileSync(id, content);

      chai
        .request(instance)
        .get('/data/' + id)
        .end((err, res) => {
          expect(res.status).eq(200);
          expect(res.body).deep.eq(content);
          done();
        });
    });
  });

  describe('PUT', () => {
    it('Should return 200 when file can be added', done => {
      chai
        .request(instance)
        .put('/data/test-id.txt')
        .send(fileContent)
        .end((err, res) => {
          expect(res.status).eq(200);
          expect(res.body).deep.eq(SUCCESS_RESPONSE);
          done();
        });
    });

    it('Should return 400 when file with the same name exists in memory', done => {
      chai
        .request(instance)
        .put('/data/test-id.txt')
        .send(fileContent)
        .end((err, res) => {
          expect(res.status).eq(400);
          expect(res.body).deep.eq(ERROR_RESPONSE);
          done();
        });
    });
  });

  describe('DELETE', () => {
    it('Should return 404 when file not found', done => {
      chai
        .request(instance)
        .del('/data/test-id-xyz.txt')
        .send(fileContent)
        .end((err, res) => {
          expect(res.status).eq(404);
          expect(res.body).deep.eq('');
          done();
        });
    });

    it('Should remove file when it is found', done => {
      chai
        .request(instance)
        .del('/data/test-id.txt')
        .send(fileContent)
        .end((err, res) => {
          expect(res.status).eq(200);
          expect(res.body).deep.eq(SUCCESS_RESPONSE);

          chai
            .request(instance)
            .get('/data/test-id.txt')
            .send(fileContent)
            .end((err, res) => {
              expect(res.status).eq(404);
              done();
            });
        });
    });
  });
});
