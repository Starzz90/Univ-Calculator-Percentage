function calculateProfileScore() {
    alert("🎓 University Admission Profile Score Calculator (0-100 scale)");

    // 1. Olympiad Achievements
    let internationalAwards = parseInt(prompt("Number of International Olympiad awards (out of 10):"), 10);
    let nationalAwards = parseInt(prompt("Number of National Olympiad awards (out of 10):"), 10);
    let regionalAwards = parseInt(prompt("Number of Regional Olympiad awards (out of 10):"), 10);

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
        alert("⚠️ Error: The weights do not sum to 100. Please check your inputs.");
        return;
    }

    let totalScore = (
        olympiadScore * (weightOlympiads / 100) +
        academicsScore * (weightAcademics / 100) +
        projectsScore * (weightProjects / 100)
    ).toFixed(2);

    alert(`📊 Results:
Olympiad Score: ${olympiadScore}
Academics Score: ${academicsScore}
Projects Score: ${projectsScore}
Total Weighted Score: ${totalScore}%
Normalized Total Score (Percentage): ${totalScore}%`);

    // 4. University Acceptance Rate
    let universityName = prompt("Enter the name of your university (e.g., NUS, Stanford, etc.):");
    let acceptanceRate = parseFloat(prompt(`Enter the acceptance rate for ${universityName} (0 to 100):`));
    let actualRate = 100 - acceptanceRate;

    if (totalScore >= actualRate) {
        alert(`✅ Congratulations! Based on your profile score of ${totalScore}%, you are likely to be accepted into ${universityName}.`);
    } else if (totalScore >= (actualRate - 30)) {
        alert(`🤔 You are on the borderline! With a profile score of ${totalScore}%, you may have a chance of being accepted into ${universityName}.`);
    } else {
        alert(`❌ Based on your profile score of ${totalScore}%, you may need to improve your profile to increase your chances of acceptance into ${universityName}.`);
    }
}

// Run the calculator
calculateProfileScore();
