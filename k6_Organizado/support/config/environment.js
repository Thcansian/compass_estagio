export const testConfig = {
    // Configurações de Ambiente
    environment: {
        hml: {
            qa: "http://localhost:3000"
        },
        dev: {
            url: "http://localhost:3333"
        }
    },

   
    options: {
        // Smoke Test (Teste de Fumaça)
        smoke: {
            vus: 1,
            duration: '10s',
            thresholds: {
                http_req_duration: ['avg<900', 'p(95)<1000'], 
                http_req_failed: ['rate<0.05'], 
                http_reqs: ['count>=20'] 
            }
        },

        // Load Test
        load: {
            vus: 50, 
            thresholds: {
                http_req_duration: ['avg<900', 'p(95)<1000'], 
                http_req_failed: ['rate<0.05'], 
                http_reqs: ['count>=20'] 
            },
            stages: [
                { duration: '30s', target: 30 }, 
                { duration: '1m', target: 50 }, 
                { duration: '30s', target: 0 } 
            ]
        },

        // Stress Test 
        stress: {
            vus: 50, 
            thresholds: {
                http_req_duration: ['avg<1000', 'p(95)<1200'], 
                http_req_failed: ['rate<0.05'], 
                http_reqs: ['count>=20']
            },
            stages: [
                { duration: '10s', target: 30 },
                { duration: '20s', target: 50 },
                { duration: '10s', target: 0 }, 
            ]
        },

        // Soak Test (Alta Sazonalidade)
        soak: {
            vus: 50, 
            thresholds: {
                http_req_duration: ['avg<900', 'p(95)<1000'], 
                http_req_failed: ['rate<0.05'], 
                http_reqs: ['count>=20'] 
            },
            stages: [
                { duration: '5m', target: 30 }, 
                { duration: '10m', target: 50 },
                { duration: '5m', target: 0 } 
            ]
        },

        // Teste de Pico 
        spike: {
            vus: 100, 
            thresholds: {
                http_req_duration: ['avg<1000', 'p(95)<1200'], 
                http_req_failed: ['rate<0.05'], 
                http_reqs: ['count>=20'] 
            },
            stages: [
                { duration: '10s', target: 100 }, 
                { duration: '10s', target: 100 }, 
                { duration: '10s', target: 0 } 
            ]
        }
    }
};