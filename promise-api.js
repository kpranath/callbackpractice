// const p = Promise.resolve({ id: 1 });
// p.then(result => console.log(result));

const p = Promise.reject(new Error('reason for error...'));
p.catch(error => console.log(error));