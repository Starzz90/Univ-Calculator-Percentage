document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("calculatorForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get user inputs
    const intl = parseInt(document.getElementById("internationalAwards").value);
    const natl = parseInt(document.getElementById("nationalAwards").value);
    const reg = parseInt(document.getElementById("regionalAwards").value);
    const ielts = parseFloat(document.getElementById("ieltsScore").value);
    const acad = parseFloat(document.getElementById("academicsScore").value);
    const proj = parseFloat(document.getElementById("projectsScore").value);
    const wOly = parseFloat(document.getElementById("weightOlympiads").value);
    const wAcad = parseFloat(document.getElementById("weightAcademics").value);
    const wProj = parseFloat(document.getElementById("weightProjects").value);
    const ieltsReq = parseFloat(document.getElementById("ieltsRequirement").value);
    const uni = document.getElementById("universityName").value;
    const acceptRate = parseFloat(document.getElementById("acceptanceRate").value);

    const resultsDiv = document.getElementById("results");

    if (wOly + wAcad + wProj !== 100) {
      const resultHTML = `<p style="color: red;">⚠️ Error: The weights must sum to 100.</p>`;
      resultsDiv.innerHTML = resultHTML;
      return;
    }

    const internationalScore = intl * 10;
    const nationalScore = natl * 10;
    const regionalScore = reg * 10;
    const olympiadScore = ((internationalScore + nationalScore + regionalScore) / 3).toFixed(2);
    const totalScore = (
      olympiadScore * (wOly / 100) +
      acad * (wAcad / 100) +
      proj * (wProj / 100)
    ).toFixed(2);
    const requiredScore = (100 - acceptRate).toFixed(2);

    let resultHTML = "";

    if (ielts < ieltsReq) {
      resultHTML += `<p>❌ Your IELTS score of ${ielts} is below the requirement of ${ieltsReq} for ${uni}.</p>`;
      resultHTML += `<p>Please consider retaking the IELTS or improving your English proficiency.</p>`;
    } else {
      resultHTML += `<p>✅ Your IELTS score of ${ielts} meets the requirement of ${ieltsReq} for ${uni}.</p>`;
      resultHTML += `<h3>📊 Results</h3>`;
      resultHTML += `<p><strong>IELTS Score:</strong> ${ielts}</p>`;
      resultHTML += `<p><strong>Olympiad Score:</strong> ${olympiadScore}</p>`;
      resultHTML += `<p><strong>Academic Score:</strong> ${acad}</p>`;
      resultHTML += `<p><strong>Projects Score:</strong> ${proj}</p>`;
      resultHTML += `<p><strong>Total Weighted Score:</strong> ${totalScore}%</p>`;
      resultHTML += `<p><strong>Estimated Required Score:</strong> ${requiredScore}%</p>`;
      resultHTML += `<p><strong>University Acceptance Rate:</strong> ${acceptRate}%</p>`;

      if (totalScore >= requiredScore) {
        resultHTML += `<p style="color: green;">✅ Congratulations! You are likely to be accepted into ${uni}.</p>`;
      } else if (totalScore >= requiredScore - 20) {
        resultHTML += `<p style="color: orange;">🤔 Borderline! You might still have a chance at ${uni}.</p>`;
      } else {
        resultHTML += `<p style="color: red;">❌ You may need to improve your profile for better chances at ${uni}.</p>`;
      }
    }

    // Set final result
    resultsDiv.innerHTML = resultHTML;

    // Optional: Now you can use resultHTML elsewhere if needed
    console.log("Final Output Stored in Variable:", resultHTML);
  });
});
