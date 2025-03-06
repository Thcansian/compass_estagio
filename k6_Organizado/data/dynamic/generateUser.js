import faker from "https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js";

export function generateUser() {
  return {
    nome: 'testes',
    email: `test_${Date.now()}` + faker.internet.email({ provider: 'qa.com' }),
    password: 'teste',
    administrador: 'true'
  };
}
