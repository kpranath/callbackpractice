//Copy from before starting mongo. mongo wil be in original index file.


// console.log('Before');
// getUser(1, getRepositories);
// console.log('After');

// console.log('Before');
// getUser(1)
//     .then(user => getGihubRepositories(user.githubUsename))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('commits : ', commits))
//     .catch(err => console.log('Error: ', err.message));
// console.log('After');


console.log('Before');
async function displaycommits() {
    try {
        const user = await getUser(1);
        const repos = await getGihubRepositories(user.githubUsename);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (err) {
        console.log('Error', err.message);
    }
}
displaycommits();
console.log('After');



// function getRepositories(user) {
//     getGihubRepositories(user.githubUsename, getrepoCommits);
// }

// function getrepoCommits(repos) {
//     getCommits(repos[0], displaycommits);
// }

// function displaycommits(commits) {
//     console.log(commits);
// }

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from database');
            resolve({ id: id, githubUsename: 'kpranath' });
        }, 2000);
    });
}

function getGihubRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling GitHub API...');
            resolve(['repo1', 'repo2', 'repo3']);
            // reject(new Error('something rejected'));
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling GitHub API for commits...');
            resolve(['commit1', 'commit2', 'commit3']);
        }, 2000);
    });
}