function calculateProfileScore() {
    const international = parseInt(document.getElementById("international").value) || 0;
    const national = parseInt(document.getElementById("national").value) || 0;
    const regional = parseInt(document.getElementById("regional").value) || 0;

    const gpa = parseFloat(document.getElementById("gpa").value) || null;
    const ielts = parseFloat(document.getElementById("ielts").value) || null;
    const awards = parseInt(document.getElementById("awards").value) || 0;

    const academics = parseInt(document.getElementById("academics").value) || 0;
    const projects = parseInt(document.getElementById("projects").value) || 0;

    const weightOlympiads = parseInt(document.getElementById("weightOlympiads").value) || 0;
    const weightAcademics = parseInt(document.getElementById("weightAcademics").value) || 0;
    const weightProjects = parseInt(document.getElementById("weightProjects").value) || 0;

    const universityName = document.getElementById("universityName").value;
    const acceptanceRate = parseFloat(document.getElementById("acceptanceRate").value);

    const totalOlympiad = international * 3 + national * 2 + regional;
    const normalizedOlympiad = Math.min((totalOlympiad / 30) * 100, 100); // Max 100

    const academicScore = academics;
    const projectScore = projects;

    const totalWeight = weightOlympiads + weightAcademics + weightProjects;

    const weightedScore = (
        (normalizedOlympiad * weightOlympiads +
        academicScore * weightAcademics +
        projectScore * weightProjects) / totalWeight
    );

    // Bonus: GPA, IELTS, Awards only
    let bonus = 0;
    if (gpa !== null) bonus += Math.min((gpa / 4) * 10, 10);          // max 10
    if (ielts !== null) bonus += Math.min((ielts / 9) * 10, 10);      // max 10
    bonus += Math.min((awards / 20) * 15, 15);                         // max 15

    const profileRating = Math.min(weightedScore + bonus, 100);

    // Admission estimation
    let admissionChance = Math.min(profileRating * 1.2, 100);
    if (acceptanceRate < 10) admissionChance *= 0.7;
    else if (acceptanceRate < 30) admissionChance *= 0.85;

    admissionChance = Math.round(admissionChance * 10) / 10;
    const rejectionChance = Math.max(0, (100 - admissionChance).toFixed(1));

    // Scholarship calculation based ONLY on GPA, IELTS, Awards, Projects
    let scholarshipScore = 0;
    if (gpa !== null) scholarshipScore += Math.min((gpa / 4) * 25, 25);      // max 25
    if (ielts !== null) scholarshipScore += Math.min((ielts / 9) * 25, 25);  // max 25
    scholarshipScore += Math.min((awards / 20) * 25, 25);                    // max 25
    scholarshipScore += Math.min((projectScore / 100) * 25, 25);             // max 25

    const scholarshipChance = Math.min(scholarshipScore, 100).toFixed(1);

    const getStatusEmoji = (score) => {
        if (score >= 80) return "✅ Likely";
        else if (score >= 60) return "⚠️ Borderline";
        else return "❌ Unlikely";
    };

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <h3>Results for ${universityName}</h3>
        <p><strong>Profile Rating:</strong> ${profileRating.toFixed(1)} / 100</p>
        <p><strong>Olympiad Score:</strong> ${normalizedOlympiad.toFixed(1)} / 100</p>
        <p><strong>Academic Score:</strong> ${academicScore} / 100</p>
        <p><strong>Project Score:</strong> ${projectScore} / 100</p>
        <p><strong>GPA:</strong> ${gpa !== null ? gpa : "N/A"} / 4.0</p>
        <p><strong>IELTS:</strong> ${ielts !== null ? ielts : "N/A"} / 9.0</p>
        <p><strong>Awards:</strong> ${awards}</p>
        <p><strong>Admission Chance:</strong> ${admissionChance}% - ${getStatusEmoji(admissionChance)}</p>
        <p><strong>Rejection Chance:</strong> ${rejectionChance}%</p>
        <p><strong>Scholarship Chance (GPA + IELTS + Awards + Projects only):</strong> ${scholarshipChance}% - ${getStatusEmoji(scholarshipChance)}</p>
    `;
}