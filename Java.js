function calculateProfileScore() {
    // Collect inputs
    const international = parseInt(document.getElementById('international').value);
    const national = parseInt(document.getElementById('national').value);
    const regional = parseInt(document.getElementById('regional').value);
    const academics = parseFloat(document.getElementById('academics').value);
    const projects = parseFloat(document.getElementById('projects').value);
    const GPA = parseFloat(document.getElementById('GPA').value);
    const IELTS = parseFloat(document.getElementById('IELTS').value);
    const awards = parseFloat(document.getElementById('awards').value);

    const weightOlympiads = parseFloat(document.getElementById('weightOlympiads').value);
    const weightAcademics = parseFloat(document.getElementById('weightAcademics').value);
    const weightProjects = parseFloat(document.getElementById('weightProjects').value);

    const universityName = document.getElementById('universityName').value;
    const acceptanceRate = parseFloat(document.getElementById('acceptanceRate').value);

    // Validate weights sum to 100
    const totalWeight = weightOlympiads + weightAcademics + weightProjects;
    if (totalWeight !== 100) {
        document.getElementById('results').innerHTML = "<p style='color: red;'>⚠️ The weights must sum to 100.</p>";
        return;
    }

    // Calculations
    const olympiadScore = (((international + national + regional) * 10) / 3).toFixed(2);
    const totalScore = (
        olympiadScore * (weightOlympiads / 100) +
        academics * (weightAcademics / 100) +
        projects * (weightProjects / 100)
    ).toFixed(2);

    const actualRate = 100 - acceptanceRate;

      if (gpa >= 3.7 && ielts >= 7.5 && awards >= 3) {
        result.innerText = "✅ Eligible for Admission and Scholarship!";
        result.style.color = "green";
      } else if (gpa >= 3.5 && ielts >= 6.5) {
        result.innerText = "⚠️ Eligible for Admission, but not Scholarship.";
        result.style.color = "orange";
      } else {
        result.innerText = "❌ Not eligible yet. Keep improving!";
        result.style.color = "red";
      }
    }
    // Verdict
    let verdict = "";
    if (totalScore >= actualRate-5) {
        verdict = `✅ Likely accepted into ${universityName}.`;
    } else if (totalScore >= actualRate - 40) {
        verdict = `🤔 Borderline for ${universityName}.`;
    } else {
        verdict = `❌ Unlikely to be accepted into ${universityName}.`;
    }

    // Output
    document.getElementById('results').innerHTML = `
        <h3>📊 Results:</h3>
        <p><strong>Olympiad Score:</strong> ${olympiadScore}</p>
        <p><strong>Academics Score:</strong> ${academics}</p>
        <p><strong>Projects Score:</strong> ${projects}</p>
        <p><strong>Total Weighted Score:</strong> ${totalScore}%</p>
        <p>${verdict}</p>
    `;

    // Optional: store results for later use (e.g., exporting, graphs, database)
    const profileData = {
        olympiadScore: parseFloat(olympiadScore),
        academicsScore: academics,
        projectsScore: projects,
        totalScore: parseFloat(totalScore),
        verdict: verdict,
        university: universityName,
        acceptanceRate: acceptanceRate
    };

    console.log("Stored Profile Data:", profileData);
    // You can send `profileData` to a server or store in localStorage/sessionStorage if needed
}
