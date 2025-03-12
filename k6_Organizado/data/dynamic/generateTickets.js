import { faker } from '@faker-js/faker';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const generateTickets = (count = 100) => {
  const tickets = [];
  for (let i = 0; i < count; i++) {
    tickets.push({
      movieId: faker.string.uuid(),      
      userId: faker.string.uuid(),       
      seatNumber: faker.number.int(60),  
      price: faker.number.float({ min: 10, max: 50, precision: 0.01 }), 
      showtime: faker.date.soon({ days: 60 }).toISOString(), 
    });
  }
  return { tickets };
};


const filePath = resolve('../dynamic/tickets.json');

const ticketData = generateTickets(250); // Gera 250 tickets
writeFileSync(filePath, JSON.stringify(ticketData, null, 2));

