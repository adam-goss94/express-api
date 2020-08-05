const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concerts = require('../../../models/concerts.models');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /concerts/day/:day', () => {
  before(async () => {
    const firstPerformer = new Concerts({ performer: 'Metallica', genre: 'Metal', price: 200, day: 1, image: 'LoremIpsum.jpg' });
    await firstPerformer.save();

    const secondPerformer = new Concerts({ performer: 'AC/DC', genre: 'Rock', price: 100, day: 2, image: 'LoremIpsum.jpg' });
    await secondPerformer.save();

    const thirdPerformer = new Concerts({ performer: 'Zenek', genre: 'Disco', price: 45, day: 1, image: 'LoremIpsum.jpg' });
    await thirdPerformer.save();
  });

  it('should return performers by day ', async () => {
    const performer = await request(server).get('/concerts/day/1');
    expect(performer.status).to.be.equal(200);
    expect(performer.body).to.be.an('array');
    expect(performer.body.length).to.be.equal(2);
  });

  after (async () => {
    await Concerts.deleteMany();
  });
});