function calculateProfileScore() {
  const intl = parseFloat(document.getElementById("international").value);
  const nat = parseFloat(document.getElementById("national").value);
  const reg = parseFloat(document.getElementById("regional").value);

  const gpa = parseFloat(document.getElementById("gpa").value);
  const ielts = parseFloat(document.getElementById("ielts").value);
  const awards = parseFloat(document.getElementById("awards").value);

  const academics = parseFloat(document.getElementById("academics").value);
  const projects = parseFloat(document.getElementById("projects").value);

  const wOly = parseFloat(document.getElementById("weightOlympiads").value);
  const wAca = parseFloat(document.getElementById("weightAcademics").value);
  const wPro = parseFloat(document.getElementById("weightProjects").value);

  const universityName = document.getElementById("universityName").value;
  const acceptanceRate = parseFloat(document.getElementById("acceptanceRate").value);

  if (wOly + wAca + wPro !== 100) {
    alert("The total weight must equal 100%");
    return;
  }

  const olympiadScore = (intl * 3 + nat * 2 + reg * 1);
  const maxOlympiadScore = (10 * 3 + 10 * 2 + 10 * 1); // = 60
  const normalizedOlympiad = (olympiadScore / maxOlympiadScore) * 100;

  const weightedScore = (
    normalizedOlympiad * (wOly / 100) +
    academics * (wAca / 100) +
    projects * (wPro / 100)
  ).toFixed(2);

  // Profile rating interpretation
  let profileRatingText = "";
  const scoreNum = parseFloat(weightedScore);

  if (scoreNum >= 90) profileRatingText = "Excellent Profile";
  else if (scoreNum >= 75) profileRatingText = "Strong Profile";
  else if (scoreNum >= 60) profileRatingText = "Average Profile";
  else profileRatingText = "Needs Improvement";

  // Admission chance blending
  const admissionChance = (
    0.5 * acceptanceRate +
    0.5 * scoreNum
  ).toFixed(2);

  // Scholarship estimation
  let scholarshipChance = 0;
  if (gpa) scholarshipChance += Math.min((gpa / 4.0) * 40, 40);
  if (ielts) scholarshipChance += Math.min((ielts / 9) * 30, 30);
  if (awards) scholarshipChance += Math.min(awards * 3, 30);
  scholarshipChance = Math.min(scholarshipChance, 100).toFixed(2);

  document.getElementById("results").innerHTML = `
    <h3>Results for ${universityName}</h3>
    <p><strong>Weighted Profile Score:</strong> ${weightedScore} / 100</p>
    <p><strong>Profile Rating:</strong> ${profileRatingText}</p>
    <p><strong>Estimated Admission Chance:</strong> ${admissionChance}%</p>
    <p><strong>Estimated Scholarship Probability:</strong> ${scholarshipChance}%</p>
  `;
}