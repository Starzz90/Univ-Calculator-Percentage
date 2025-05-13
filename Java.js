function calculateAdmission() {
  const gpa = parseFloat(document.getElementById("gpa").value);
  const ielts = parseFloat(document.getElementById("ielts").value);
  const olympiadScore = parseFloat(document.getElementById("olympiadScore").value);
  const academicScore = parseFloat(document.getElementById("academicScore").value);
  const projectScore = parseFloat(document.getElementById("projectScore").value);
  const olympiadWeight = parseFloat(document.getElementById("olympiadWeight").value);
  const academicWeight = parseFloat(document.getElementById("academicWeight").value);
  const projectWeight = parseFloat(document.getElementById("projectWeight").value);
  const university = document.getElementById("universityName").value;
  const competitiveness = parseFloat(document.getElementById("competitiveness").value);

  const totalWeight = olympiadWeight + academicWeight + projectWeight;
  const resultDiv = document.getElementById("result");

  if (isNaN(gpa) || isNaN(ielts) || isNaN(olympiadScore) || isNaN(academicScore) ||
      isNaN(projectScore) || isNaN(olympiadWeight) || isNaN(academicWeight) ||
      isNaN(projectWeight) || isNaN(competitiveness) || !university) {
    resultDiv.innerHTML = "<div class='error'>Please fill in all fields correctly.</div>";
    return;
  }

  if (totalWeight !== 100) {
    resultDiv.innerHTML = "<div class='error'>Total weight must equal 100.</div>";
    return;
  }

  // Normalize IELTS to 100 scale
  const ieltsNormalized = (ielts / 9) * 100;

  // Weighted Score Calculation
  const weightedScore = (
    (olympiadScore * olympiadWeight) +
    (academicScore * academicWeight) +
    (projectScore * projectWeight)
  ) / 100;

  // Admission Score is average of GPA, IELTS, and weighted score
  let admissionScore = (gpa + ieltsNormalized + weightedScore) / 3;

  // Apply penalty based on competitiveness
  const competitivenessFactor = 1 - (competitiveness / 20); // 10 = -50%, 1 = -5%
  const admissionChance = Math.max(0, Math.min(100, admissionScore * competitivenessFactor));

  // Scholarship is harder – more weighted toward top scores
  const scholarshipBase = (ieltsNormalized * 0.3 + gpa * 0.2 + weightedScore * 0.5);
  const scholarshipPenalty = 1 - (competitiveness / 15); // 10 = -66%, 5 = -33%
  const scholarshipChance = Math.max(0, Math.min(100, scholarshipBase * scholarshipPenalty));

  resultDiv.innerHTML = `
    <h3>Results for <strong>${university}</strong></h3>
    <p><strong>🎓 Admission Chance:</strong> ${admissionChance.toFixed(2)}%</p>
    <p><strong>💰 Scholarship Chance:</strong> ${scholarshipChance.toFixed(2)}%</p>
    <p><em>Note: This is a simulated estimate based on academic and project strength. Actual results may vary.</em></p>
  `;
}
