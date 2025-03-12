import { sleep } from 'k6';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../support/base/baseTest.js';
import { SharedArray } from 'k6/data';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'; 
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';


export const options = testConfig.options.smoke;

const base_uri = testConfig.environment.hml.qa;
const BaseRestInst = new BaseRest(base_uri);
const BaseChecksInst = new BaseChecks();

const data = new SharedArray('Movies', function () {
    const jsonData = JSON.parse(open('../data/dynamic/movies.json'));
    return jsonData.movies;
});

export function handleSummary(data) {
    return {
        "Movies_estabilidade_delete.html": htmlReport(data),
    };
}

export function setup() {
    for (let i = 0; i < 50; i++) {
        let movieJson = randomItem(data);
        const movieRes = BaseRestInst.post(ENDPOINTS.MOVIES_ENDPOINT, movieJson);
        BaseChecksInst.checkStatusCode(movieRes, 201);
        BaseChecksInst.checkResponseNotEmpty(movieRes);
        BaseChecksInst.checkResponseSize(movieRes, 5000);
        BaseChecksInst.checkResponseTime(movieRes, 1000);
    }
}

export default () => {
    const getUsers = BaseRestInst.get(ENDPOINTS.MOVIES_ENDPOINT);  
    BaseChecksInst.checkStatusCode(getUsers, 200);

    const movies = getUsers.json();
    movies.forEach(movie => {
        const movieId = movie._id;
        const res = BaseRestInst.delete(ENDPOINTS.MOVIES_ENDPOINT + `/${movieId}`);
        BaseChecksInst.checkStatusCode(res, 200);
        console.log(`deltado com sucesso: ${movieId}`) 
        });



};
