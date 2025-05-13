function calculateProfileScore() {
    // Collect inputs
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

    // Validate weights
    const totalWeight = weightOlympiads + weightAcademics + weightProjects;
    if (totalWeight !== 100) {
        document.getElementById('results').innerHTML = "<p style='color: red;'>⚠️ The weights must sum to 100.</p>";
        return;
    }

    // Scores
    const olympiadScore = (((international + national + regional) * 10) / 3).toFixed(2);
    const totalScore = (
        olympiadScore * (weightOlympiads / 100) +
        academics * (weightAcademics / 100) +
        projects * (weightProjects / 100)
    ).toFixed(2);

    const actualRate = 100 - acceptanceRate;

    // Academic result
    let academicResult = "";
    if (gpa >= 3.8 && ielts >= 7.5) {
        academicResult = "✅ You meet the academic and English requirements.";
    } else if (gpa >= 3.5 && gpa <= 3.7 && ielts >= 6.0 && ielts <= 7.0) {
        academicResult = "⚠️ You partially meet the academic and English requirements.";
    } else {
        academicResult = "❌ Your GPA or IELTS is below standard requirements.";
    }

    // Verdict
    let verdict = "";
    let emoji = "";
    let profileRating = Math.min(100, totalScore);

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

    // Display results
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
            <li><strong>Total Weighted Score:</strong> ${totalScore}%/100%</li>
            <li><strong>GPA:</strong> ${gpa}/4.0</li>
            <li><strong>IELTS:</strong> ${ielts}/10</li>
            <li><strong>Profile Rating:</strong> ${profileRating}/100</li>
        </ul>
        <h4>${emoji} Verdict: ${verdict}</h4>
        <p>${academicResult}</p>
    `;
}