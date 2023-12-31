var mainContainer = document.getElementById("main-container");
var explainBox = document.getElementById("explain-box");
var summaryBox = document.getElementById("summary-box");
var optionSelected = "";
var urlParams = new URLSearchParams(window.location.search);
var selectedText = urlParams.get("text");

var tabUrl = urlParams.get("url");
console.log("url: ", tabUrl);

summaryBox.addEventListener("click", () => {
  optionSelected = "summary";
  setSummaryHtml();
});

explainBox.addEventListener("click", () => {
  optionSelected = "explain";

  setExplainAsHtml();
});

if (!tabUrl && !selectedText?.length) {
  mainContainer.innerHTML = `
    <div class="title" role="heading">
      <h1>Pollux</h1>
      <img src="./assets/twins2.png" /> 
    </div>
    <div >
    <form class="key-error" action="" id="key-form">
        <div class="error-content"><strong>ATENTION!</strong> </br></br> You have to select a text from the screen and then make right click on it to use Pollux.</div>
        <div class="button-container">
        <button type="submit" id="go-back">Quit</button>
        </div>
    </form>
    </div>
          `;
}

function setSummaryHtml() {
  mainContainer.innerHTML = `
    <div class="title" role="heading">
      <h1>Pollux</h1>
      <img src="./assets/twins2.png" /> 
    </div>
    <form id="summary-form" action="#">
  <div class="option-container">
    <label for="format" class="label">
      Format
    </label>
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
    <div class="option-container checkbox-container">
        <label for="explain-as-five" class="label">
            Explain it as I was 5 years old.
        </label>
        <svg
          id="explain-as-five"
          class='checkbox'
          // This element is purely decorative so
          // we hide it for screen readers
          aria-hidden="true"
          viewBox="0 0 16 11"
          fill="none"
        >
          <path d="M1 4.5L5 9L14 1" strokeWidth="2" />
        </svg>
    </div>
    <div class="button-container">
      <button type="submit" id="summary-submit-button">Get Summary</button>
    </div>
  </form>
          `;

  const scriptForMenuOptions = document.createElement("script");
  scriptForMenuOptions.src = "./src/scripts/summary-options-handlers.js";
  scriptForMenuOptions.id = "menu-options.script";
  document.body.appendChild(scriptForMenuOptions);
  const scriptForControl = document.createElement("script");
  scriptForControl.src = "./src/scripts/summary-control.js";
  document.body.appendChild(scriptForControl);
}

function setExplainAsHtml() {
  mainContainer.innerHTML = `
      <div class="title" role="heading">
        <h1>Pollux</h1>
        <img src="./assets/twins2.png" />
      </div>
      <form action="#" id="explanation-form">
      <div class="option-container">
          <label for="years" class="label">As if I'm</label>
          <select name="years" id="years">
              <option value="adult">Adult explanation</option>
              <option value="12 years old">12 years old</option>
              <option value="5 years old">5 years old</option>
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
  scriptForControl.src = "./src/scripts/explanation-control.js";
  scriptForControl.id = "script-for-explain";
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
  if (error.message.includes("Limits")) {
    mainContainer.innerHTML = `
    <div class="title" role="heading">
      <h1>Pollux</h1>
      <img src="./assets/twins2.png" />
    </div>
    <div id="main-container">
      <form class="key-error" action="#" id="key-form">
        <div class="error-content">${
          error.message?.detail || error.message
        }</div>
        <div class="error-explanation">
          <p>You can use <strong>your own OpenAi key</strong> (<a href="https://platform.openai.com/account/api-keys" target="_blank" >how can I get it?</a>) and copied in here.</p>
          <input name="key" type="text" id="key" />
        </div>
        <div class="button-container">
          <button type="submit" id="get-key">Submit</button>
          <p><small>**This key will be stored in your Browser localStorage</small></p>
        </div>
      </form>
    </div>
    `;

    const scriptForErrors = document.createElement("script");
    scriptForErrors.src = "./src/scripts/error-scripts.js";
    scriptForErrors.id = "error-scripts1";
    document.body.appendChild(scriptForErrors);
    return;
  }
  mainContainer.innerHTML = `
<div class="title" role="heading">
    <h1>Pollux</h1>
    <img src="./assets/twins2.png" />
</div>
<div id="main-container">
  <form class="key-error" action="" id="key-form">
    <div class="error-content">${error.message?.detail || error.message}</div>
    <div class="button-container">
      <button type="submit" id="go-back">Quit</button>
    </div>
  </form>
</div>
    `;
  const scriptForErrors = document.createElement("script");
  scriptForErrors.src = "./src/scripts/error-scripts.js";
  scriptForErrors.id = "error-scripts2";
  document.body.appendChild(scriptForErrors);
}

// function getHtmlFile() {
//   chrome.tabs.query({currentWindow: true, active: true}, async function (tabs) {
//     console.log("22 tabs: ", tabs);
//     await chrome.scripting.executeScript({
//       target: {tabId: tabs[0].id},
//       func: () => {
//         const bodyHtml = document.body.innerHTML;
//         console.log("in here!! bodyHtml > ", bodyHtml);
//         const htmlString = bodyHtml.toString();

//         console.log("html: ", htmlString);
//       },
//     });
//   });
// }

// getHtmlFile();
