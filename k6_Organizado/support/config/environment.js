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
        
        smoke: {
            vus: 2,
            duration: '10s',
            teardownTimeout: '120s',
            thresholds: {
                http_req_duration: ['p(95)<1000'],
                http_req_failed: ['rate<0.01'],
                checks: ['rate>0.95']
                
            },

        },

        // Load Test
        load: {
            vus: 50, 
            teardownTimeout: '120s',
            thresholds: {
                http_req_duration: ['p(95)<1000'],
                http_req_failed: ['rate<0.01'],
                checks: ['rate>0.95']
                
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
            setupTimeout: '4000s',
            teardownTimeout: '4000s',
            thresholds: {
                http_req_duration: ['p(95)<1000'],
                http_req_failed: ['rate<0.01'],
                checks: ['rate>0.95']
                
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
            setupTimeout: '4000s',
            teardownTimeout: '4000s',
                thresholds: {
                    http_req_duration: ['p(95)<1000'],
                    http_req_failed: ['rate<0.01'],
                    checks: ['rate>0.95']
                    
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
            setupTimeout: '4000s',
            teardownTimeout: '4000s',
            thresholds: {
                http_req_duration: ['p(95)<1000'],
                http_req_failed: ['rate<0.01'],
                checks: ['rate>0.95']
                
            },

            stages: [
                { duration: '10s', target: 100 }, 
                { duration: '10s', target: 100 }, 
                { duration: '10s', target: 0 } 
            ]
        }
    }
};