const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: 'fra',
      age: 28
    });
    // reject('Something went dada');
  }, 5000);
});
console.log('prima')

promise.then((data) => {
  console.log('1', data)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('other promise');
    }, 5000);
  });
}).then((str) => {
  console.log('does this run?', str)
}).catch((error) => {
  console.log('error', error)
});

console.log('dopo')