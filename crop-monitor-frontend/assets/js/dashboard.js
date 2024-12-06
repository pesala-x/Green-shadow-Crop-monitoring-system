// Line Chart
const lineCtx = document.getElementById("lineChart").getContext("2d");
new Chart(lineCtx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Juny", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Yield (kg)",
        data: [100, 180, 200, 180, 120, 240, 246, 130, 180, 200, 200, 188],
        borderColor: "#4bc0c0",
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        fill: true,
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Yield (kg)",
        },
      },
    },
  },
});

// Bar Chart
const barCtx2 = document.getElementById("barChart2").getContext("2d");
new Chart(barCtx2, {
  type: "bar",
  data: {
    labels: ["Field 1", "Field 2", "Field 3", "Field 4"],
    datasets: [
      {
        label: "Performance Score",
        data: [75, 90, 80, 95],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Pie Chart
const pieCtx2 = document.getElementById("pieChart2").getContext("2d");
new Chart(pieCtx2, {
  type: "pie",
  data: {
    labels: ["Fertilizers", "Pesticides", "Water"],
    datasets: [
      {
        data: [40, 30, 30],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  },
});
