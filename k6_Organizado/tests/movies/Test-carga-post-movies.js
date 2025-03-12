import { sleep } from 'k6';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../support/base/baseTest.js';
import { SharedArray } from 'k6/data';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'; 
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';


export const options = testConfig.options.load;

const base_uri = testConfig.environment.hml.qa;
const BaseRestInst = new BaseRest(base_uri);
const BaseChecksInst = new BaseChecks();

const data = new SharedArray('Movies', function () {
    const jsonData = JSON.parse(open('../data/dynamic/movies.json'));
    return jsonData.movies;
});

export function handleSummary(data) {
    return {
        "Movies_Carga_Post.html": htmlReport(data),
    };
}

export default () => {
    let movieJson = randomItem(data);

    const MovieRes = BaseRestInst.post(ENDPOINTS.MOVIES_ENDPOINT, movieJson);
    BaseChecksInst.checkStatusCode(MovieRes, 201);
    BaseChecksInst.checkResponseNotEmpty(MovieRes);
    BaseChecksInst.checkResponseSize(MovieRes, 5000); 
    BaseChecksInst.checkResponseTime(MovieRes, 1000);
};


export function teardown() {
    
    const getUsers = BaseRestInst.get(ENDPOINTS.MOVIES_ENDPOINT);  
    BaseChecksInst.checkStatusCode(getUsers, 200);

    const movies = getUsers.json();
    movies.forEach(movie => {
        const movieId = movie._id;
        const res = BaseRestInst.post(ENDPOINTS.MOVIES_ENDPOINT + `/${movieId}`);
        BaseChecksInst.checkStatusCode(res, 200);
        });
    }
