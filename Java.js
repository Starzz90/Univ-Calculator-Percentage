function calculateProfileScore() {
  const intl = parseInt(document.getElementById('international').value) || 0;
  const national = parseInt(document.getElementById('national').value) || 0;
  const regional = parseInt(document.getElementById('regional').value) || 0;
  const gpa = parseFloat(document.getElementById('gpa').value) || null;
  const ielts = parseFloat(document.getElementById('ielts').value) || null;
  const awards = parseInt(document.getElementById('awards').value) || 0;
  const academics = parseFloat(document.getElementById('academics').value);
  const projects = parseFloat(document.getElementById('projects').value);
  const satMath = parseInt(document.getElementById('satMath').value) || null;
  const satWriting = parseInt(document.getElementById('satWriting').value) || null;

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

  // Max Limits
  const maxOlympiadScore = 100;
  const maxAcademicScore = 100;
  const maxProjectScore = 100;
  const maxGPA = 4.0;
  const maxIELTS = 9.0;

  // Calculate scores
  const olympiadScore = Math.min(100, (intl * 15 + national * 10 + regional * 5));
  const weightedTotalScore = (
    (olympiadScore * weightOly / 100) +
    (academics * weightAcad / 100) +
    (projects * weightProj / 100)
  );
  const profileRating = Math.round(weightedTotalScore);

  // Admission % Estimate
  let admissionStatus = "", emoji = "", admissionPercent = 0;
  if (profileRating >= 90 && acceptanceRate > 10) {
    admissionStatus = "Highly Likely"; emoji = "✅"; admissionPercent = 90;
  } else if (profileRating >= 75) {
    admissionStatus = "Likely"; emoji = "🟡"; admissionPercent = 70;
  } else if (profileRating >= 60) {
    admissionStatus = "Borderline"; emoji = "⚠️"; admissionPercent = 50;
  } else {
    admissionStatus = "Unlikely"; emoji = "❌"; admissionPercent = 20;
  }

  // Scholarship Logic
  let scholarshipChance = 0;
  if (profileRating >= 90) scholarshipChance += 40;
  else if (profileRating >= 80) scholarshipChance += 30;
  else if (profileRating >= 70) scholarshipChance += 20;
  else if (profileRating >= 60) scholarshipChance += 10;

  if (gpa !== null) {
    if (gpa >= 3.9) scholarshipChance += 20;
    else if (gpa >= 3.7) scholarshipChance += 10;
    else if (gpa >= 3.5) scholarshipChance += 5;
  }

  if (ielts !== null) {
    if (ielts >= 8) scholarshipChance += 15;
    else if (ielts >= 7) scholarshipChance += 10;
    else if (ielts >= 6.5) scholarshipChance += 5;
  }

  if (awards >= 5) scholarshipChance += 10;
  else if (awards >= 2) scholarshipChance += 5;

  if (satMath && satWriting) {
    const satTotal = satMath + satWriting;
    if (satTotal >= 1500) scholarshipChance += 10;
    else if (satTotal >= 1400) scholarshipChance += 7;
    else if (satTotal >= 1300) scholarshipChance += 5;
  }

  scholarshipChance = Math.min(95, scholarshipChance);

  // Output results
  const results = document.getElementById("results");
  results.innerHTML = `
    <h3>University Profile Evaluation for <u>${universityName}</u></h3>
    <ul>
      <li><strong>Profile Rating:</strong> ${profileRating} / 100</li>
      <li><strong>Olympiad Score:</strong> ${olympiadScore} / ${maxOlympiadScore}</li>
      <li><strong>Academic Score:</strong> ${academics} / ${maxAcademicScore}</li>
      <li><strong>Project Score:</strong> ${projects} / ${maxProjectScore}</li>
      <li><strong>GPA:</strong> ${gpa !== null ? `${gpa} / ${maxGPA}` : "Not Provided"}</li>
      <li><strong>IELTS:</strong> ${ielts !== null ? `${ielts} / ${maxIELTS}` : "Not Provided"}</li>
      <li><strong>SAT Math:</strong> ${satMath !== null ? `${satMath} / 800` : "Not Provided"}</li>
      <li><strong>SAT Writing:</strong> ${satWriting !== null ? `${satWriting} / 800` : "Not Provided"}</li>
      <li><strong>Total Awards:</strong> ${awards}</li>
      <li><strong>University Acceptance Rate:</strong> ${acceptanceRate}%</li>
    </ul>
    <p><strong>Admission Likelihood:</strong> ${admissionStatus} ${emoji} (${admissionPercent}%)</p>
    <p><strong>Scholarship Chance:</strong> ${scholarshipChance}%</p>
  `;
}