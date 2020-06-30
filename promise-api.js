// const p = Promise.resolve({ id: 1 });
// p.then(result => console.log(result));

// const p = Promise.reject(new Error('reason for error...'));
// p.catch(error => console.log(error));

const p1 = new Promise((resolve, reject) => {
    console.log("triggering 1");
    setTimeout(() => {
        console.log("Async operation 1...");
        resolve(1);
        // reject(new Error('because something rejected'));
    }, 2000);
});

const p2 = new Promise((resolve) => {
    console.log("triggering 2");
    setTimeout(() => {
        console.log("Async operation 2...");
        resolve(2);
    }, 2000);
});

// Promise.all([p1, p2])
//     .then(result => console.log('result', result))
//     .catch(error => console.log('Error', error.message));
Promise.race([p1, p2])
    .then(result => console.log('result', result))
    .catch(error => console.log('Error', error.message));