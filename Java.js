function calculateScholarshipOnly() {
    const gpa = parseFloat(document.getElementById("gpa").value) || 0;
    const ielts = parseFloat(document.getElementById("ielts").value) || 0;
    const awards = parseInt(document.getElementById("awards").value) || 0;
    const projects = parseInt(document.getElementById("projects").value) || 0;

    // Normalize scores
    const gpaScore = Math.min((gpa / 4) * 25, 25);       // Max 25
    const ieltsScore = Math.min((ielts / 9) * 25, 25);    // Max 25
    const awardsScore = Math.min((awards / 20) * 25, 25); // Max 25 for 20+ awards
    const projectScore = Math.min(projects, 25);          // Max 25 if full project score

    const totalScholarshipScore = gpaScore + ieltsScore + awardsScore + projectScore;

    const getStatus = (score) => {
        if (score >= 90) return "✅ Very Likely";
        if (score >= 75) return "⚠️ Moderate";
        return "❌ Unlikely";
    };

    const resultDiv = document.getElementById("scholarshipResults");
    resultDiv.innerHTML = `
        <h3>Scholarship Evaluation</h3>
        <p><strong>GPA Score:</strong> ${gpaScore.toFixed(1)} / 25</p>
        <p><strong>IELTS Score:</strong> ${ieltsScore.toFixed(1)} / 25</p>
        <p><strong>Awards Score:</strong> ${awardsScore.toFixed(1)} / 25</p>
        <p><strong>Projects Score:</strong> ${projectScore.toFixed(1)} / 25</p>
        <p><strong>Total Scholarship Score:</strong> ${totalScholarshipScore.toFixed(1)} / 100</p>
        <p><strong>Estimated Scholarship Chance:</strong> ${totalScholarshipScore.toFixed(1)}% - ${getStatus(totalScholarshipScore)}</p>
    `;
}