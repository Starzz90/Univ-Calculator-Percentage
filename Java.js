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
  const maxOlympiadScore = (10 * 3 + 10 * 2 + 10 * 1); // Max = 60
  const olympiadRating = Math.round((totalOlympiadScore / maxOlympiadScore) * 100);
  const academicRating = Math.round(academics);
  const projectRating = Math.round(projects);

  const totalWeight = weightOlympiads + weightAcademics + weightProjects;

  const profileRating = Math.round(
    (olympiadRating * weightOlympiads +
     academicRating * weightAcademics +
     projectRating * weightProjects) / totalWeight
  );

  // Random influence
  const randomFactor = Math.random() * 10;

  let admissionChance = Math.min(
    ((profileRating / 100) * (acceptanceRate * 1.5)) + randomFactor,
    95
  );
  const overallAdmission = 100 - admissionChance;

  let scholarshipChance = 0;
  if (gpa > 3.8) scholarshipChance += 30;
  else if (gpa > 3.5) scholarshipChance += 20;
  else if (gpa > 3.2) scholarshipChance += 10;

  if (ielts >= 7.5) scholarshipChance += 20;
  else if (ielts >= 6.5) scholarshipChance += 10;

  if (awards >= 10) scholarshipChance += 30;
  else if (awards >= 5) scholarshipChance += 15;
  else if (awards >= 2) scholarshipChance += 5;

  if (profileRating >= 80) scholarshipChance += 20;
  else if (profileRating >= 70) scholarshipChance += 10;

  scholarshipChance = Math.min(scholarshipChance + randomFactor, admissionChance);
  const overallScholarship = 100 - scholarshipChance;

  const result = `
    <h3>Results for ${universityName}</h3>
    <p><strong>Profile Rating:</strong> ${profileRating} / 100</p>
    <p><strong>Academic Rating:</strong> ${academicRating} / 100</p>
    <p><strong>Olympiad Rating:</strong> ${olympiadRating} / 100</p>
    <p><strong>Project Rating:</strong> ${projectRating} / 100</p>
    <hr>
    <p><strong>University:</strong> ${universityName}</p>
    <p><strong>Admission:</strong> ${admissionChance.toFixed(1)}% chance of getting in</p>
    <p><strong>Rejection:</strong> ${overallAdmission.toFixed(1)}% chance of rejection</p>
    <p><strong>Scholarship:</strong> ${scholarshipChance.toFixed(1)}% chance</p>
    <p><strong>No Scholarship:</strong> ${overallScholarship.toFixed(1)}% chance</p>
  `;

  document.getElementById("results").innerHTML = result;
}