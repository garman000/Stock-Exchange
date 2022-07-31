
class SearchForm {
    constructor(htmlElement) {
        this.htmlElement = htmlElement;
    }
    onSearch(callback) {
    const spinner = document.getElementById('spinner')
    const html = `<input type='text' id="search" class="input form-control rounded"/><button class="btn btn-outline-primary search-btn">Search</button><div class="spinner-grow d-none text-info" role="status" id="spinner">
    <span class="visually-hidden">Loading...</span>
  </div>`;
    this.htmlElement.innerHTML = html;
    const input = document.querySelector(".input");
    const button = document.querySelector(".btn");
    input.innerHTML = "";
    button.addEventListener("click", () => {
      callback (input.value);
    });
  }
}


