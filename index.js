const wheel = document.getElementById("wheel"),
  spinBtn = document.getElementById("spin-btn"),
  finalValue = document.getElementById("final-value");

// Values of min and max angle for a value

let rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 0 },
  { minDegree: 31, maxDegree: 90, value: 0 },
  { minDegree: 91, maxDegree: 150, value: 0 },
  { minDegree: 151, maxDegree: 210, value: 0 },
  { minDegree: 211, maxDegree: 270, value: 0 },
  { minDegree: 271, maxDegree: 330, value: 0 },
  { minDegree: 331, maxDegree: 360, value: 0 },
];

// Size of pieces
const data = [16, 16, 16, 16, 16, 16];

//Background color of pieces

var pieColors = [
  "#1565c0",
  "#2196f3",
  "#1565c0",
  "#2196f3",
  "#1565c0",
  "#2196f3",
];

// We use pie chart for wheel, so let's create it
let myChart = null;

const setMyChart = () => {
  const labels = [];
  let l = 0;
  for (const i in miniApp.rewardList) {
    labels.push(
      (miniApp.rewardList[i].value ? miniApp.rewardList[i].value : "") +
        " " +
        miniApp.rewardList[i].name
    );
    labels.push("");
    rotationValues[l + 1].value = miniApp.rewardList[i].id;
    l += 2;
  }

  myChart = new Chart(wheel, {
    // Display text on pie chart
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
      // Values on chart
      labels: labels,
      datasets: [
        {
          backgroundColor: pieColors,
          data: data,
        },
      ],
    },
    options: {
      // Responsive chart design
      responsive: true,
      animation: { duration: 0 },
      plugins: {
        tooltip: false,
        legend: {
          display: false,
        },
        // Show labels inside of pie chart
        datalabels: {
          color: "#ffffff",
          formatter: (_, context) =>
            context.chart.data.labels[context.dataIndex],
          font: { size: 24 },
        },
      },
    },
  });
};
// Display value based on randomAngle

const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      spinBtn.disabled = false;
      const findReward = miniApp.rewardList.find(
        (reward) => reward?.id == i.value && reward.value
      );
      finalValue.innerHTML = `<p>${
        findReward?.name ? "" + findReward?.name : "Value"
      }: ${i.value}</p>`;

      setTimeout(() => {
        if (findReward) {
          miniApp.earnReward(findReward);
        } else {
          miniApp.closeApp();
        }
      }, 100);
      // spinBtn.disabled = true;

      console.log(i.value, findReward, miniApp.rewardList);

      break;
    }
  }
};

//Spinner Count

let count = 0;
// 100 rotation for animation and last rotation for result
let resultValue = 101;
// Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  // Generate random degree to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  // Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    // if rotation > 360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
