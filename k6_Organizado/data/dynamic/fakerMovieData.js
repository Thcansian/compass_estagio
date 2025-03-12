import faker from "https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js";

export const fakerMovieData = () => ({
  title: faker.lorem.words(3),
  description: faker.lorem.sentence(),
  launchdate: faker.date.future().toISOString(),
  showtimes: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.date.soon().toISOString()),
});
