// profile_evaluator.js function calculateProfileScore() { const international = parseInt(document.getElementById('international').value) || 0; const national = parseInt(document.getElementById('national').value) || 0; const regional = parseInt(document.getElementById('regional').value) || 0; const academics = parseFloat(document.getElementById('academics').value) || 0; const projects = parseFloat(document.getElementById('projects').value) || 0; const gpa = parseFloat(document.getElementById('gpa').value) || 0; const ielts = parseFloat(document.getElementById('ielts').value) || 0; const satMath = parseInt(document.getElementById('satMath').value) || 0; const satReading = parseInt(document.getElementById('satReading').value) || 0;

const weightOlympiads = parseFloat(document.getElementById('weightOlympiads').value);
const weightAcademics = parseFloat(document.getElementById('weightAcademics').value);
const weightProjects = parseFloat(document.getElementById('weightProjects').value);

const universityName = document.getElementById('universityName').value;
const acceptanceRate = parseFloat(document.getElementById('acceptanceRate').value);
const nonEnglish = document.getElementById('nonEnglishCountry').checked;

const totalWeight = weightOlympiads + weightAcademics + weightProjects;
if (totalWeight !== 100) {
    document.getElementById('results').innerHTML = "<p style='color: red;'>⚠️ The weights must sum to 100.</p>";
    return;
}

const olympiadScore = (((international + national + regional) * 10) / 3);
const totalScore = (
    olympiadScore * (weightOlympiads / 100) +
    academics * (weightAcademics / 100) +
    projects * (weightProjects / 100)
);

const profileRating = Math.min(100, totalScore.toFixed(2));
const requiredScore = 100 - acceptanceRate;
let verdict = "", emoji = "";

if (totalScore >= requiredScore + 10) {
    verdict = `🌟 Likely Accepted into ${universityName}`;
    emoji = "🌟";
} else if (totalScore >= requiredScore - 10) {
    verdict = `📈 Borderline Accepted into ${universityName}`;
    emoji = "📈";
} else {
    verdict = `❌ Unlikely to be Accepted into ${universityName}`;
    emoji = "❌";
}

// Scholarship Chance
let scholarshipChance = 0;
let academicResult = "", scholarshipVerdict = "", scholarshipEmoji = "";

if (!nonEnglish) {
    academicResult = gpa && ielts ?
        (gpa >= 3.8 && ielts >= 7.5 ? "✅ Strong GPA and IELTS" :
         gpa >= 3.5 && ielts >= 6.5 ? "⚠️ Moderate GPA and IELTS" :
         "❌ Weak GPA or IELTS") :
        "⚠️ Incomplete academic info";

    scholarshipChance += (gpa / 4.0) * 30;
    scholarshipChance += (ielts / 9.0) * 20;
} else {
    academicResult = "ℹ️ GPA/IELTS not required.";
}

const awardPoints = (international * 3 + national * 2 + regional) * 4;
scholarshipChance += Math.min(40, awardPoints);

if (satMath && satReading) {
    const satTotal = satMath + satReading;
    scholarshipChance += Math.min(10, (satTotal / 1600) * 10);
}

scholarshipChance = Math.min(100, scholarshipChance);

if (scholarshipChance >= 80) {
    scholarshipVerdict = "🎓 Very Likely to receive a scholarship";
    scholarshipEmoji = "🎓";
} else if (scholarshipChance >= 60) {
    scholarshipVerdict = "💰 Moderately Likely to receive a scholarship";
    scholarshipEmoji = "💰";
} else {
    scholarshipVerdict = "⚠️ Unlikely to receive a scholarship";
    scholarshipEmoji = "⚠️";
}

document.getElementById('results').innerHTML = `
    <h3>📊 Profile Evaluation</h3>
    <ul>
        <li><strong>University:</strong> ${universityName}</li>
        <li><strong>Acceptance Rate:</strong> ${acceptanceRate}%</li>
        <li><strong>Required Score to Compete:</strong> ${requiredScore.toFixed(2)}%</li>
        <li><strong>International Awards:</strong> ${international}</li>
        <li><strong>National Awards:</strong> ${national}</li>
        <li><strong>Regional Awards:</strong> ${regional}</li>
        <li><strong>Olympiad Score:</strong> ${olympiadScore.toFixed(2)} / 100</li>
        <li><strong>Academic Score:</strong> ${academics} / 100</li>
        <li><strong>Project Score:</strong> ${projects} / 100</li>
        ${gpa ? `<li><strong>GPA:</strong> ${gpa} / 4.0</li>` : ""}
        ${ielts ? `<li><strong>IELTS:</strong> ${ielts} / 9.0</li>` : ""}
        ${satMath || satReading ? `<li><strong>SAT Math:</strong> ${satMath} / 800</li><li><strong>SAT Reading:</strong> ${satReading} / 800</li>` : ""}
        <li><strong>Total Weighted Score:</strong> ${totalScore.toFixed(2)}%</li>
        <li><strong>Profile Rating:</strong> ${profileRating} / 100</li>
    </ul>
    <h4>${emoji} Admission Verdict: ${verdict}</h4>
    <p>${academicResult}</p>
    <h4>${scholarshipEmoji} Scholarship Chance: ${scholarshipChance.toFixed(1)}% — ${scholarshipVerdict}</h4>
`;

}

