// calculator.js 
function calculateAdmission() { const universityName = document.getElementById("universityName").value; const acceptanceRate = parseFloat(document.getElementById("acceptanceRate").value); const gpa = parseFloat(document.getElementById("gpa").value); const ielts = parseFloat(document.getElementById("ielts").value); const awards = parseInt(document.getElementById("awards").value); const projects = parseInt(document.getElementById("projects").value); const intl = parseInt(document.getElementById("international").value); const natl = parseInt(document.getElementById("national").value); const regional = parseInt(document.getElementById("regional").value);

// Sanitize inputs const inputs = [gpa, ielts, awards, projects, intl, natl, regional]; if (inputs.some(isNaN)) { document.getElementById("results").innerHTML = "Please fill out all fields."; return; }

// Profile Rating (100 max) let profileRating = 0; profileRating += (gpa / 4.0) * 25; // max 25 profileRating += (ielts / 9.0) * 15; // max 15 profileRating += Math.min(awards, 30); // max 30 profileRating += (projects / 100) * 20; // max 20 profileRating += Math.min(intl * 3 + natl * 2 + regional, 10); // max 10 profileRating = Math.min(profileRating, 100);

// Admission Estimate let admissionRate = acceptanceRate; if (profileRating >= 90) admissionRate += 15; else if (profileRating >= 75) admissionRate += 10; else if (profileRating >= 60) admissionRate += 5; else if (profileRating <= 40) admissionRate -= 10;

admissionRate -= 10; // competitiveness adjustment admissionRate = Math.max(Math.min(admissionRate, 99), 0);

// Scholarship Estimate (Based only on GPA, IELTS, Awards, Projects) let scholarshipRate = 0; scholarshipRate += (gpa / 4.0) * 30; // max 30 scholarshipRate += (ielts / 9.0) * 15; // max 15 scholarshipRate += Math.min(awards, 30); // max 30 scholarshipRate += (projects / 100) * 25; // max 25 scholarshipRate = Math.min(scholarshipRate, 100); scholarshipRate -= 10; // realistic adjustment

// Rejection chance const rejectionChance = 100 - admissionRate;

// Output document.getElementById("results").innerHTML = <strong>University:</strong> ${universityName}<br> <strong>Profile Rating:</strong> ${profileRating.toFixed(2)} / 100<br> <strong>Estimated Admission Chance:</strong> ${admissionRate.toFixed(2)}%<br> <strong>Estimated Scholarship Chance:</strong> ${scholarshipRate.toFixed(2)}%<br> <strong>Rejection Chance:</strong> ${rejectionChance.toFixed(2)}%<br>; }

