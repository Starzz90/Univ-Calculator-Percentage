function calculateProfileScore() {
  // Get values from the form
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
  const universityName = document.getElementById("universityName").value || '';
  const acceptanceRate = parseInt(document.getElementById("acceptanceRate").value) || 0;

  // Validate weights sum to 100
  const totalWeight = weightOlympiads + weightAcademics + weightProjects;
  if (totalWeight !== 100) {
    alert("The sum of all weights must be 100%");
    return;
  }

  // Calculate score
  const olympiadScore = (international + national + regional) * 5; // Assuming each award adds 5 points
  const academicScore = gpa * 25 + ielts * 2 + awards * 3; // Example formula
  const projectScore = projects * 0.8 + academics * 0.2; // Assuming projects are more impactful

  // Final profile score calculation
  const totalScore = (olympiadScore * weightOlympiads / 100) + (academicScore * weightAcademics / 100) + (projectScore * weightProjects / 100);

  // Display results
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `
    <h3>Calculated Profile Score for ${universityName}</h3>
    <p>Acceptance Rate: ${acceptanceRate}%</p>
    <p><strong>Your Profile Score: </strong>${totalScore.toFixed(2)} / 100</p>
    <h4>Breakdown:</h4>
    <ul>
      <li><strong>Olympiad Score:</strong> ${olympiadScore} (Weight: ${weightOlympiads}%)</li>
      <li><strong>Academic Score:</strong> ${academicScore} (Weight: ${weightAcademics}%)</li>
      <li><strong>Project Score:</strong> ${projectScore} (Weight: ${weightProjects}%)</li>
    </ul>
  `;
}