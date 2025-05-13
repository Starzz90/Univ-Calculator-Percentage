function calculateProfileScore() {
  const international = parseInt(document.getElementById("international").value) || 0;
  const national = parseInt(document.getElementById("national").value) || 0;
  const regional = parseInt(document.getElementById("regional").value) || 0;
  const gpa = parseFloat(document.getElementById("gpa").value) || 0;
  const ielts = parseFloat(document.getElementById("ielts").value) || 0;
  const awards = parseInt(document.getElementById("awards").value) || 0;
  const academics = parseFloat(document.getElementById("academics").value) || 0;
  const projects = parseFloat(document.getElementById("projects").value) || 0;
  const weightOlympiads = parseFloat(document.getElementById("weightOlympiads").value) || 0;
  const weightAcademics = parseFloat(document.getElementById("weightAcademics").value) || 0;
  const weightProjects = parseFloat(document.getElementById("weightProjects").value) || 0;
  const universityName = document.getElementById("universityName").value;
  const acceptanceRate = parseFloat(document.getElementById("acceptanceRate").value) || 0;

  const totalOlympiadScore = (international * 3 + national * 2 + regional * 1);
  const maxOlympiadScore = 10 * 3 + 10 * 2 + 10 * 1; // Max = 60
  const olympiadScorePercent = (totalOlympiadScore / maxOlympiadScore) * 100;

  const totalWeight = weightOlympiads + weightAcademics + weightProjects;
  const normalizedOlympiad = (olympiadScorePercent || 0);
  const normalizedAcademic = (academics || 0);
  const normalizedProjects = (projects || 0);

  const profileScore = (
    (normalizedOlympiad * weightOlympiads + normalizedAcademic * weightAcademics + normalizedProjects * weightProjects)
    / totalWeight
  );

  // Profile Ratings
  const olympiadRating = Math.round((totalOlympiadScore / maxOlympiadScore) * 100);
  const academicRating = Math.round((academics / 100) * 100);
  const projectRating = Math.round((projects / 100) * 100);
  const profileRating = Math.round(profileScore);

  // Randomized Admission and Scholarship chances
  const randomFactor = Math.random() * 10;  // Random factor for slight variation

  // Estimate Admission Likelihood based on Profile and University Acceptance Rate
  let admissionChance = (profileScore / 100) * (acceptanceRate * 1.5);
  admissionChance = (Math.min(admissionChance + randomFactor, 95)); //Cap at 95%
  overallchance = 100-admissionChance;
  // Scholarship Chance based on holistic profile
  let scholarshipChance = 0;
  if (gpa > 3.8) scholarshipChance += 30;
  else if (gpa > 3.5) scholarshipChance += 20;
  else if (gpa > 3.2) scholarshipChance += 10;

  if (ielts >= 7.5) scholarshipChance += 20;
  else if (ielts >= 6.5) scholarshipChance += 10;

  if (awards >= 10) scholarshipChance += 30;
  else if (awards >= 5) scholarshipChance += 15;
  else if (awards >= 2) scholarshipChance += 5;

  if (profileScore >= 80) scholarshipChance += 20;
  else if (profileScore >= 70) scholarshipChance += 10;

  scholarshipChance = (Math.min(scholarshipChance + randomFactor, admissionChance)); //Keep realistic: can't get scholarship without being admitted
  overallscholarship = 100 - scholarshipChance;
  // Emoji Results
  const getStatusEmoji = (percent) => {
    if (percent >= 80) return "🟢 Likely";
    if (percent >= 60) return "🟡 Borderline";
    return "🔴 Unlikely";
  };

  const results = `
    <h3>Results for ${universityName}</h3>
    <p><strong>Profile Rating:</strong> ${profileRating} / 100</p>
    <p><strong>Academic Rating:</strong> ${academicRating} / 100</p>
    <p><strong>Olympiad Rating:</strong> ${olympiadRating} / 100</p>
    <p><strong>Project Rating:</strong> ${projectRating} / 100</p>
    <hr>
    <p><strong>University:</strong> ${universityName}</p>
    <p><strong>Admission Chance:</strong> ${overallchance.toFixed(1)}% (${getStatusEmoji(overallchance)})</p>
    <p><strong>Scholarship Chance:</strong> ${overallscholarship.toFixed(1)}% (${getStatusEmoji(overallscholarship)})</p>
  `;

  document.getElementById("results").innerHTML = results;
}