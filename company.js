const urlParams = new URLSearchParams(window.location.search);
const querySymbol = urlParams.get("symbol");
const result = document.getElementById("result");
const companyLogo = document.getElementById("companyLogo");
const companyName = document.getElementById("companyName");
const companyLink = document.getElementById("companyLink");
const companyData = document.getElementById("companyData");
const stockPrice = document.getElementById("stockPrice");
const percentageChange = document.getElementById("percentageChange");
const spinner = document.getElementById("spinner");

spinner.classList.add("d-none");
async function something() {
  const response = await fetch(
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${querySymbol}`
  );
  const data = await response.json();
  const percentage = Number(data.profile.changesPercentage).toFixed(2);

  companyLogo.innerHTML += `<img src="${data.profile.image}">`;
  companyName.innerHTML += `<strong>${data.profile.companyName}</strong>`;
  companyLink.innerHTML += `<a href="${data.profile.website}">${data.profile.website}</a>`;
  companyData.innerHTML += `${data.profile.description}`;
  stockPrice.innerHTML += `Stock Price: <strong>$${data.profile.price}</strong>`;
  percentageChange.innerHTML += `(${percentage}%)`;
  if (data.profile.changes > 0) {
    document.getElementById("percentageChange").style.color = "green";
  } else {
    document.getElementById("percentageChange").style.color = "red";
  }
}
something();

async function charts() {
  spinner.classList.remove("d-none");

  const response = await fetch(
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${querySymbol}?serietype=line`
  );
  const data = await response.json();
  const labels = [];
  const values = [];
  for (let i = data.historical.length - 1; i >= 0; i--) {
    labels.push(data.historical[i].date);
    values.push(data.historical[i].close);
  }
  new Chart(document.getElementById("myChart"), {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Price ($)",
          borderColor: ["#3cc597"],
          backgroundColor: ["#7FFFD4"],
          radius: 0,
          fill: "origin",
          data: values,
        },
      ],
    },
  });
  spinner.classList.add("d-none");
}
charts();
