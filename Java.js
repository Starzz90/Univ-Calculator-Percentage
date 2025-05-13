function calculateProfileScore() {
    const international = parseInt(document.getElementById('international').value);
    const national = parseInt(document.getElementById('national').value);
    const regional = parseInt(document.getElementById('regional').value);
    const academics = parseFloat(document.getElementById('academics').value);
    const projects = parseFloat(document.getElementById('projects').value);
    const gpa = parseFloat(document.getElementById('gpa').value);
    const ielts = parseFloat(document.getElementById('ielts').value);

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

    const olympiadScore = (((international + national + regional) * 10) / 3).toFixed(2);
    const totalScore = (
        olympiadScore * (weightOlympiads / 100) +
        academics * (weightAcademics / 100) +
        projects * (weightProjects / 100)
    ).toFixed(2);

    const actualRate = 100 - acceptanceRate;
    let verdict = "", emoji = "", academicResult = "";
    let profileRating = Math.min(100, totalScore);

    // Admission verdict
    if (totalScore >= actualRate + 10) {
        verdict = `🌟 Likely Accepted into ${universityName}`;
        emoji = "🌟";
    } else if (totalScore >= actualRate - 10) {
        verdict = `📈 Borderline Accepted into ${universityName}`;
        emoji = "📈";
    } else {
        verdict = `❌ Unlikely to be Accepted into ${universityName}`;
        emoji = "❌";
    }

    // Scholarship chance calculation
    let scholarshipChance = 0;
    let scholarshipVerdict = "", scholarshipEmoji = "";

    if (nonEnglish) {
        academicResult = "ℹ️ GPA & IELTS not required for selected university.";
        scholarshipVerdict = "🔍 Not calculated due to GPA/IELTS exemption.";
        scholarshipEmoji = "🔍";
    } else {
        if (gpa >= 3.8 && ielts >= 7.5) {
            academicResult = "✅ You meet the academic and English requirements.";
        } else if (gpa >= 3.5 && ielts >= 6.0) {
            academicResult = "⚠️ You partially meet the academic and English requirements.";
        } else {
            academicResult = "❌ Your GPA or IELTS is below standard requirements.";
        }

        scholarshipChance += (gpa / 4.0) * 35;
        scholarshipChance += (ielts / 9.0) * 25;
        const awardPoints = (international * 3 + national * 2 + regional) * 4;
        scholarshipChance += Math.min(40, awardPoints);

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
    }

    // Final results display
    document.getElementById('results').innerHTML = `
        <h3>📊 Profile Analysis Result</h3>
        <ul>
            <li><strong>University:</strong> ${universityName}</li>
            <li><strong>University Acceptance Rate:</strong> ${acceptanceRate}%</li>
            <li><strong>Required Score to Pass:</strong> ${actualRate.toFixed(2)}%</li>
            <li><strong>International Awards:</strong> ${international}</li>
            <li><strong>National Awards:</strong> ${national}</li>
            <li><strong>Regional Awards:</strong> ${regional}</li>
            <li><strong>Olympiad Score:</strong> ${olympiadScore}</li>
            <li><strong>Academic Score:</strong> ${academics}</li>
            <li><strong>Project Score:</strong> ${projects}</li>
            <li><strong>Total Weighted Score:</strong> ${totalScore}%</li>
            ${nonEnglish ? "" : `<li><strong>GPA:</strong> ${gpa}</li><li><strong>IELTS:</strong> ${ielts}</li>`}
            <li><strong>Profile Rating:</strong> ${profileRating}/100</li>
        </ul>
        <h4>${emoji} Verdict: ${verdict}</h4>
        <p>${academicResult}</p>
        <h4>${scholarshipEmoji} Scholarship Chance: ${nonEnglish ? "Not Applicable" : scholarshipChance.toFixed(1) + "%"} — ${scholarshipVerdict}</h4>
    `;
}