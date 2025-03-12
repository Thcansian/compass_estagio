import { sleep } from 'k6';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../support/base/baseTest.js';
import { SharedArray } from 'k6/data';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'; 
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export const options = testConfig.options.smoke;

const base_uri = testConfig.environment.hml.qa;
const BaseRestInst = new BaseRest(base_uri);
const BaseChecksInst = new BaseChecks();

const dataMovies = new SharedArray('Movies', function () {
    try {
        const jsonData = JSON.parse(open('../../data/dynamic/movies.json'));
        return jsonData.movies.slice(0, 10);
    } catch (error) {
        console.error('Erro ao carregar movies.json:', error);
        return [];
    }
});

const dataTickets = new SharedArray('Tickets', function () {
    try {
        const jsonData = JSON.parse(open('../../data/dynamic/tickets.json'));
        return jsonData.tickets.slice(0, 10);
    } catch (error) {
        console.error('Erro ao carregar tickets.json:', error);
        return [];
    }
});

export function handleSummary(data) {
    return {
        "Fluxo-completo.html": htmlReport(data),
    };
}

export default () => {
    let movieJson = randomItem(dataMovies);

    const MovieRes = BaseRestInst.post(ENDPOINTS.MOVIES_ENDPOINT, movieJson);
    BaseChecksInst.checkStatusCode(MovieRes, 201);
    console.log('criando filme');

    let ticketsJson = randomItem(dataTickets);
    
    const ticketRes = BaseRestInst.post(ENDPOINTS.TICKETS_ENDPOINT, ticketsJson);
    BaseChecksInst.checkStatusCode(ticketRes, 201);
    console.log('criando tickets');

    const getMoviesRes = BaseRestInst.get(ENDPOINTS.MOVIES_ENDPOINT);
    BaseChecksInst.checkStatusCode(getMoviesRes, 200);
    console.log('buscando filmes');

    const movies = getMoviesRes.json();
    const moviesToDelete = movies.slice(0, 2); 

    moviesToDelete.forEach(movie => {
        const movieId = movie._id;
        const res = BaseRestInst.delete(ENDPOINTS.MOVIES_ENDPOINT + `/${movieId}`);
        BaseChecksInst.checkStatusCode(res, 200);
        console.log(`filme deletado com sucesso: ${movieId}`);
    });
};


