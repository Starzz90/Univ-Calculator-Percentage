function calculateProfileScore() {
    // Create a container to show results
    const output = document.createElement("pre");
    document.body.appendChild(output);

    // Helper to get user input from the page
    function getInput(promptText) {
        return parseFloat(prompt(promptText));
    }

    // 1. Olympiad Achievements
    let internationalAwards = parseFloat(prompt("Number of International Olympiad awards (out of 10):"));
    let nationalAwards = parseFloat(prompt("Number of National Olympiad awards (out of 10):"));
    let regionalAwards = parseFloat(prompt("Number of Regional Olympiad awards (out of 10):"));

    let internationalScore = internationalAwards * 10;
    let nationalScore = nationalAwards * 10;
    let regionalScore = regionalAwards * 10;

    let olympiadScore = ((internationalScore + nationalScore + regionalScore) / 3).toFixed(2);

    // 2. Academics
    let academicsScore = parseFloat(prompt("Academics score (e.g., GPA, SAT scores, etc.) (0 to 100):"));

    // 3. Projects
    let projectsScore = parseFloat(prompt("Projects score (Real-world coding, research, etc.) (0 to 100):"));

    // Weights
    let weightOlympiads = parseFloat(prompt("Weight for Olympiad achievements (0 to 100):"));
    let weightAcademics = parseFloat(prompt("Weight for Academics (0 to 100):"));
    let weightProjects = parseFloat(prompt("Weight for Projects (0 to 100):"));

    if (weightOlympiads + weightAcademics + weightProjects !== 100) {
        output.textContent = "⚠️ Error: The weights do not sum to 100. Please refresh and try again.";
        return;
    }

    let totalScore = (
        olympiadScore * (weightOlympiads / 100) +
        academicsScore * (weightAcademics / 100) +
        projectsScore * (weightProjects / 100)
    ).toFixed(2);

    // 4. University Acceptance Rate
    let universityName = prompt("Enter the name of your university (e.g., NUS, Stanford, etc.):");
    let acceptanceRate = parseFloat(prompt(`Enter the acceptance rate for ${universityName} (0 to 100):`));
    let actualRate = 100 - acceptanceRate;

    // Build result message
    let message = `📊 RESULTS:
- Olympiad Score: ${olympiadScore}
- Academics Score: ${academicsScore}
- Projects Score: ${projectsScore}
- Total Weighted Score: ${totalScore}%
- Normalized Total Score: ${totalScore}%

🎓 University Admission Insight:
`;

    if (totalScore >= actualRate) {
        message += `✅ Congratulations! You are likely to be accepted into ${universityName}.`;
    } else if (totalScore >= (actualRate - 30)) {
        message += `🤔 You are on the borderline for ${universityName}. You may have a chance!`;
    } else {
        message += `❌ Your profile score is currently too low for ${universityName}. Consider improving key areas.`;
    }

    output.textContent = message;
}

// Run the calculator
calculateProfileScore();
