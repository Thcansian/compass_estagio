import { sleep } from 'k6';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../support/base/baseTest.js';
import { SharedArray } from 'k6/data';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'; 
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';


export const options = testConfig.options.load;

const base_uri = testConfig.environment.hml.qa;
const BaseRestInst = new BaseRest(base_uri);
const BaseChecksInst = new BaseChecks();

const data = new SharedArray('Tickets', function () {
    const jsonData = JSON.parse(open('../../data/dynamic/tickets.json'));
    return jsonData.tickets;
});


export function handleSummary(data) {
    return {
        "Tickets_Carga_Post.html": htmlReport(data),
    };
}

export default () => {
    let ticketsJson = randomItem(data);

    const ticketRes = BaseRestInst.post(ENDPOINTS.TICKETS_ENDPOINT, ticketsJson);
    BaseChecksInst.checkStatusCode(ticketRes, 201);
    BaseChecksInst.checkResponseNotEmpty(ticketRes);
    BaseChecksInst.checkResponseSize(ticketRes, 5000); 
    BaseChecksInst.checkResponseTime(ticketRes, 1000);
};


export function teardown() {
    
    const getTickets = BaseRestInst.get(ENDPOINTS.TICKETS_ENDPOINT);  
    BaseChecksInst.checkStatusCode(getTickets, 200);

    const Ingressos = getTickets.json();
    Ingressos.forEach(Ingressos => {
        const IngressosId = Ingressos._id;
        const res = BaseRestInst.post(ENDPOINTS.TICKETS_ENDPOINT + `/${IngressosId}`);
        BaseChecksInst.checkStatusCode(res, 200);
        });
    }
