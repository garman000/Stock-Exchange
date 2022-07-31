
class Marquee {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;
  }
  
  async load() {
    let marquee = this.htmlElement;
    
    const response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/index`
    );
    const data = await response.json();
    this.displayMarquee(data);
  }

  displayMarquee(data) {
    for (let i = 0; i < data.length; i++) {
      let html = "";
      const marqueeHTML =
        (marquee.innerHTML += `<div id="marqueeContainer"><span class="symbolControl">${data[i].symbol}</span>:<span class="tickerColor">${data[i].price}</span></div>`);
      html += marqueeHTML;

     
    }
  }
}

