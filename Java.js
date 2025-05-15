document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("calculatorForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const intl = +document.getElementById("internationalAwards").value;
    const natl = +document.getElementById("nationalAwards").value;
    const reg = +document.getElementById("regionalAwards").value;
    const ielts = +document.getElementById("ieltsScore").value;
    const acad = +document.getElementById("academicsScore").value;
    const proj = +document.getElementById("projectsScore").value;
    const wOly = +document.getElementById("weightOlympiads").value;
    const wAcad = +document.getElementById("weightAcademics").value;
    const wProj = +document.getElementById("weightProjects").value;
    const ieltsReq = +document.getElementById("ieltsRequirement").value;
    const uni = document.getElementById("universityName").value;
    const acceptRate = +document.getElementById("acceptanceRate").value;

    const results = document.getElementById("results");

    if (wOly + wAcad + wProj !== 100) {
      results.innerHTML = `<p style="color: red;">⚠️ Error: The weights must sum to 100.</p>`;
      return;
    }

    const olympiadScore = ((intl * 10) + (natl * 10) + (reg * 10)) / 3;
    const totalScore = (
      olympiadScore * (wOly / 100) +
      acad * (wAcad / 100) +
      proj * (wProj / 100)
    ).toFixed(2);

    const requiredScore = (100 - acceptRate).toFixed(2);
    let message = "";

    if (ielts < ieltsReq) {
      message += `<p>❌ Your IELTS score of ${ielts} is below the requirement of ${ieltsReq} for ${uni}.</p>`;
      message += `<p>Please consider improving your English proficiency.</p>`;
    } else {
      message += `<p>✅ Your IELTS score of ${ielts} meets the requirement of ${ieltsReq} for ${uni}.</p>`;
      message += `<h3>📊 Results</h3>`;
      message += `<p>IELTS: ${ielts}</p>`;
      message += `<p>Olympiad Score: ${olympiadScore.toFixed(2)}</p>`;
      message += `<p>Academics Score: ${acad}</p>`;
      message += `<p>Projects Score: ${proj}</p>`;
      message += `<p>Total Weighted Score: ${totalScore}%</p>`;
      message += `<p>Estimated Required Score: ${requiredScore}%</p>`;
      message += `<p>University Acceptance Rate: ${acceptRate}%</p>`;

      if (totalScore >= requiredScore) {
        message += `<p style="color: green;">✅ Congratulations! You are likely to be accepted into ${uni}.</p>`;
      } else if (totalScore >= requiredScore - 20) {
        message += `<p style="color: orange;">🤔 Borderline! You might have a chance at ${uni}.</p>`;
      } else {
        message += `<p style="color: red;">❌ You may need to improve your profile for better chances at ${uni}.</p>`;
      }
    }

    results.innerHTML = message;
  });
});
