const { faker } = require('./lib/node_modules/@faker-js/faker/dist/locale/pt_BR');
const fs =  require('fs');

const quantidade = process.argv[2] || 1;  // O código verifica se foi passado um argumento de linha de comando (process.argv[2]) para definir a quantidade de filmes a serem gerados. Se nenhum argumento for fornecido, ele assume o valor 1 (gera apenas um filme).

// usar na linha de comando: node generateMovies.js 1000

const movies = [];

for(let i = 0; i < quantidade; i++) {
  const movie = {
    
    title: faker.lorem.words(3), 
    description: faker.lorem.paragraph(), 
    launchdate: faker.date.soon({ days: 60 }), //faker.date.past(20, new Date()), 
    showtimes: [faker.date.soon({ days: 60 }) + faker.date.soon({ days: 60 }) ], 
    
  }
  movies.push(movie)
}

const data = {
  movies: movies
}

fs.writeFileSync( 'movies.json', JSON.stringify(data, null, 2), error => {
  if(error) {
    console.error(error)
  }
})
