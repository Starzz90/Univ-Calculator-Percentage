function calculateProfileScore() {
    const international = parseInt(document.getElementById("international").value) || 0;
    const national = parseInt(document.getElementById("national").value) || 0;
    const regional = parseInt(document.getElementById("regional").value) || 0;

    const gpa = parseFloat(document.getElementById("gpa").value) || null;
    const ielts = parseFloat(document.getElementById("ielts").value) || null;
    const awards = parseInt(document.getElementById("awards").value) || 0;

    const satMath = parseInt(document.getElementById("satMath")?.value) || null;
    const satWriting = parseInt(document.getElementById("satWriting")?.value) || null;

    const academics = parseInt(document.getElementById("academics").value) || 0;
    const projects = parseInt(document.getElementById("projects").value) || 0;

    const weightOlympiads = parseInt(document.getElementById("weightOlympiads").value) || 0;
    const weightAcademics = parseInt(document.getElementById("weightAcademics").value) || 0;
    const weightProjects = parseInt(document.getElementById("weightProjects").value) || 0;

    const universityName = document.getElementById("universityName").value;
    const acceptanceRate = parseFloat(document.getElementById("acceptanceRate").value);

    const totalOlympiad = international * 3 + national * 2 + regional;
    const normalizedOlympiad = Math.min((totalOlympiad / 30) * 100, 100); // cap at 30 weighted points

    const academicScore = academics;
    const projectScore = projects;

    const totalWeight = weightOlympiads + weightAcademics + weightProjects;

    const weightedScore = (
        (normalizedOlympiad * weightOlympiads +
        academicScore * weightAcademics +
        projectScore * weightProjects) / totalWeight
    );

    let bonus = 0;

    if (gpa !== null) bonus += Math.min(gpa / 4 * 10, 10);
    if (ielts !== null) bonus += Math.min(ielts / 9 * 10, 10);
    if (satMath !== null) bonus += Math.min(satMath / 800 * 5, 5);
    if (satWriting !== null) bonus += Math.min(satWriting / 800 * 5, 5);
    bonus += Math.min(awards / 20 * 15, 15); // 20+ awards cap at full bonus

    const profileRating = Math.min(weightedScore + bonus, 100);

    // Admission logic
    let admissionChance = Math.min(profileRating * 1.2, 100);
    if (acceptanceRate < 10) admissionChance *= 0.7;
    else if (acceptanceRate < 30) admissionChance *= 0.85;

    // Scholarship logic (more selective)
    let scholarshipChance = 0;
    if (profileRating > 90) scholarshipChance = 85 + (Math.random() * 10); // 85-95%
    else if (profileRating > 80) scholarshipChance = 65 + (Math.random() * 10);
    else if (profileRating > 70) scholarshipChance = 45 + (Math.random() * 10);
    else scholarshipChance = 20 + (Math.random() * 15);

    const getStatusEmoji = (score) => {
        if (score >= 80) return "✅ Likely";
        else if (score >= 60) return "⚠️ Borderline";
        else return "❌ Unlikely";
    };

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <h3>Result for ${universityName}</h3>
        <p><strong>Profile Rating:</strong> ${profileRating.toFixed(1)} / 100</p>
        <p><strong>Olympiad Score:</strong> ${normalizedOlympiad.toFixed(1)} / 100</p>
        <p><strong>Academic Score:</strong> ${academicScore} / 100</p>
        <p><strong>Project Score:</strong> ${projectScore} / 100</p>
        <p><strong>GPA:</strong> ${gpa !== null ? gpa : "N/A"} / 4.0</p>
        <p><strong>IELTS:</strong> ${ielts !== null ? ielts : "N/A"} / 9.0</p>
        <p><strong>SAT Math:</strong> ${satMath !== null ? satMath : "N/A"} / 800</p>
        <p><strong>SAT Writing:</strong> ${satWriting !== null ? satWriting : "N/A"} / 800</p>
        <p><strong>Awards:</strong> ${awards}</p>
        <p><strong>Admission Chance:</strong> ${admissionChance.toFixed(1)}% - ${getStatusEmoji(admissionChance)}</p>
        <p><strong>Scholarship Chance:</strong> ${scholarshipChance.toFixed(1)}% - ${getStatusEmoji(scholarshipChance)}</p>
    `;
}