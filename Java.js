function calculateProfileScore() {
    const international = parseInt(document.getElementById("international").value) || 0;
    const national = parseInt(document.getElementById("national").value) || 0;
    const regional = parseInt(document.getElementById("regional").value) || 0;
    const gpa = parseFloat(document.getElementById("gpa").value) || 0;
    const ielts = parseFloat(document.getElementById("ielts").value) || 0;
    const awards = parseInt(document.getElementById("awards").value) || 0;
    const academics = parseFloat(document.getElementById("academics").value) || 0;
    const projects = parseFloat(document.getElementById("projects").value) || 0;
    const weightOlympiads = parseFloat(document.getElementById("weightOlympiads").value) || 0;
    const weightAcademics = parseFloat(document.getElementById("weightAcademics").value) || 0;
    const weightProjects = parseFloat(document.getElementById("weightProjects").value) || 0;
    const universityName = document.getElementById("universityName").value;
    const acceptanceRate = parseFloat(document.getElementById("acceptanceRate").value) || 0;

    const totalOlympiadScore = (international * 3 + national * 2 + regional * 1);
    const maxOlympiadScore = 10 * 3 + 10 * 2 + 10 * 1; // Max = 60
    const olympiadScorePercent = (totalOlympiadScore / maxOlympiadScore) * 100;

    const totalWeight = weightOlympiads + weightAcademics + weightProjects;
    const normalizedOlympiad = (olympiadScorePercent || 0);
    const normalizedAcademic = (academics || 0);
    const normalizedProjects = (projects || 0);

    const profileScore = (
        (normalizedOlympiad * weightOlympiads + normalizedAcademic * weightAcademics + normalizedProjects * weightProjects)
        / totalWeight
    );

    // Estimate Admission Likelihood based on Profile and University Acceptance Rate
    let admissionChance = (profileScore / 100) * (acceptanceRate * 1.5);
    admissionChance = Math.min(admissionChance, 95); // Cap at 95%

    // Profile Rating
    const profileRating = Math.round(profileScore);

    // Scholarship Chance based on holistic profile
    let scholarshipChance = 0;
    if (gpa > 3.8) scholarshipChance += 30;
    else if (gpa > 3.5) scholarshipChance += 20;
    else if (gpa > 3.2) scholarshipChance += 10;

    if (ielts >= 7.5) scholarshipChance += 20;
    else if (ielts >= 6.5) scholarshipChance += 10;

    if (awards >= 10) scholarshipChance += 30;
    else if (awards >= 5) scholarshipChance += 15;
    else if (awards >= 2) scholarshipChance += 5;

    if (profileScore >= 80) scholarshipChance += 20;
    else if (profileScore >= 70) scholarshipChance += 10;

    scholarshipChance = Math.min(scholarshipChance, admissionChance); // Can't get scholarship if not admitted

    // Emoji Results
    const getStatusEmoji = (percent) => {
        if (percent >= 80) return "🟢 Likely";
        if (percent >= 60) return "🟡 Borderline";
        return "🔴 Unlikely";
    };

    const results = `
        <h3>Results for ${universityName}</h3>
        <p><strong>Profile Rating:</strong> ${profileRating} / 100</p>
        <p><strong>Olympiad Score:</strong> ${totalOlympiadScore} / 60</p>
        <p><strong>Academic Score:</strong> ${academics} / 100</p>
        <p><strong>Project Score:</strong> ${projects} / 100</p>
        <p><strong>GPA:</strong> ${gpa} / 4.0</p>
        <p><strong>IELTS:</strong> ${ielts} / 9.0</p>
        <p><strong>Awards:</strong> ${awards} / 10</p>
        <hr>
        <p><strong>Admission Chance:</strong> ${admissionChance.toFixed(1)}% (${getStatusEmoji(admissionChance)})</p>
        <p><strong>Scholarship Chance:</strong> ${scholarshipChance.toFixed(1)}% (${getStatusEmoji(scholarshipChance)})</p>
    `;

    document.getElementById("results").innerHTML = results;
}