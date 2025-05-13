function calculateProfileScore() {
  const intl = parseInt(document.getElementById('international').value) || 0;
  const national = parseInt(document.getElementById('national').value) || 0;
  const regional = parseInt(document.getElementById('regional').value) || 0;
  const gpa = parseFloat(document.getElementById('gpa').value) || null;
  const ielts = parseFloat(document.getElementById('ielts').value) || null;
  const awards = parseInt(document.getElementById('awards').value) || 0;
  const academics = parseFloat(document.getElementById('academics').value);
  const projects = parseFloat(document.getElementById('projects').value);
  const satMath = parseInt(document.getElementById('satMath').value) || 0;
  const satWriting = parseInt(document.getElementById('satWriting').value) || 0;

  const weightOly = parseFloat(document.getElementById('weightOlympiads').value);
  const weightAcad = parseFloat(document.getElementById('weightAcademics').value);
  const weightProj = parseFloat(document.getElementById('weightProjects').value);

  const universityName = document.getElementById('universityName').value;
  const acceptanceRate = parseFloat(document.getElementById('acceptanceRate').value);

  const totalWeight = weightOly + weightAcad + weightProj;

  if (totalWeight !== 100) {
    alert("Weights must total 100%");
    return;
  }

  // Normalize Olympiad score
  const olympiadScore = Math.min(100, (intl * 15 + national * 10 + regional * 5));

  // Weighted total score
  const totalScore = (
    (olympiadScore * weightOly / 100) +
    (academics * weightAcad / 100) +
    (projects * weightProj / 100)
  );

  // Profile rating out of 100
  const profileRating = Math.round(totalScore);

  // Admission estimate
  let admissionStatus, emoji;
  if (profileRating >= 90 && acceptanceRate > 10) {
    admissionStatus = "Highly Likely";
    emoji = "✅";
  } else if (profileRating >= 75) {
    admissionStatus = "Likely";
    emoji = "🟡";
  } else if (profileRating >= 60) {
    admissionStatus = "Borderline";
    emoji = "⚠️";
  } else {
    admissionStatus = "Unlikely";
    emoji = "❌";
  }

  // Scholarship estimation (based on holistic profile)
  let scholarshipChance = 0;
  if (profileRating >= 90) {
    scholarshipChance += 40;
  } else if (profileRating >= 75) {
    scholarshipChance += 30;
  } else if (profileRating >= 60) {
    scholarshipChance += 20;
  } else {
    scholarshipChance += 5;
  }

  if (gpa !== null) {
    if (gpa >= 3.9) scholarshipChance += 20;
    else if (gpa >= 3.7) scholarshipChance += 10;
  }

  if (ielts !== null) {
    if (ielts >= 8) scholarshipChance += 15;
    else if (ielts >= 7) scholarshipChance += 10;
  }

  if (awards >= 5) scholarshipChance += 10;
  else if (awards >= 2) scholarshipChance += 5;

  const satTotal = satMath + satWriting;
  if (satTotal >= 1500) scholarshipChance += 15;
  else if (satTotal >= 1350) scholarshipChance += 10;

  // Cap at 95%
  scholarshipChance = Math.min(95, scholarshipChance);

  const results = document.getElementById("results");
  results.innerHTML = `
    <h3>Results for ${universityName}</h3>
    <p><strong>Profile Rating:</strong> ${profileRating}/100</p>
    <p><strong>Admission Likelihood:</strong> ${admissionStatus} ${emoji}</p>
    <p><strong>Scholarship Estimate:</strong> ${scholarshipChance}% chance</p>
    <hr>
    <h4>Profile Breakdown:</h4>
    <ul>
      <li><strong>Olympiad Score:</strong> ${olympiadScore}/100</li>
      <li><strong>Academic Score:</strong> ${academics}/100</li>
      <li><strong>Project Score:</strong> ${projects}/100</li>
      <li><strong>GPA:</strong> ${gpa ?? "Not Provided"}/4.0</li>
      <li><strong>IELTS:</strong> ${ielts ?? "Not Provided"}/10</li>
      <li><strong>SAT Math:</strong> ${satMath || "Not Provided"}/800</li>
      <li><strong>SAT Writing:</strong> ${satWriting || "Not Provided"}/800</li>
      <li><strong>Total Awards:</strong> ${awards}</li>
      <li><strong>University Acceptance Rate:</strong> ${acceptanceRate}%/100%</li>
    </ul>
  `;
}