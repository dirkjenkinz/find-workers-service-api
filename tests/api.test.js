const { expect, test } = require('@jest/globals');
const axios = require('axios');
const { findWorkersByLocation } = require('../app/api')

const workerList = [{
  workerId: 0,
  name: 'Jimmy Jewel',
  location: {
    latitude: 3.3627422,
    longitude: 2.1234567,
  },
  home: 'Swindon'
}, {
  workerId: 0,
  name: 'Sweeney Todd',
  location: {
    latitude: 3.0274563,
    longitude: 2.4658129,
  },
  home: 'Swindon'
}];

jest.mock('axios');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Get worker', () => {
  test('it should call axios', async () => {
    axios.get.mockResolvedValueOnce(workerList);
    await findWorkersByLocation({ 'latitude': 6, 'longitude': 1 });
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/v1/workers/6, 1');
  });
});
