import faker from "https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js";

export const fakerProductData = () => ({
 
  nome: new Date().getTime() + ' ' + faker.commerce.productName(), 
  preco: faker.commerce.price(1, 1000),
  descricao: faker.commerce.productName(),
  quantidade: 9999999999,//faker.random.number({ min: 1, max: 1000 })
  
});