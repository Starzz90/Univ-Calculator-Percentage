// JavaScript File: Java.js

function calculateProfileScore() { const intl = parseInt(document.getElementById("international").value) || 0; const nat = parseInt(document.getElementById("national").value) || 0; const reg = parseInt(document.getElementById("regional").value) || 0; const gpa = parseFloat(document.getElementById("gpa").value) || 0; const ielts = parseFloat(document.getElementById("ielts").value) || 0; const awards = parseInt(document.getElementById("awards").value) || 0; const academics = parseFloat(document.getElementById("academics").value); const projects = parseFloat(document.getElementById("projects").value); const weightOly = parseFloat(document.getElementById("weightOlympiads").value); const weightAca = parseFloat(document.getElementById("weightAcademics").value); const weightPro = parseFloat(document.getElementById("weightProjects").value); const uniName = document.getElementById("universityName").value; const acceptanceRate = parseFloat(document.getElementById("acceptanceRate").value); const satMath = parseInt(document.getElementById("satMath").value) || 0; const satWriting = parseInt(document.getElementById("satWriting").value) || 0;

const nonEnglish = !gpa && !ielts; // Non-English countries

const olympiadScore = Math.min(10, intl * 3 + nat * 2 + reg * 1);
const totalWeight = weightOly + weightAca + weightPro;

const normalizedOlympiad = (olympiadScore / 10) * (weightOly / totalWeight) * 100;
const normalizedAcademics = (academics / 100) * (weightAca / totalWeight) * 100;
const normalizedProjects = (projects / 100) * (weightPro / totalWeight) * 100;

const profileScore = (normalizedOlympiad + normalizedAcademics + normalizedProjects).toFixed(2);

// Admission likelihood
let admissionStatus = "";
let emoji = "";
if (profileScore >= 85) {
    admissionStatus = "Highly Likely";
    emoji = "🚀"; // Rocket
} else if (profileScore >= 70) {
    admissionStatus = "Likely";
    emoji = "👍"; // Thumbs Up
} else if (profileScore >= 50) {
    admissionStatus = "Borderline";
    emoji = "🕵️"; // Detective
} else {
    admissionStatus = "Unlikely";
    emoji = "❌"; // Cross
}

// Scholarship Chance Calculation
let scholarshipChance = 0;
if (!nonEnglish) {
    scholarshipChance += Math.min(40, (gpa / 4) * 40); // 40% weight
    scholarshipChance += Math.min(30, (ielts / 9) * 30); // 30% weight
}
scholarshipChance += Math.min(30, (awards / 10) * 30); // 30% awards weight
if (!nonEnglish && (satMath > 0 || satWriting > 0)) {
    const satTotal = Math.min(1600, satMath + satWriting);
    scholarshipChance += (satTotal / 1600) * 10; // bonus boost
}
scholarshipChance = scholarshipChance.toFixed(2);

let scholarshipStatus = "";
let scholarshipEmoji = "";
if (scholarshipChance >= 85) {
    scholarshipStatus = "Very High";
    scholarshipEmoji = "🎓"; // Graduation Cap
} else if (scholarshipChance >= 60) {
    scholarshipStatus = "Moderate";
    scholarshipEmoji = "💸"; // Money with wings
} else if (scholarshipChance >= 40) {
    scholarshipStatus = "Borderline";
    scholarshipEmoji = "❓"; // Question Mark
} else {
    scholarshipStatus = "Low";
    scholarshipEmoji = "⚠️"; // Warning
}

// Display result
document.getElementById("results").innerHTML = `
    <div>
        <h3>Results for ${uniName}</h3>
        <ul>
            <li><strong>Olympiad Score:</strong> ${olympiadScore} / 10</li>
            <li><strong>Academic Score:</strong> ${academics}</li>
            <li><strong>Project Score:</strong> ${projects}</li>
            <li><strong>Profile Score:</strong> ${profileScore} — <strong>${admissionStatus}</strong> ${emoji}</li>
            <li><strong>Acceptance Rate:</strong> ${acceptanceRate}%</li>
            ${!nonEnglish ? `<li><strong>GPA:</strong> ${gpa}</li><li><strong>IELTS:</strong> ${ielts}</li>` : ""}
            ${satMath ? `<li><strong>SAT Math:</strong> ${satMath}</li>` : ""}
            ${satWriting ? `<li><strong>SAT Writing:</strong> ${satWriting}</li>` : ""}
            <li><strong>Awards:</strong> ${awards}</li>
            <li><strong>Scholarship Chance:</strong> ${scholarshipChance}% — ${scholarshipStatus} ${scholarshipEmoji}</li>
        </ul>
    </div>
`;

}

