/* ================================================
   BEARS COMEBACK ANALYTICS - app.js
   Chart.js visualizations + interactivity
   ================================================ */

// Register datalabels plugin
Chart.register(ChartDataLabels);

// Global Chart.js defaults
Chart.defaults.color = '#A0A09B';
Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
Chart.defaults.font.family = "'DM Sans', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.pointStyle = 'circle';
Chart.defaults.plugins.datalabels.display = false; // off by default

const ORANGE = '#C83803';
const ORANGE_LIGHT = '#E54B1A';
const ORANGE_BG = 'rgba(200,56,3,0.2)';
const NAVY = '#0B162A';
const NAVY_LIGHT = '#122040';
const WHITE = '#F5F5F0';
const GREEN = '#2ECC71';
const RED = '#E74C3C';
const GRAY = '#707068';
const GRAY_LIGHT = '#A0A09B';
const BLUE_ACCENT = '#3498DB';

// ========== DATA ==========

const gameLog = [
    { wk: '1', date: 'Sep 8', opp: 'Minnesota Vikings', loc: 'Home', result: 'L', score: '24-27', type: 'Non-Comeback', comeback: false, bearsScore: 24, oppScore: 27 },
    { wk: '2', date: 'Sep 14', opp: 'Detroit Lions', loc: 'Away', result: 'L', score: '21-52', type: 'Non-Comeback', comeback: false, bearsScore: 21, oppScore: 52 },
    { wk: '3', date: 'Sep 21', opp: 'Dallas Cowboys', loc: 'Home', result: 'W', score: '31-14', type: 'Wire-to-Wire Win', comeback: false, bearsScore: 31, oppScore: 14 },
    { wk: '4', date: 'Sep 28', opp: 'Las Vegas Raiders', loc: 'Away', result: 'W', score: '25-24', type: 'COMEBACK', comeback: true, bearsScore: 25, oppScore: 24 },
    { wk: '6', date: 'Oct 13', opp: 'Washington Commanders', loc: 'Away', result: 'W', score: '25-24', type: 'COMEBACK', comeback: true, bearsScore: 25, oppScore: 24 },
    { wk: '7', date: 'Oct 19', opp: 'New Orleans Saints', loc: 'Home', result: 'W', score: '26-14', type: 'Wire-to-Wire Win', comeback: false, bearsScore: 26, oppScore: 14 },
    { wk: '8', date: 'Oct 26', opp: 'Baltimore Ravens', loc: 'Away', result: 'L', score: '16-30', type: 'Non-Comeback', comeback: false, bearsScore: 16, oppScore: 30 },
    { wk: '9', date: 'Nov 2', opp: 'Cincinnati Bengals', loc: 'Away', result: 'W', score: '47-42', type: 'COMEBACK', comeback: true, bearsScore: 47, oppScore: 42 },
    { wk: '10', date: 'Nov 9', opp: 'New York Giants', loc: 'Home', result: 'W', score: '24-20', type: 'COMEBACK', comeback: true, bearsScore: 24, oppScore: 20 },
    { wk: '11', date: 'Nov 16', opp: 'Minnesota Vikings', loc: 'Away', result: 'W', score: '19-17', type: 'COMEBACK', comeback: true, bearsScore: 19, oppScore: 17 },
    { wk: '12', date: 'Nov 23', opp: 'Pittsburgh Steelers', loc: 'Home', result: 'W', score: '31-28', type: 'Close Win', comeback: false, bearsScore: 31, oppScore: 28 },
    { wk: '13', date: 'Nov 28', opp: 'Philadelphia Eagles', loc: 'Away', result: 'W', score: '24-15', type: 'Dominant Win', comeback: false, bearsScore: 24, oppScore: 15 },
    { wk: '14', date: 'Dec 7', opp: 'Green Bay Packers', loc: 'Away', result: 'L', score: '21-28', type: 'Non-Comeback', comeback: false, bearsScore: 21, oppScore: 28 },
    { wk: '15', date: 'Dec 14', opp: 'Cleveland Browns', loc: 'Home', result: 'W', score: '31-3', type: 'Dominant Win', comeback: false, bearsScore: 31, oppScore: 3 },
    { wk: '16', date: 'Dec 20', opp: 'Green Bay Packers', loc: 'Home', result: 'W', score: '22-16 OT', type: 'COMEBACK', comeback: true, bearsScore: 22, oppScore: 16 },
    { wk: '17', date: 'Dec 28', opp: 'San Francisco 49ers', loc: 'Away', result: 'L', score: '38-42', type: 'Non-Comeback', comeback: false, bearsScore: 38, oppScore: 42 },
    { wk: '18', date: 'Jan 4', opp: 'Detroit Lions', loc: 'Home', result: 'L', score: '16-19', type: 'Non-Comeback', comeback: false, bearsScore: 16, oppScore: 19 },
    { wk: 'WC', date: 'Jan 10', opp: 'Green Bay Packers', loc: 'Home', result: 'W', score: '31-27', type: 'COMEBACK', comeback: true, bearsScore: 31, oppScore: 27 },
];

const comebackQB = [
    { wk: '4', opp: 'LV', comp: '22/37', yards: 212, airYds: 250, ypa: 5.7, td: 1, int: 1, rushYds: 13 },
    { wk: '6', opp: 'WAS', comp: '17/29', yards: 252, airYds: 246, ypa: 8.7, td: 1, int: 0, rushYds: -2 },
    { wk: '9', opp: 'CIN', comp: '20/34', yards: 280, airYds: 282, ypa: 8.2, td: 3, int: 0, rushYds: 53 },
    { wk: '10', opp: 'NYG', comp: '20/36', yards: 220, airYds: 345, ypa: 6.1, td: 1, int: 0, rushYds: 63 },
    { wk: '11', opp: 'MIN', comp: '16/32', yards: 193, airYds: 385, ypa: 6.0, td: 0, int: 0, rushYds: 26 },
    { wk: '16', opp: 'GB', comp: '19/34', yards: 250, airYds: 331, ypa: 7.4, td: 2, int: 0, rushYds: 30 },
    { wk: 'WC', opp: 'GB', comp: '24/48', yards: 361, airYds: 558, ypa: 7.5, td: 2, int: 2, rushYds: 20 },
];

const nonComebackWinsQB = [
    { wk: '3', opp: 'DAL', comp: '19/28', yards: 298, airYds: 250, ypa: 10.6, td: 4, int: 0, rushYds: 12 },
    { wk: '7', opp: 'NO', comp: '15/26', yards: 172, airYds: 220, ypa: 6.6, td: 0, int: 1, rushYds: -2 },
    { wk: '12', opp: 'PIT', comp: '19/35', yards: 239, airYds: 329, ypa: 6.8, td: 3, int: 0, rushYds: 21 },
    { wk: '13', opp: 'PHI', comp: '17/36', yards: 154, airYds: 252, ypa: 4.3, td: 1, int: 1, rushYds: 13 },
    { wk: '15', opp: 'CLE', comp: '17/28', yards: 242, airYds: 275, ypa: 8.6, td: 2, int: 0, rushYds: 13 },
];

const lossesQB = [
    { wk: '1', opp: 'MIN', comp: '21/35', yards: 210, airYds: 263, ypa: 6.0, td: 1, int: 0, rushYds: 58 },
    { wk: '2', opp: 'DET', comp: '19/30', yards: 207, airYds: 302, ypa: 6.9, td: 2, int: 1, rushYds: 27 },
    { wk: '8', opp: 'BAL', comp: '25/38', yards: 285, airYds: 310, ypa: 7.5, td: 0, int: 1, rushYds: 24 },
    { wk: '14', opp: 'GB', comp: '19/35', yards: 186, airYds: 298, ypa: 5.3, td: 2, int: 1, rushYds: 15 },
    { wk: '17', opp: 'SF', comp: '25/42', yards: 330, airYds: 303, ypa: 7.9, td: 2, int: 0, rushYds: 18 },
    { wk: '18', opp: 'DET', comp: '20/33', yards: 212, airYds: 260, ypa: 6.4, td: 2, int: 1, rushYds: 1 },
];

const comebackProfiles = [
    {
        wk: 'Week 4', matchup: '@ Las Vegas Raiders', score: 'W 25-24',
        narrative: 'Trailed 14-9 at halftime. D\'Andre Swift punched in a 2-yard TD with 1:34 remaining to take the lead. The Bears defense then blocked a game-winning field goal attempt to seal the victory - the first real sign of the comeback magic that would define the season.',
        statline: 'Williams: 22/37, 212 yds, 1 TD, 1 INT'
    },
    {
        wk: 'Week 6', matchup: '@ Washington Commanders', score: 'W 25-24',
        narrative: 'Led 16-10, then watched Washington score 14 unanswered to trail 24-16 in the fourth quarter. D\'Andre Swift broke free for a 55-yard catch-and-run TD to cut the deficit. Cairo Santos nailed a 38-yard field goal as time expired for the win.',
        statline: 'Williams: 17/29, 252 yds, 1 TD | Swift: 108 rush yds, 67 rec yds'
    },
    {
        wk: 'Week 9', matchup: '@ Cincinnati Bengals', score: 'W 47-42',
        narrative: 'A wild shootout where neither defense could hold. The Bengals took a 42-41 lead with just :54 remaining. Williams calmly drove the Bears downfield and connected with Cole Kmet\'s replacement, TE Cole Loveland, on a stunning 58-yard TD to win it - the kind of play that separates good QBs from great ones.',
        statline: 'Williams: 20/34, 280 yds, 3 TD, 53 rush yds'
    },
    {
        wk: 'Week 10', matchup: 'vs. New York Giants', score: 'W 24-20',
        narrative: 'Trailed 20-10 with 10:19 left in the game. Williams orchestrated two scoring drives - a 2-yard TD pass to Rome Odunze and a 17-yard scramble TD - to retake the lead. The Bears defense held the Giants to just 7 yards on their final 3 possessions.',
        statline: 'Williams: 20/36, 220 yds, 1 TD, 63 rush yds'
    },
    {
        wk: 'Week 11', matchup: '@ Minnesota Vikings', score: 'W 19-17',
        narrative: 'The Bears built a 16-3 lead, then watched the Vikings rip off 14 unanswered points to lead 17-16 with :50 remaining. Deonte Duvernay returned the ensuing kickoff 56 yards, setting up Cairo Santos for a 48-yard field goal at the buzzer. A comeback born from special teams.',
        statline: 'Williams: 16/32, 193 yds | Swift: 21 carries, 90 yds'
    },
    {
        wk: 'Week 16', matchup: 'vs. Green Bay Packers', score: 'W 22-16 OT',
        narrative: 'Trailed by 10 late in the fourth quarter against the rival Packers. The Bears scored a field goal, then recovered a gutsy onside kick and scored a TD to force overtime. In OT, Williams launched a 46-yard walk-off TD to DJ Moore - a dagger to end the rivalry game.',
        statline: 'Williams: 19/34, 250 yds, 2 TD, 30 rush yds'
    },
    {
        wk: 'Wild Card', matchup: 'vs. Green Bay Packers', score: 'W 31-27',
        narrative: 'The crown jewel. Trailed 21-3 at halftime. Win probability dropped to 3.0%. The Bears\' win probability never exceeded 25% from 6:51 in Q2 to 2:59 in Q4. Then the dam broke: 25 points in the fourth quarter - the 3rd-highest scoring postseason Q4 ever. Williams set the franchise record for playoff passing yards.',
        statline: 'Williams: 24/48, 361 yds, 2 TD, 2 INT | Franchise playoff passing record'
    }
];

// ========== GAME LOG TABLE ==========
function buildGameLogTable() {
    const tbody = document.querySelector('#gameLogTable tbody');
    gameLog.forEach(g => {
        const tr = document.createElement('tr');
        if (g.comeback) tr.classList.add('comeback-row');
        else if (g.result === 'L') tr.classList.add('loss-row');
        const oppShort = g.opp.split(' ').pop();
        tr.innerHTML = `
            <td>${g.wk}</td>
            <td>${g.date}</td>
            <td>${g.opp}</td>
            <td>${g.loc}</td>
            <td class="${g.result === 'W' ? 'result-w' : 'result-l'}">${g.result}</td>
            <td>${g.score}</td>
            <td>${g.comeback ? '<span style="color:'+ORANGE+';font-weight:600">'+g.type+'</span>' : g.type}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ========== QB SPLIT TABLES ==========
function buildQBTable(tableId, data) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    data.forEach(d => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${d.wk}</td><td>${d.opp}</td><td>${d.comp}</td><td>${d.yards}</td>
            <td>${d.airYds}</td><td>${d.ypa}</td><td>${d.td}</td><td>${d.int}</td><td>${d.rushYds}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ========== SCORE CHART ==========
function buildScoreChart() {
    const ctx = document.getElementById('scoreChart').getContext('2d');
    const labels = gameLog.map(g => `Wk ${g.wk}`);
    const bearsScores = gameLog.map(g => g.bearsScore);
    const oppScores = gameLog.map(g => g.oppScore);
    const bgColors = gameLog.map(g => g.comeback ? ORANGE : (g.result === 'W' ? GREEN : '#555'));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Bears',
                    data: bearsScores,
                    backgroundColor: bgColors,
                    borderColor: bgColors,
                    borderWidth: 0,
                    borderRadius: 3,
                    barPercentage: 0.75,
                    categoryPercentage: 0.8
                },
                {
                    label: 'Opponent',
                    data: oppScores,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.2)',
                    borderWidth: 1,
                    borderRadius: 3,
                    barPercentage: 0.75,
                    categoryPercentage: 0.8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.8,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: NAVY,
                    titleColor: WHITE,
                    bodyColor: GRAY_LIGHT,
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        afterBody(items) {
                            const idx = items[0].dataIndex;
                            const g = gameLog[idx];
                            return `${g.opp}\n${g.type}`;
                        }
                    }
                },
                datalabels: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    ticks: { stepSize: 10 }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

// ========== PASSER RATING BY DEFICIT ==========
function buildRatingByDeficit() {
    const ctx = document.getElementById('ratingByDeficit').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Season Overall', 'Trailing 1-8 pts', 'Trailing 9-16 pts'],
            datasets: [{
                data: [90.1, 101.2, 92.6],
                backgroundColor: [GRAY, ORANGE, ORANGE_LIGHT],
                borderWidth: 0,
                borderRadius: 4,
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: WHITE,
                    font: { weight: 'bold', size: 13 },
                    formatter: v => v.toFixed(1)
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 120,
                    grid: { color: 'rgba(255,255,255,0.04)' }
                },
                y: {
                    grid: { display: false }
                }
            }
        }
    });
}

// ========== GAME-BY-GAME YARDS ==========
function buildGameByGameYards() {
    const ctx = document.getElementById('gameByGameYards').getContext('2d');
    const allGames = [...comebackQB, ...nonComebackWinsQB, ...lossesQB].sort((a, b) => {
        const order = ['1','2','3','4','6','7','8','9','10','11','12','13','14','15','16','17','18','WC'];
        return order.indexOf(a.wk) - order.indexOf(b.wk);
    });
    const comebackWks = new Set(comebackQB.map(g => g.wk));
    const lossWks = new Set(lossesQB.map(g => g.wk));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: allGames.map(g => `Wk ${g.wk}`),
            datasets: [{
                label: 'Passing Yards',
                data: allGames.map(g => g.yards),
                backgroundColor: allGames.map(g =>
                    comebackWks.has(g.wk) ? ORANGE :
                    lossWks.has(g.wk) ? '#555' : GREEN
                ),
                borderWidth: 0,
                borderRadius: 3,
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            plugins: {
                legend: { display: false },
                datalabels: { display: false },
                tooltip: {
                    backgroundColor: NAVY,
                    callbacks: {
                        label(item) {
                            const g = allGames[item.dataIndex];
                            return `${g.yards} yds vs ${g.opp} (${g.comp}, ${g.td} TD)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.04)' }
                },
                x: { grid: { display: false } }
            }
        }
    });
}

// ========== PERSONNEL CHART ==========
function buildPersonnelChart() {
    const ctx = document.getElementById('personnelChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['11 Personnel (3 WR)', '12 Personnel (2 TE)', '13 Personnel (3 TE)', 'Other'],
            datasets: [{
                data: [58, 31.2, 7.9, 2.9],
                backgroundColor: [ORANGE, BLUE_ACCENT, GREEN, GRAY],
                borderColor: NAVY_LIGHT,
                borderWidth: 2,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.3,
            cutout: '55%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { padding: 12, font: { size: 11 } }
                },
                datalabels: {
                    display: true,
                    color: WHITE,
                    font: { weight: 'bold', size: 12 },
                    formatter: (v) => v + '%'
                }
            }
        }
    });
}

// ========== FORMATION CHART ==========
function buildFormationChart() {
    const ctx = document.getElementById('formationChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Season Overall', 'Comeback Mode (est.)'],
            datasets: [
                {
                    label: 'Under Center',
                    data: [49.6, 30],
                    backgroundColor: BLUE_ACCENT,
                    borderWidth: 0,
                    borderRadius: 3
                },
                {
                    label: 'Shotgun',
                    data: [50.4, 70],
                    backgroundColor: ORANGE,
                    borderWidth: 0,
                    borderRadius: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.3,
            plugins: {
                legend: { position: 'bottom', labels: { padding: 12 } },
                datalabels: {
                    display: true,
                    color: WHITE,
                    font: { weight: 'bold', size: 12 },
                    formatter: v => v + '%'
                }
            },
            scales: {
                x: { stacked: true, grid: { display: false } },
                y: { stacked: true, max: 100, grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => v + '%' } }
            }
        }
    });
}

// ========== AIR YARDS CHART ==========
function buildAirYardsChart() {
    const ctx = document.getElementById('airYardsChart').getContext('2d');
    const comebackAirYPA = comebackQB.map(g => {
        const att = parseInt(g.comp.split('/')[1]);
        return (g.airYds / att).toFixed(1);
    });
    const nonComebackAirYPA = nonComebackWinsQB.map(g => {
        const att = parseInt(g.comp.split('/')[1]);
        return (g.airYds / att).toFixed(1);
    });

    const allLabels = [
        ...comebackQB.map(g => `Wk ${g.wk} (CB)`),
        ...nonComebackWinsQB.map(g => `Wk ${g.wk}`)
    ];
    const allData = [...comebackAirYPA, ...nonComebackAirYPA].map(Number);
    const allColors = [
        ...comebackQB.map(() => ORANGE),
        ...nonComebackWinsQB.map(() => GREEN)
    ];

    // Sort by week order
    const order = ['3','4','6','7','9','10','11','12','13','15','16','WC'];
    const combined = allLabels.map((l, i) => ({ label: l, val: allData[i], color: allColors[i], wk: l.match(/\d+|WC/)[0] }));
    combined.sort((a, b) => order.indexOf(a.wk) - order.indexOf(b.wk));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: combined.map(c => c.label),
            datasets: [{
                label: 'Air Yards / Attempt',
                data: combined.map(c => c.val),
                backgroundColor: combined.map(c => c.color),
                borderWidth: 0,
                borderRadius: 3,
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: GRAY_LIGHT,
                    font: { size: 10, weight: '500' },
                    formatter: v => v.toFixed(1)
                },
                tooltip: {
                    backgroundColor: NAVY,
                    callbacks: {
                        afterLabel(item) {
                            return item.raw >= 9 ? 'Comeback game' : 'Non-comeback win';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 14,
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    title: { display: true, text: 'Air Yards / Attempt', color: GRAY_LIGHT }
                },
                x: { grid: { display: false }, ticks: { font: { size: 10 } } }
            }
        }
    });
}

// ========== WIN PROBABILITY CHART ==========
function buildWinProbChart() {
    const ctx = document.getElementById('winProbChart').getContext('2d');
    // Simulated win probability data for Wild Card vs GB
    const dataPoints = [
        { label: 'Kickoff', wp: 50, q: 'Q1' },
        { label: 'Q1 8:00', wp: 42, q: 'Q1' },
        { label: 'GB TD', wp: 30, q: 'Q1' },
        { label: 'Q1 End', wp: 28, q: 'Q1' },
        { label: 'GB TD', wp: 18, q: 'Q2' },
        { label: 'CHI FG', wp: 22, q: 'Q2' },
        { label: 'GB TD', wp: 10, q: 'Q2' },
        { label: '6:51 Q2', wp: 8, q: 'Q2' },
        { label: 'Halftime\n21-3', wp: 5, q: 'Q2' },
        { label: 'Q3 Start', wp: 6, q: 'Q3' },
        { label: 'CHI FG', wp: 9, q: 'Q3' },
        { label: 'GB TD', wp: 3, q: 'Q3' },  // Lowest point
        { label: 'Q3 End\n27-6', wp: 5, q: 'Q3' },
        { label: 'Q4 Start', wp: 6, q: 'Q4' },
        { label: 'CHI TD', wp: 14, q: 'Q4' },
        { label: 'CHI TD', wp: 25, q: 'Q4' },
        { label: '2:59 Q4', wp: 38, q: 'Q4' },
        { label: 'CHI TD', wp: 55, q: 'Q4' },
        { label: 'CHI FG', wp: 72, q: 'Q4' },
        { label: 'CHI TD', wp: 88, q: 'Q4' },
        { label: 'Final\n31-27', wp: 100, q: 'Q4' },
    ];

    const gradient = ctx.createLinearGradient(0, 0, 0, 350);
    gradient.addColorStop(0, 'rgba(200,56,3,0.3)');
    gradient.addColorStop(1, 'rgba(200,56,3,0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataPoints.map(d => d.label),
            datasets: [{
                label: 'Bears Win Probability',
                data: dataPoints.map(d => d.wp),
                borderColor: ORANGE,
                backgroundColor: gradient,
                fill: true,
                tension: 0.3,
                pointRadius: dataPoints.map(d => (d.wp === 3 || d.wp === 100) ? 6 : 3),
                pointBackgroundColor: dataPoints.map(d =>
                    d.wp === 3 ? RED : d.wp === 100 ? GREEN : ORANGE
                ),
                pointBorderColor: dataPoints.map(d =>
                    d.wp === 3 ? RED : d.wp === 100 ? GREEN : ORANGE
                ),
                borderWidth: 2.5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: function(ctx) {
                        const val = ctx.dataset.data[ctx.dataIndex];
                        return val === 3 || val === 100 || val === 50;
                    },
                    color: function(ctx) {
                        const val = ctx.dataset.data[ctx.dataIndex];
                        return val === 3 ? RED : val === 100 ? GREEN : WHITE;
                    },
                    font: { weight: 'bold', size: 12 },
                    formatter: v => v + '%',
                    anchor: function(ctx) {
                        const val = ctx.dataset.data[ctx.dataIndex];
                        return val <= 10 ? 'start' : 'end';
                    },
                    align: function(ctx) {
                        const val = ctx.dataset.data[ctx.dataIndex];
                        return val <= 10 ? 'bottom' : 'top';
                    },
                    offset: 6
                },
                tooltip: {
                    backgroundColor: NAVY,
                    titleColor: WHITE,
                    bodyColor: GRAY_LIGHT,
                    callbacks: {
                        label: item => `Win Probability: ${item.raw}%`
                    }
                },
                annotation: undefined
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    ticks: { callback: v => v + '%' },
                    title: { display: true, text: 'Bears Win Probability', color: GRAY_LIGHT }
                },
                x: {
                    grid: { color: 'rgba(255,255,255,0.02)' },
                    ticks: { font: { size: 9 }, maxRotation: 45 }
                }
            }
        }
    });
}

// ========== RADAR CHART ==========
function buildRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    // Normalize metrics to 0-100 scale for radar
    const labels = [
        'Shotgun Rate', 'No Huddle Rate', 'Play Action Rate',
        'Pass Rate', 'Air Yds / Att', 'Scramble Rate',
        '11 Personnel', 'Explosive Play Rate', 'Tempo (inv. TTT)'
    ];
    // Normal mode values (normalized to ~0-100)
    const normalData = [50, 10, 74, 48, 50, 30, 58, 65, 45];
    // Comeback mode values (normalized)
    const comebackData = [85, 40, 45, 62, 75, 60, 80, 85, 70];

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Normal Mode',
                    data: normalData,
                    borderColor: BLUE_ACCENT,
                    backgroundColor: 'rgba(52,152,219,0.1)',
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: BLUE_ACCENT,
                    pointBorderColor: BLUE_ACCENT
                },
                {
                    label: 'Comeback Mode',
                    data: comebackData,
                    borderColor: ORANGE,
                    backgroundColor: 'rgba(200,56,3,0.1)',
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: ORANGE,
                    pointBorderColor: ORANGE
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.4,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { padding: 20, font: { size: 12 } }
                },
                datalabels: { display: false }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'rgba(255,255,255,0.06)' },
                    angleLines: { color: 'rgba(255,255,255,0.06)' },
                    pointLabels: {
                        color: GRAY_LIGHT,
                        font: { size: 11 }
                    },
                    ticks: {
                        display: false,
                        stepSize: 20
                    }
                }
            }
        }
    });
}

// ========== GAME PROFILES ==========
function buildGameProfiles() {
    const container = document.getElementById('gameProfiles');
    comebackProfiles.forEach((gp, idx) => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <div class="game-card-header" onclick="this.parentElement.classList.toggle('open')">
                <div class="gc-left">
                    <span class="gc-week">${gp.wk}</span>
                    <span class="gc-matchup">${gp.matchup}</span>
                </div>
                <div class="gc-right">
                    <span class="gc-score">${gp.score}</span>
                    <span class="gc-toggle">▼</span>
                </div>
            </div>
            <div class="game-card-body">
                <div class="gc-details">
                    <p class="gc-narrative">${gp.narrative}</p>
                    <p class="gc-statline"><strong>Stat Line:</strong> ${gp.statline}</p>
                </div>
            </div>
        `;
        // Auto-open the Wild Card game
        if (idx === comebackProfiles.length - 1) {
            card.classList.add('open');
        }
        container.appendChild(card);
    });
}

// ========== SECTION A: QB MODE CHART ==========
function buildQbModeChart() {
    const ctx = document.getElementById('qbModeChart').getContext('2d');
    const labels = ['Time to Throw (s)', 'Throws on Run %', 'Play Action Rate %', 'Off-Target Rate %', 'Scramble Rate %', 'Passer Rating'];
    const normalData = [3.1, 25, 37, 22, 6, 90.1];
    const comebackModeData = [2.7, 43, 20, 12, 12, 101.2];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Normal Mode',
                    data: normalData,
                    backgroundColor: BLUE_ACCENT,
                    borderWidth: 0,
                    borderRadius: 4,
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                },
                {
                    label: 'Comeback Mode',
                    data: comebackModeData,
                    backgroundColor: ORANGE,
                    borderWidth: 0,
                    borderRadius: 4,
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.2,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: GRAY_LIGHT,
                    font: { weight: '600', size: 11 },
                    formatter: (v, ctx) => {
                        const label = ctx.chart.data.labels[ctx.dataIndex];
                        if (label.includes('Time')) return v + 's';
                        if (label.includes('Rating')) return v.toFixed(1);
                        return v + '%';
                    }
                },
                tooltip: {
                    backgroundColor: NAVY,
                    titleColor: WHITE,
                    bodyColor: GRAY_LIGHT
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    ticks: { display: false }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { size: 11 } }
                }
            }
        }
    });
}

// ========== SECTION B: WR DEPTH CHART ==========
function buildWrDepthChart() {
    const ctx = document.getElementById('wrDepthChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Odunze', 'Moore', 'Zaccheaus', 'Burden'],
            datasets: [{
                label: 'Avg Depth (Air Yards)',
                data: [28.5, 19.9, 11.2, 9.8],
                backgroundColor: [ORANGE, ORANGE_LIGHT, BLUE_ACCENT, GREEN],
                borderWidth: 0,
                borderRadius: 4,
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.4,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: WHITE,
                    font: { weight: 'bold', size: 13 },
                    formatter: v => v.toFixed(1)
                },
                tooltip: {
                    backgroundColor: NAVY,
                    titleColor: WHITE,
                    bodyColor: GRAY_LIGHT
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 35,
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    title: { display: true, text: 'Air Yards', color: GRAY_LIGHT }
                },
                x: { grid: { display: false } }
            }
        }
    });
}

// ========== SECTION B: WR TARGET SHARE CHART ==========
function buildWrTargetChart() {
    const ctx = document.getElementById('wrTargetChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Target Share'],
            datasets: [
                {
                    label: 'Odunze (16.9%)',
                    data: [16.9],
                    backgroundColor: ORANGE,
                    borderWidth: 0,
                    borderRadius: 0,
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                },
                {
                    label: 'Moore (16.0%)',
                    data: [16.0],
                    backgroundColor: ORANGE_LIGHT,
                    borderWidth: 0,
                    borderRadius: 0,
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                },
                {
                    label: 'Zaccheaus (12.2%)',
                    data: [12.2],
                    backgroundColor: BLUE_ACCENT,
                    borderWidth: 0,
                    borderRadius: 0,
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                },
                {
                    label: 'Burden (11.3%)',
                    data: [11.3],
                    backgroundColor: GREEN,
                    borderWidth: 0,
                    borderRadius: 0,
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                },
                {
                    label: 'Others (43.6%)',
                    data: [43.6],
                    backgroundColor: GRAY,
                    borderWidth: 0,
                    borderRadius: 0,
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.4,
            indexAxis: 'y',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { padding: 10, font: { size: 10 }, usePointStyle: true, pointStyle: 'rect' }
                },
                datalabels: {
                    display: true,
                    color: WHITE,
                    font: { weight: 'bold', size: 10 },
                    formatter: v => v + '%'
                },
                tooltip: {
                    backgroundColor: NAVY,
                    titleColor: WHITE,
                    bodyColor: GRAY_LIGHT
                }
            },
            scales: {
                x: {
                    stacked: true,
                    max: 100,
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    ticks: { callback: v => v + '%' }
                },
                y: {
                    stacked: true,
                    grid: { display: false },
                    display: false
                }
            }
        }
    });
}

// ========== SECTION C: RB YPC CHART ==========
function buildRbYpcChart() {
    const ctx = document.getElementById('rbYpcChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Swift Inside', 'Swift Outside', 'Monangai Inside', 'Monangai Outside'],
            datasets: [{
                label: 'YPC',
                data: [3.5, 5.6, 4.9, 4.7],
                backgroundColor: [BLUE_ACCENT, ORANGE, BLUE_ACCENT, ORANGE],
                borderWidth: 0,
                borderRadius: 4,
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.8,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: WHITE,
                    font: { weight: 'bold', size: 14 },
                    formatter: v => v.toFixed(1)
                },
                tooltip: {
                    backgroundColor: NAVY,
                    titleColor: WHITE,
                    bodyColor: GRAY_LIGHT
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 7,
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    title: { display: true, text: 'Yards Per Carry', color: GRAY_LIGHT }
                },
                x: { grid: { display: false }, ticks: { font: { size: 10 } } }
            }
        }
    });
}

// ========== SECTION D: OL PENALTIES CHART ==========
function buildOlPenaltiesChart() {
    const ctx = document.getElementById('olPenaltiesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['False Starts', 'Holding'],
            datasets: [
                {
                    label: 'Team Total',
                    data: [28, 20],
                    backgroundColor: [ORANGE, BLUE_ACCENT],
                    borderWidth: 0,
                    borderRadius: 4,
                    barPercentage: 0.5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.4,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: WHITE,
                    font: { weight: 'bold', size: 14 },
                    formatter: v => v
                },
                tooltip: {
                    backgroundColor: NAVY,
                    titleColor: WHITE,
                    bodyColor: GRAY_LIGHT,
                    callbacks: {
                        afterBody(items) {
                            const idx = items[0].dataIndex;
                            if (idx === 0) return 'Rank: 29th worst\nKey offenders: Wright 12, Benedet 7, Moore 6';
                            return 'Rank: 15th\nKey offenders: Wright, Benedet, Moore';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 35,
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    title: { display: true, text: 'Penalties', color: GRAY_LIGHT }
                },
                x: { grid: { display: false } }
            }
        }
    });
}

// ========== SECTION E: DEFENSIVE TURNOVERS CHART ==========
function buildDefTurnoversChart() {
    const ctx = document.getElementById('defTurnoversChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Byard\n7 INT', 'Wright\n5 INT + 2 TD', 'Edmunds\n4 INT', 'Sweat\n3 FF'],
            datasets: [{
                label: 'Turnovers Forced',
                data: [7, 7, 4, 3],
                backgroundColor: [ORANGE, ORANGE_LIGHT, BLUE_ACCENT, GREEN],
                borderWidth: 0,
                borderRadius: 4,
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.4,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: WHITE,
                    font: { weight: 'bold', size: 13 },
                    formatter: v => v
                },
                tooltip: {
                    backgroundColor: NAVY,
                    titleColor: WHITE,
                    bodyColor: GRAY_LIGHT
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 10,
                    grid: { color: 'rgba(255,255,255,0.04)' }
                },
                y: { grid: { display: false } }
            }
        }
    });
}

// ========== SECTION E: COVERAGE SPLIT CHART ==========
function buildCoverageSplitChart() {
    const ctx = document.getElementById('coverageSplitChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Man Coverage', 'Zone Coverage'],
            datasets: [{
                data: [49, 51],
                backgroundColor: [BLUE_ACCENT, ORANGE],
                borderColor: NAVY_LIGHT,
                borderWidth: 2,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.3,
            cutout: '55%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { padding: 16, font: { size: 12 } }
                },
                datalabels: {
                    display: true,
                    color: WHITE,
                    font: { weight: 'bold', size: 16 },
                    formatter: v => v + '%'
                }
            }
        }
    });
}

// ========== SECTION F: WR/TE SPLIT TARGET SHARE CHART ==========
function buildWrTeSplitChart() {
    const ctx = document.getElementById('wrTeSplitChart').getContext('2d');
    const labels = ['Moore', 'Odunze', 'Burden', 'Zaccheaus', 'Loveland', 'Kmet'];
    const nonCB = [4.5, 5.8, 3.2, 4.1, 4.0, 3.0];
    const comeback = [6.2, 5.2, 4.8, 2.5, 6.5, 2.0];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Non-Comeback Mode',
                    data: nonCB,
                    backgroundColor: BLUE_ACCENT,
                    borderWidth: 0,
                    borderRadius: 4,
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                },
                {
                    label: 'Comeback Mode',
                    data: comeback,
                    backgroundColor: ORANGE,
                    borderWidth: 0,
                    borderRadius: 4,
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.2,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: GRAY_LIGHT,
                    font: { weight: '600', size: 11 },
                    formatter: v => v.toFixed(1)
                },
                tooltip: {
                    backgroundColor: NAVY,
                    titleColor: WHITE,
                    bodyColor: GRAY_LIGHT
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 8,
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    title: { display: true, text: 'Targets Per Game', color: GRAY_LIGHT }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { size: 11, weight: '600' }, color: WHITE }
                }
            }
        }
    });
}

// ========== SECTION F: WR/TE ADOT CHART ==========
function buildWrTeAdotChart() {
    const ctx = document.getElementById('wrTeAdotChart').getContext('2d');
    const labels = ['Moore', 'Odunze', 'Burden', 'Zaccheaus', 'Loveland', 'Kmet'];
    const nonCB = [21.5, 12.5, 10.2, 11.0, 9.2, 8.2];
    const comeback = [16.8, 16.4, 7.5, 11.5, 11.5, 8.0];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Non-Comeback Mode',
                    data: nonCB,
                    backgroundColor: BLUE_ACCENT,
                    borderWidth: 0,
                    borderRadius: 4,
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                },
                {
                    label: 'Comeback Mode',
                    data: comeback,
                    backgroundColor: ORANGE,
                    borderWidth: 0,
                    borderRadius: 4,
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.2,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: GRAY_LIGHT,
                    font: { weight: '600', size: 11 },
                    formatter: v => v.toFixed(1)
                },
                tooltip: {
                    backgroundColor: NAVY,
                    titleColor: WHITE,
                    bodyColor: GRAY_LIGHT
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 25,
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    title: { display: true, text: 'Avg Depth of Target (yards)', color: GRAY_LIGHT }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 11, weight: '600' }, color: WHITE }
                }
            }
        }
    });
}

// ========== SECTION G: COVERAGE TYPE CHART (Doughnut) ==========
function buildCoverageTypeChart() {
    const ctx = document.getElementById('coverageTypeChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Cover 1 (Man-Free)', 'Cover 2 (Zone)', '2-Man Under', 'Cover 3 (Zone)', 'Cover 4/Quarters', 'Cover 6', 'Cover 0 (Blitz)'],
            datasets: [{
                data: [20, 18, 14, 20, 10, 8, 4],
                backgroundColor: [
                    ORANGE,
                    BLUE_ACCENT,
                    '#E67E22',
                    '#2ECC71',
                    '#9B59B6',
                    '#1ABC9C',
                    '#E74C3C'
                ],
                borderColor: NAVY_LIGHT,
                borderWidth: 2,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.3,
            cutout: '50%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { padding: 10, font: { size: 10 }, usePointStyle: true, pointStyle: 'circle' }
                },
                datalabels: {
                    display: function(ctx) {
                        return ctx.dataset.data[ctx.dataIndex] >= 10;
                    },
                    color: WHITE,
                    font: { weight: 'bold', size: 11 },
                    formatter: v => v + '%'
                }
            }
        }
    });
}

// ========== SECTION G: SAFETY SHELL CHART ==========
function buildSafetyShellChart() {
    const ctx = document.getElementById('safetyShellChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['MOFC (1-High)', 'MOFO (2-High)'],
            datasets: [{
                data: [54.4, 40.2],
                backgroundColor: [ORANGE, BLUE_ACCENT],
                borderColor: NAVY_LIGHT,
                borderWidth: 2,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.3,
            cutout: '55%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { padding: 16, font: { size: 12 } }
                },
                datalabels: {
                    display: true,
                    color: WHITE,
                    font: { weight: 'bold', size: 16 },
                    formatter: v => v + '%'
                }
            }
        }
    });
}

// ========== SECTION G: MAN VS ZONE BY MODE ==========
function buildManZoneModeChart() {
    const ctx = document.getElementById('manZoneModeChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Non-Comeback Mode', 'Comeback Mode'],
            datasets: [
                {
                    label: 'Man Coverage',
                    data: [35, 52],
                    backgroundColor: BLUE_ACCENT,
                    borderWidth: 0,
                    borderRadius: 3
                },
                {
                    label: 'Zone Coverage',
                    data: [65, 48],
                    backgroundColor: ORANGE,
                    borderWidth: 0,
                    borderRadius: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.2,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    color: WHITE,
                    font: { weight: 'bold', size: 13 },
                    formatter: v => v + '%'
                }
            },
            scales: {
                x: { stacked: true, grid: { display: false } },
                y: { stacked: true, max: 100, grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => v + '%' } }
            }
        }
    });
}

// ========== SECTION G: COVERAGE SHIFT CHART (Horizontal Grouped Bar) ==========
function buildCoverageShiftChart() {
    const ctx = document.getElementById('coverageShiftChart').getContext('2d');
    const labels = ['Cover 1', 'Cover 2', '2-Man', 'Cover 3', 'Cover 4', 'Cover 6', 'Cover 0'];
    const nonCB = [18, 20, 12, 22, 10, 8, 3];
    const comeback = [28, 16, 18, 14, 8, 10, 6];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Non-Comeback Mode',
                    data: nonCB,
                    backgroundColor: BLUE_ACCENT,
                    borderWidth: 0,
                    borderRadius: 4,
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                },
                {
                    label: 'Comeback Mode',
                    data: comeback,
                    backgroundColor: ORANGE,
                    borderWidth: 0,
                    borderRadius: 4,
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.2,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: GRAY_LIGHT,
                    font: { weight: '600', size: 11 },
                    formatter: v => v + '%'
                },
                tooltip: {
                    backgroundColor: NAVY,
                    titleColor: WHITE,
                    bodyColor: GRAY_LIGHT
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 35,
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    ticks: { callback: v => v + '%' }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { size: 11, weight: '600' }, color: WHITE }
                }
            }
        }
    });
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
    buildGameLogTable();
    buildQBTable('comebackQBTable', comebackQB);
    buildQBTable('nonComebackQBTable', nonComebackWinsQB);
    buildQBTable('lossesQBTable', lossesQB);
    buildScoreChart();
    buildRatingByDeficit();
    buildGameByGameYards();
    buildPersonnelChart();
    buildFormationChart();
    buildAirYardsChart();
    buildWinProbChart();
    buildRadarChart();
    buildGameProfiles();

    // New deep-dive charts
    buildQbModeChart();
    buildWrDepthChart();
    buildWrTargetChart();
    buildRbYpcChart();
    buildOlPenaltiesChart();
    buildDefTurnoversChart();
    buildCoverageSplitChart();
    buildWrTeSplitChart();
    buildWrTeAdotChart();

    // Coverage schemes charts
    buildCoverageTypeChart();
    buildSafetyShellChart();
    buildManZoneModeChart();
    buildCoverageShiftChart();

    // Smooth scroll for nav
    const navLinks = document.querySelectorAll('.header-nav a');
    const headerNav = document.querySelector('.header-nav');

    function setActiveNav(id) {
        navLinks.forEach(a => {
            if (a.getAttribute('href') === '#' + id) {
                a.classList.add('active');
                // Auto-scroll the nav bar so active link is visible (for mobile)
                if (headerNav) {
                    const navRect = headerNav.getBoundingClientRect();
                    const linkRect = a.getBoundingClientRect();
                    const offset = linkRect.left - navRect.left - (navRect.width / 2) + (linkRect.width / 2);
                    headerNav.scrollBy({ left: offset, behavior: 'smooth' });
                }
            } else {
                a.classList.remove('active');
            }
        });
    }

    navLinks.forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setActiveNav(target.id);
            }
        });
    });

    // Scroll spy - highlight nav link for the section currently in view
    const sectionIds = Array.from(navLinks).map(a => a.getAttribute('href').substring(1));
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveNav(entry.target.id);
            }
        });
    }, {
        rootMargin: '-20% 0px -70% 0px' // triggers when section is roughly in top 30% of viewport
    });

    sections.forEach(section => scrollSpyObserver.observe(section));

    // Set initial active state
    if (sections.length > 0) setActiveNav(sections[0].id);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.insight-card, .game-card, .player-card, .case-study-card, .deep-insight, .split-card, .cov-philosophy-card').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
});
