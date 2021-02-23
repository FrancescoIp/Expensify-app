//
// --- OBJECT DESTRUCTURING
//

const person = {
  nome: 'Francesco',
  age: 28,
  location: {
    city: 'Chester',
    temp: 17
  }
};

const { nome: firstName = 'Anonymous', age } = person;

// const nome = person.nome;
// const age = person.age;

console.log(`${firstName} is ${age}.`)

const { city, temp: temperature } = person.location

if(city && temperature) {
  console.log(`It's ${temperature} in ${city}.`)
}

// const book = {
//   title: 'Ego is the enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     nome: 'Penguin'
//   }
// };

// const { nome:publiscerName = 'Self-Published'} = book.publisher

// console.log(publiscerName); //default Self-Pubhished

//
// ---- ARRAY DESTRUCTURING 
//

// const address = ['1299 S juniper Street', 'Chester', 'United Kingdom', 'CH4 7BP'];

// const [, city, state = 'Madrid'] = address;

// console.log(`you are in ${street} ${city}`)

const item = ['Coffe (hot)', '2.00', '2.50', '2.75'];

const [itemToSell, , midiumPrice] = item

console.log(`A ${itemToSell} costs ${midiumPrice}`)