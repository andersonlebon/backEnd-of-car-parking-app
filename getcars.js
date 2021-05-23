const cars = [
  {
    _id: 1,
    driver: "Caleb",
    email: "buyananderson@gmail.com",
    type: "MERCEDENZ",
    phoneNumber: "+250785213173",
    plaque: "ABCD20198739",
  },
  {
    _id: 2,
    driver: "ornella",
    email: "buyananderson@gmail.com",
    type: "MERCEDENZ",
    phoneNumber: "+250785213173",
    plaque: "ABCD20198739",
  },
  {
    _id: 3,
    driver: "Caleb",
    email: "buyananderson@gmail.com",
    type: "MERCEDENZ",
    phoneNumber: "+250785213173",
    plaque: "ABCD20198739",
  },
  {
    _id: 4,
    driver: "prisca",
    email: "buyananderson@gmail.com",
    type: "MERCEDENZ",
    phoneNumber: "+250785213173",
    plaque: "ABCD20198739",
  },
  {
    _id: 5,
    driver: "bbaleb",
    email: "buyananderson@gmail.com",
    type: "MERCEDENZ",
    phoneNumber: "+250785213173",
    plaque: "ABCD20198739",
  },
  {
    _id: 6,
    driver: "Caleb",
    email: "buyananderson@gmail.com",
    type: "MERCEDENZ",
    phoneNumber: "+250785213173",
    plaque: "ABCD20198739",
  },
  {
    _id: 7,
    driver: "zaleb",
    email: "buyananderson@gmail.com",
    type: "MERCEDENZ",
    phoneNumber: "+250785213173",
    plaque: "ABCD20198739",
  },
];

function getCars() {
  return cars;
}

function findAcar(cars, _id) {
  return cars.find((car) => car._id === parseInt(_id));
}
module.exports = {
  findAcar: findAcar,
  getCars: getCars,
};
