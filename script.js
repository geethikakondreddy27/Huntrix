const searchBtn = document.getElementById('searchBtn');
const battleBtn = document.getElementById('battleBtn');
const displayArea = document.getElementById('displayArea');
const statusMessage = document.getElementById('statusMessage');

// Mode Toggling
document.getElementById('searchModeBtn').addEventListener('click', (e) => switchMode(e, 'search'));
document.getElementById('battleModeBtn').addEventListener('click', (e) => switchMode(e, 'battle'));

function switchMode(e, mode) {
    document.querySelectorAll('.mode-toggle button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    document.getElementById('searchSection').classList.toggle('hidden', mode !== 'search');
    document.getElementById('battleSection').classList.toggle('hidden', mode !== 'battle');
    displayArea.innerHTML = '';
}

const formatDate = (str) => new Date(str).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

// Central function to fetch full data (Profile + Repos + Star Count)
async function getFullUserData(username) {
    if (!username) return null;
    
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error(`User ${username} not found`);
    const user = await userRes.json();

    // Level 2 & 3: Fetch repos to count stars and show list
    const repoRes = await fetch(`${user.repos_url}?sort=created&per_page=100`);
    const repos = await repoRes.json();
    
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const latestRepos = repos.slice(0, 5); // Level 2 requirement

    return { ...user, totalStars, latestRepos };
}

async function runSearch() {
    const user = document.getElementById('usernameInput').value;
    statusMessage.textContent = "Searching...";
    displayArea.innerHTML = '';

    try {
        const data = await getFullUserData(user);
        displayArea.innerHTML = createCardHTML(data);
        statusMessage.textContent = "";
    } catch (err) {
        statusMessage.textContent = err.message;
    }
}

async function runBattle() {
    const u1 = document.getElementById('user1Input').value;
    const u2 = document.getElementById('user2Input').value;
    statusMessage.textContent = "Battle in progress...";
    displayArea.innerHTML = '';

    try {
        // Parallel fetching
        const [data1, data2] = await Promise.all([getFullUserData(u1), getFullUserData(u2)]);
        
        // Level 3: Logic - Compare Followers (or Stars)
       // const winner = data1.followers >= data2.followers ? data1.login : data2.login;
          
       let result = 'draw'; 
        if (data1.public_repos > data2.public_repos) {
            result = 'user1';
        } else if (data2.public_repos > data1.public_repos) {
            result = 'user2';
        }

        displayArea.innerHTML = `
            ${createCardHTML(data1, result === 'user1', result === 'user2', result === 'draw')}
            ${createCardHTML(data2, result === 'user2', result === 'user1', result === 'draw')}
             `;

        statusMessage.textContent = "";
    } catch (err) {
        statusMessage.textContent = "Error: Ensure both usernames are correct.";
    }
}

//function createCardHTML(user, isWinner = false, isLoser = false) {
function createCardHTML(user, isWinner = false, isLoser = false, isDraw = false) {
    // Determine which CSS class to use
    let statusClass = '';
    if (isWinner) statusClass = 'winner';
    if (isLoser) statusClass = 'loser';
    if (isDraw) statusClass = 'draw';

    // Determine which badge to show
    let badgeHTML = '';
    if (isWinner) badgeHTML = '<span class="badge">WINNER</span>';
    if (isDraw) badgeHTML = '<span class="badge" style="background: #007bff;">DRAW</span>';

    const reposHTML = user.latestRepos.map(r => 
        `<li><a href="${r.html_url}" target="_blank">${r.name}</a></li>`
    ).join('');

    return `
        <div class="card ${statusClass}">
            ${badgeHTML}
            <img src="${user.avatar_url}" alt="Avatar">
            <h2>${user.name || user.login}</h2>
            <p class="bio">${user.bio || 'No bio available'}</p>
            <div class="stats">
                <p>Public Repos: <strong>${user.public_repos}</strong></p>
                <p>Followers: <strong>${user.followers}</strong></p>
                <p>Total Stars: <strong>${user.totalStars}</strong></p>
                <p>Joined: ${formatDate(user.created_at)}</p> 
                
            </div>
           <a href="${user.blog || user.html_url}" target="_blank" class="port-link">
    ${user.blog ? 'View Portfolio' : 'GitHub Profile'}
</a>
            <hr>
            <h4>Latest Repos</h4>
            <ul>${reposHTML}</ul>
        </div>
    `;
}


function switchMode(e, mode) {
    // 1. Reset buttons
    document.querySelectorAll('.mode-toggle button')
        .forEach(btn => btn.classList.remove('active'));

    // 2. Activate clicked button
    e.target.classList.add('active');

    // 3. Show / Hide sections
    const searchRow = document.getElementById('searchSection');
    const battleRow = document.getElementById('battleSection');

    if (mode === 'search') {
        searchRow.classList.remove('hidden');
        battleRow.classList.add('hidden');
    } else {
        searchRow.classList.add('hidden');
        battleRow.classList.remove('hidden');
    }

    // 4. Clear previous results
    displayArea.innerHTML = '';

    // 🔥 5. SWITCH BACKGROUND MODE (THIS IS YOUR MAGIC)
    if (mode === 'search') {
        document.body.classList.add("search-mode");
        document.body.classList.remove("battle-mode");
    } else {
        document.body.classList.add("battle-mode");
        document.body.classList.remove("search-mode");
    }
}



searchBtn.addEventListener('click', runSearch);
battleBtn.addEventListener('click', runBattle);
document.body.classList.add("search-mode");
