import { sleep } from 'k6';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../support/base/baseTest.js';
import { SharedArray } from 'k6/data';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'; 
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';


export const options = testConfig.options.soak;

const base_uri = testConfig.environment.hml.qa;
const BaseRestInst = new BaseRest(base_uri);
const BaseChecksInst = new BaseChecks();


export function handleSummary(data) {
    return {
        "Tickets_estabilidade_get.html": htmlReport(data),
    };
}

export default () => {

    const ticketRes = BaseRestInst.get(ENDPOINTS.TICKETS_ENDPOINT);
    BaseChecksInst.checkStatusCode(ticketRes, 200);
    BaseChecksInst.checkResponseNotEmpty(ticketRes);
    BaseChecksInst.checkResponseSize(ticketRes, 5000); 
    BaseChecksInst.checkResponseTime(ticketRes, 1000);
};
