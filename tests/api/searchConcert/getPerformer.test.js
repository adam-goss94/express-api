const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concerts = require('../../../models/concerts.models');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /concerts/performer/:performer', () => {
  before(async () => {
    const firstPerformer = new Concerts({ performer: 'Metallica', genre: 'Metal', price: 200, day: 1, image: 'LoremIpsum.jpg' });
    await firstPerformer.save();

    const secondPerformer = new Concerts({ performer: 'AC/DC', genre: 'Rock', price: 100, day: 2, image: 'LoremIpsum.jpg' });
    await secondPerformer.save();

    const thirdPerformer = new Concerts({ performer: 'Zenek', genre: 'Disco', price: 45, day: 1, image: 'LoremIpsum.jpg' });
    await thirdPerformer.save();
  });

  it('should return one performer by name ', async () => {
    const performer = await request(server).get('/concerts/performer/Metallica');
    expect(performer.status).to.be.equal(200);
    expect(performer.body).to.be.an('object');
    expect(performer.body).to.not.be.null;
  });

  after (async () => {
    await Concerts.deleteMany();
  });
});