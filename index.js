console.log('Before');
getUser(1, getRepositories);
console.log('After');

function getRepositories(user) {
    getGihubRepositories(user.githubUsename, getrepoCommits);
}

function getrepoCommits(repos) {
    getCommits(repos[0], displaycommits);
}

function displaycommits(commits) {
    console.log(commits);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from database');
        callback({ id: id, githubUsename: 'kpranath' });
    }, 2000);
}

function getGihubRepositories(username, callback) {
    setTimeout(() => {
        console.log('calling GitHub API...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log('calling GitHub API for commits...');
        callback(['commit1', 'commit2', 'commit3']);
    }, 2000);
}