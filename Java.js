function calculateProfileScore() {
    // Input collection
    const international = parseInt(document.getElementById("international").value) || 0;
    const national = parseInt(document.getElementById("national").value) || 0;
    const regional = parseInt(document.getElementById("regional").value) || 0;

    const gpa = parseFloat(document.getElementById("gpa").value) || 0;
    const ielts = parseFloat(document.getElementById("ielts").value) || 0;
    const awards = parseInt(document.getElementById("awards").value) || 0;

    const academics = parseInt(document.getElementById("academics").value) || 0;
    const projects = parseInt(document.getElementById("projects").value) || 0;

    const weightOlympiads = parseInt(document.getElementById("weightOlympiads").value) || 0;
    const weightAcademics = parseInt(document.getElementById("weightAcademics").value) || 0;
    const weightProjects = parseInt(document.getElementById("weightProjects").value) || 0;

    const universityName = document.getElementById("universityName").value || "Unknown University";
    const acceptanceRate = parseFloat(document.getElementById("acceptanceRate").value) || 50;

    // Score calculations
    const olympiadScore = international * 3 + national * 2 + regional;
    const normalizedOlympiad = Math.min((olympiadScore / 30) * 100, 100);  // Capped at 30 pts worth

    const academicScore = Math.min(academics, 100);
    const projectScore = Math.min(projects, 100);

    const totalWeight = weightOlympiads + weightAcademics + weightProjects || 1;

    const weightedScore = (
        (normalizedOlympiad * weightOlympiads +
         academicScore * weightAcademics +
         projectScore * weightProjects) / totalWeight
    );

    // Bonus Points for Profile
    let bonus = 0;
    bonus += Math.min((gpa / 4.0) * 10, 10);         // Max 10 pts
    bonus += Math.min((ielts / 9.0) * 10, 10);       // Max 10 pts
    bonus += Math.min((awards / 20) * 10, 10);       // Max 10 pts

    const profileRating = Math.round((weightedScore + bonus) * 10) / 10;  // 1 decimal

    // Admission Chance
    let admissionChance = profileRating * 1.2;
    if (acceptanceRate < 10) admissionChance *= 0.65;
    else if (acceptanceRate < 30) admissionChance *= 0.8;
    admissionChance = Math.min(admissionChance, 98);
    admissionChance = Math.round(admissionChance * 10) / 10;

    // Rejection Chance
    const rejectionChance = Math.round((100 - admissionChance) * 10) / 10;

    // Scholarship Chance (based only on GPA, IELTS, Awards, Projects)
    const scholarshipBase = (
        (Math.min((gpa / 4.0) * 25, 25)) +
        (Math.min((ielts / 9.0) * 25, 25)) +
        (Math.min((awards / 20) * 25, 25)) +
        (Math.min(projects, 100) * 0.25)
    );
    const scholarshipChance = Math.round(Math.min(scholarshipBase, admissionChance - 5) * 10) / 10;

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <h3>Results for ${universityName}</h3>
        <p><strong>Olympiad:</strong> ${international} Intl, ${national} National, ${regional} Regional</p>
        <p><strong>Academics Score:</strong> ${academicScore}/100</p>
        <p><strong>Projects Score:</strong> ${projectScore}/100</p>
        <p><strong>GPA:</strong> ${gpa}/4.0</p>
        <p><strong>IELTS:</strong> ${ielts}/9.0</p>
        <p><strong>Awards:</strong> ${awards}</p>
        <hr>
        <p><strong>Profile Rating:</strong> ${profileRating}/120</p>
        <p><strong>Admission Chance:</strong> ${admissionChance}%</p>
        <p><strong>Rejection Chance:</strong> ${rejectionChance}%</p>
        <p><strong>Scholarship Chance:</strong> ${scholarshipChance}%</p>
    `;
}