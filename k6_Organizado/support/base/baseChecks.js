import { check } from "k6";

export class BaseChecks {
    // Verifica o status code da resposta
    checkStatusCode(response, expectedStatus = 200) {
        check(response, {
            'status code check': (r) => r.status === expectedStatus,
        });
    }

    // Verifica o tamanho da resposta
    checkResponseSize(response, sizeLimit = 1000) {
        check(response, {
            'response size is within limit': (r) => r.body.length <= sizeLimit,
        });
    }

    // Verifica o tempo de resposta
    checkResponseTime(response, timeLimit = 900) {
        check(response, {
            'response time is within limit': (r) => r.timings.duration <= timeLimit,
        });
    }

    // Verifica a taxa de erro (usado em thresholds)
    static checkErrorRate(rate, rateLimit = 0.05) {
        check(rate, {
            'error rate is within limit': (r) => r <= rateLimit,
        });
    }

    // Verifica a taxa de requisições por segundo (usado em thresholds)
    static checkRequestRate(rate, rateLimit = 20) {
        check(rate, {
            'request rate is within limit': (r) => r >= rateLimit,
        });
    }
    
    checkResponseNotEmpty(response) {

        return check(response, {
            'Verificação de que a resposta não está vazia': (r) => r.body.length > 0
        });
        
    }

}