function calculateProfileScore() {
    // Retrieve all form inputs
    const international = parseInt(document.getElementById("international").value) || 0;
    const national = parseInt(document.getElementById("national").value) || 0;
    const regional = parseInt(document.getElementById("regional").value) || 0;
    const academics = parseFloat(document.getElementById("academics").value) || 0;
    const projects = parseFloat(document.getElementById("projects").value) || 0;
    const gpa = parseFloat(document.getElementById("gpa").value) || 0;
    const ielts = parseFloat(document.getElementById("ielts").value) || 0;
    const awards = parseInt(document.getElementById("awards").value) || 0;

    const weightOlympiads = parseFloat(document.getElementById("weightOlympiads").value) || 0;
    const weightAcademics = parseFloat(document.getElementById("weightAcademics").value) || 0;
    const weightProjects = parseFloat(document.getElementById("weightProjects").value) || 0;

    const universityName = document.getElementById("universityName").value;
    const acceptanceRate = parseFloat(document.getElementById("acceptanceRate").value) || 0;

    // Validation for total weight
    const totalWeight = weightOlympiads + weightAcademics + weightProjects;
    if (totalWeight !== 100) {
        alert("Total weight must equal 100%");
        return;
    }

    // Calculate scores
    const olympiadScore = (international * 3 + national * 2 + regional * 1);
    const olympiadWeighted = olympiadScore * (weightOlympiads / 100);
    const academicsWeighted = academics * (weightAcademics / 100);
    const projectsWeighted = projects * (weightProjects / 100);

    const profileScore = olympiadWeighted + academicsWeighted + projectsWeighted;

    // Scholarship estimation logic
    const gpaPercent = (gpa / 4) * 100;
    const ieltsPercent = (ielts / 9) * 100;
    const awardPercent = (awards / 10) * 100;

    const scholarshipScore = Math.round((gpaPercent + ieltsPercent + awardPercent) / 3);

    // Display results
    document.getElementById("results").innerHTML = `
        <h3>Results for ${universityName}</h3>
        <p><strong>Profile Score:</strong> ${profileScore.toFixed(2)} / 100</p>
        <p><strong>Scholarship Score:</strong> ${scholarshipScore} / 100</p>
        <p><strong>Acceptance Rate:</strong> ${acceptanceRate}%</p>
    `;
}