document.getElementById("scoreForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get values from input fields
    const internationalAwards = parseFloat(document.getElementById("international").value) || 0;
    const nationalAwards = parseFloat(document.getElementById("national").value) || 0;
    const regionalAwards = parseFloat(document.getElementById("regional").value) || 0;

    const academicsScore = parseFloat(document.getElementById("academics").value) || 0;
    const projectsScore = parseFloat(document.getElementById("projects").value) || 0;

    const weightOlympiads = parseFloat(document.getElementById("wOlympiad").value) || 0;
    const weightAcademics = parseFloat(document.getElementById("wAcademics").value) || 0;
    const weightProjects = parseFloat(document.getElementById("wProjects").value) || 0;

    const universityName = document.getElementById("universityName").value;
    const acceptanceRate = parseFloat(document.getElementById("acceptanceRate").value) || 0;

    const output = document.getElementById("output");

    // Validate weights
    if (weightOlympiads + weightAcademics + weightProjects !== 100) {
        output.textContent = "⚠️ Error: The weights must sum to 100.";
        return;
    }

    // Olympiad Score Calculation
    const internationalScore = internationalAwards * 10;
    const nationalScore = nationalAwards * 10;
    const regionalScore = regionalAwards * 10;
    const olympiadScore = ((internationalScore + nationalScore + regionalScore) / 3).toFixed(2);

    // Total Weighted Score
    const totalScore = (
        olympiadScore * (weightOlympiads / 100) +
        academicsScore * (weightAcademics / 100) +
        projectsScore * (weightProjects / 100)
    ).toFixed(2);

    // Admission Chance
    const actualRate = 100 - acceptanceRate;
    let message = "";

    if (totalScore >= actualRate) {
        message = `✅ Congratulations! You are likely to be accepted into ${universityName}.`;
    } else if (totalScore >= (actualRate - 30)) {
        message = `🤔 You're on the borderline for ${universityName}.`;
    } else {
        message = `❌ Your profile score is low for ${universityName}. Consider improving it.`;
    }

    // Output Result
    output.textContent = `📊 RESULTS:
- Olympiad Score: ${olympiadScore}
- Academics Score: ${academicsScore}
- Projects Score: ${projectsScore}
- Total Weighted Score: ${totalScore}%
- Normalized Total Score: ${totalScore}%

🎓 University Admission Insight:
${message}`;
});
