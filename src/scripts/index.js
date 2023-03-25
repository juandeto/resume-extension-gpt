const explainBox = document.getElementById("explain-box");
const summaryBox = document.getElementById("summary-box");
const mainBody = document.getElementById("main-container");

summaryBox.addEventListener("click", () => setSummaryHtml());

explainBox.addEventListener("click", () => setExplainAsHtml());

function setSummaryHtml() {
  mainBody.innerHTML = `
    <div class="title" role="heading">
    <h1>IA Summary</h1>
    <h2>Summary selected text in:</h2>
  </div>
  <form id="summary-form" action="#">
  <div class="option-container">
    <label for="format" class="label">Format</label>
    <select name="format" id="format">
        <option value="paragraphs">Paragraphs</option>
        <option value="bullets">Bullets</option>
        <option value="tweets">Tweets</option>
    </select>
  </div>
  <div class="option-container" id="long-container">
      <label for="long" class="label">Long</label>
      <select name="long" id="long">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
      </select>
  </div>
    <div class="option-container">
        <label for="language" class="label">Language:</label>
        <select name="language" id="language">
            <option value="spanish">Español</option>
            <option value="english">English</option>
            <option value="portuguese">Portuguese</option>
            <option value="french">French</option>
        </select>
    </div>
    <div class="option-container checkbox" id="type-explanation">
        <label for="explanation_type" class="label">
            Explain it as I was 5 years old.
        </label>
            <input id="explain-as-five" type="checkbox" value="unchecked" name="explanation_type">
    </div>
    <div class="button-container">
      <button type="submit" id="summary-submit-button">Get Summary</button>
    </div>
  </form>
          `;
  const scriptForMenuOptions = document.createElement("script");
  scriptForMenuOptions.src = "scripts/summary-options-handlers.js";
  document.body.appendChild(scriptForMenuOptions);
  const scriptForControl = document.createElement("script");
  scriptForControl.src = "scripts/summary-control.js";
  document.body.appendChild(scriptForControl);
}

function setExplainAsHtml() {
  mainBody.innerHTML = `
      <div class="title" role="heading">
      <h1>IA Summary</h1>
      <h2>Explain selected text:</h2>
    </div>
    <form action="#" id="explanation-form">
      <div class="option-container">
          <label for="years" class="label">As if I'm</label>
          <select name="years" id="years">
              <option value="adult">Adult explanation</option>
              <option value="5 years old">5 years old</option>
              <option value="10 years old">10 years old</option>
              <option value="14 years old">14 years old</option>
          </select>
      </div>
      <div class="option-container">
        <label for="language" class="label">Language:</label>
        <select name="language" id="language">
            <option value="spanish">Español</option>
            <option value="english">English</option>
            <option value="portuguese">Portuguese</option>
            <option value="french">French</option>
        </select>
    </div>
      <div class="button-container">
        <button type="submit" id="explain-submit-button">Get Explanation</button>
      </div>
    </form>
            `;

  const scriptForControl = document.createElement("script");
  scriptForControl.src = "scripts/explanation-control.js";
  document.body.appendChild(scriptForControl);
}

function setSpinner(state) {
  mainContainer.innerHTML = "";
  if (state) {
    const spinnerContainer = document.createElement("div");
    spinnerContainer.classList.add("spinner-container");
    spinnerContainer.innerHTML = "<div class='loader'>Loading...</div>";
    mainContainer.appendChild(spinnerContainer);
  }
  return;
}

function setApiError(error) {
  mainContainer.innerHTML = "";
  mainContainer.innerHTML = `
    <div class="title" role="heading">
      <h1>IA Resume</h1>
    </div>
    <div class="error-content">${error.message?.detail || error.message}</div>
    <div class="error-explanation">
      Please, close the popup and try again.
    </div>
    `;
}
