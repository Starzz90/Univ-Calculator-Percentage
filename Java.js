document.getElementById("scoreForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const get = id => parseFloat(document.getElementById(id).value) || 0;

  const internationalAwards = get("international");
  const nationalAwards = get("national");
  const regionalAwards = get("regional");

  const academicsScore = get("academics");
  const projectsScore = get("projects");

  const weightOlympiads = get("wOlympiad");
  const weightAcademics = get("wAcademics");
  const weightProjects = get("wProjects");

  const universityName = document.getElementById("universityName").value.trim();
  const acceptanceRate = get("acceptanceRate");

  const output = document.getElementById("output");

  if (weightOlympiads + weightAcademics + weightProjects !== 100) {
    output.textContent = "⚠️ Error: The weights must add up to 100.";
    return;
  }

  const olympiadScore = (
    (internationalAwards * 10 + nationalAwards * 10 + regionalAwards * 10) / 3
  ).toFixed(2);

  const totalScore = (
    olympiadScore * (weightOlympiads / 100) +
    academicsScore * (weightAcademics / 100) +
    projectsScore * (weightProjects / 100)
  ).toFixed(2);

  const threshold = 100 - acceptanceRate;
  let insight = "";

  if (totalScore >= threshold) {
    insight = `✅ Likely accepted into ${universityName}.`;
  } else if (totalScore >= threshold - 30) {
    insight = `🤔 Borderline chance for ${universityName}.`;
  } else {
    insight = `❌ Unlikely to be accepted into ${universityName}. Improve your profile.`;
  }

  output.textContent = `📊 RESULTS:
- Olympiad Score: ${olympiadScore}
- Academics Score: ${academicsScore}
- Projects Score: ${projectsScore}
- Total Weighted Score: ${totalScore}%
- Normalized Total Score: ${totalScore}%

🎓 University Admission Insight:
${insight}`;
});
