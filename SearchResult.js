class SearchResult {
  constructor(stockInfo) {
    this.stockInfo = stockInfo;
  }
  async renderResults() {
    spinner.classList.remove("d-none");

    let result = this.stockInfo;
    result.innerHTML = "";
    const response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${search.value}&limit=10&exchange=NASDAQ`
    );
    console.log(response);
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
  
      fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${data[i].symbol}`
      )
        .then((response2) => response2.json())
        .then((data2) => {
          const newPercentage = Number(data2.profile.changesPercentage).toFixed(2);
          // const initialName = data[i].name;
          // const initialSymbol = data[i].symbol;
          
          const regex = new RegExp(search.value, 'gi');
          let newCompName = data[i].name.replace(regex, (match) => {
            return `<span style="background-color: red">${match}</span>`;
          });
          const regex2 = new RegExp(search.value, 'gi');
          let newSymbol = data[i].symbol.replace(regex2, (match1) => {
            return `<span style="background-color: red">${match1}</span>`
          })
          

          result.innerHTML += `<p><span class="stockStyle"><span class="resultDisplay"><div class="fullStockInfo"><img class="profileImages"src="${data2.profile.image}"><a href="company.html?symbol=${data[i].symbol}"><span class="nameContainer">${newCompName}</span></a><a href="company.html?symbol=${data[i].symbol}"><strong><span class="symbolContainer">(${newSymbol})</span></strong>
              
              </span><span class="percentContainer" id="searchPercentage${i}" class="sentenceElements">(${newPercentage}%)</div></span></span></p>`;

          if (data2.profile.changesPercentage > 0) {
            document.getElementById(`searchPercentage${i}`).style.color =
              "green";
          } else {
            document.getElementById(`searchPercentage${i}`).style.color = "red";
          }
        });
    }
    spinner.classList.add("d-none");
  }
}
