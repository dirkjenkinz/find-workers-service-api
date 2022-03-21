const { expect, test } = require('@jest/globals');
const { getWorker, getAllWorkers, postWorker, updateWorker, findWorkerByHome } = require('../app/api');
const axios = require('axios');
const workerDetails = '{\"workerId\":0,\"name\":\"name\",\"location\":{\"latitude\":6.0274563,\"longitude\":1.4658129},\"home\":\"home\"}';
const worker = {
    "workerId": 21882100,
    "name": "Dirk Jenkinz",
    "location": {
        "latitude": 6.0274563,
        "longitude": 1.4658129
    },
    "home": "Midwich"
};
const workerList = [{
    "workerId": 0,
    "name": "Jimmy Jewel",
    "location": {
        "latitude": 3.3627422,
        "longitude": 2.1234567
    },
    "home": "Swindon"
}, {
    "workerId": 0,
    "name": "Sweeney Todd",
    "location": {
        "latitude": 3.0274563,
        "longitude": 2.4658129
    },
    "home": "Swindon"
}];

jest.mock('axios');

afterEach(() => {
    jest.clearAllMocks();
  });

describe("Get worker", () => {
    test("it should call axios", async () => {
        axios.get.mockResolvedValueOnce(workerDetails);
        const response = await getWorker(21882000);
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/v1/workers/21882000');
    });
    test("it should return meaningful data", async () => {
        axios.get.mockResolvedValueOnce(workerDetails);
        const response = await getWorker(21882000);
        expect(response).toEqual(workerDetails);
    });
    test("it should return 400 code", async () => {
        axios.get.mockResolvedValueOnce('ResponsePayload { code: 400, payload: undefined }');
        const response = await getWorker(218820099); // get invalid ID
        expect(response).toEqual('ResponsePayload { code: 400, payload: undefined }', worker);
    });
    test("it should return 404 code", async () => {
        axios.get.mockResolvedValueOnce('ResponsePayload { code: 404, payload: undefined }');
        const response = await getWorker(21882001); // non-existent but valid ID
        expect(response).toEqual('ResponsePayload { code: 404, payload: undefined }', worker);
    });
});

describe("Get all workers", () => {
    test("it should call axios", async () => {
        axios.get.mockResolvedValueOnce(workerList);
        const response = await getAllWorkers();
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/v1/workers');
    });
    test("it should return meaningful data", async () => {
        axios.get.mockResolvedValueOnce(workerList);
        const response = await getAllWorkers();
        expect(response).toEqual(workerList);
    });
});

describe("Add a new worker", () => {
    test("it should call axios", async () => {
        axios.post.mockResolvedValueOnce(worker);
        const response = await postWorker(21882100, 'Dirk Jenkinz', [1.4658129, 6.0274563], 'Midwich');
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/v1/workers', worker);
    });
    test("it should return meaningful data", async () => {
        axios.post.mockResolvedValueOnce(worker);
        const response = await postWorker(21882100, 'Dirk Jenkinz', [1.4658129, 6.0274563], 'Midwich');
        expect(response).toEqual(worker);
    });
    test("it should return 404 code", async () => {
        axios.post.mockResolvedValueOnce('ResponsePayload { code: 404, payload: undefined }');
        const response = await postWorker(78112351, 'Lord Snooty', [1.4658129, 6.0274563], 'Midwich');
        expect(response).toEqual('ResponsePayload { code: 404, payload: undefined }');
    });
});

describe("Update worker", () => {
    test("it should call axios", async () => {
        axios.put.mockResolvedValueOnce(worker);
        const response = await updateWorker(21882100, 'Dirk Jenkinz', [1.4658129, 6.0274563], 'Midwich');
        expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/v1/workers', worker);
    });
    test("it should return meaningful data", async () => {
        axios.put.mockResolvedValueOnce(worker);
        const response = await updateWorker(21882100, 'Dirk Jenkinz', [1.4658129, 6.0274563], 'Midwich');
        expect(response).toEqual(worker);
    });
    test("it should return 404 code", async () => {
        axios.put.mockResolvedValueOnce('ResponsePayload { code: 404, payload: undefined }');
        const response = await updateWorker(78112351, 'Lord Snooty', [1.4658129, 6.0274563], 'Midwich');
        expect(response).toEqual('ResponsePayload { code: 404, payload: undefined }');
    });
});

describe("Find worker by home", () => {
    test("it should call axios", async () => {
        axios.get.mockResolvedValueOnce(workerList);
        const response = await findWorkerByHome('home');
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/v1/workers/findByHome/home');
    });
    test("it should return meaningful data", async () => {
        axios.get.mockResolvedValueOnce(workerList);
        const response = await findWorkerByHome('home');
        expect(response).toEqual(workerList);
    });
    test("it should return 400 if home value is invalid", async () => {
        axios.get.mockResolvedValueOnce({ code: 400, payload: undefined });
        const response = await findWorkerByHome('');
        expect(response).toEqual({ code: 400, payload: undefined });
    });
});
