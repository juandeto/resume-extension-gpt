var formatValue = document.getElementById("format");
var longValue = document.getElementById("long");
var translateValue = document.getElementById("language");
var explainAsFiveValue = document.getElementById("explain-as-five");
var resumeButton = document.getElementById("summary-submit-button");
var formElem = document.querySelector("#summary-form");

var urlParams = new URLSearchParams(window.location.search);
var selectedText = urlParams.get("text");
var MAX_LENGTH_TEXT = 5000;
var answerSummary;
var speed = 35;

explainAsFiveValue?.addEventListener("change", (event) => {
  if (event.target.checked) {
    explainAsFiveValue.value = "checked";
  } else {
    explainAsFiveValue.value = "unchecked";
  }
});

// function that runs when "generate summary" is clicked
formElem?.addEventListener("submit", async (e) => {
  e.preventDefault();

  // call the fastAPI api down here
  try {
    setSpinner(true);
    const fetchOptions = buildFetchOptions();

    const res = await fetch(
      `https://nookdeco.com.ar/gptapi/summary`,
      fetchOptions
    );

    await res.json().then((text) => {
      setSpinner(false);

      if (text?.detail) {
        throw new Error(text?.detail);
      }

      answerSummary = text;
      setSummaryResultHtml();
      fillSummaryHtml();
    });
  } catch (error) {
    setApiError(error);
  }
});

function buildFetchOptions() {
  const data = {
    text: selectedText,
    format: formatValue.value,
    long: Number(longValue.value),
    language: translateValue.value,
    explanation_type: explainAsFiveValue.value === "checked",
  };

  const fetchOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetchOptions;
}

function fillSummaryHtml() {
  switch (formatValue.value) {
    case "paragraphs":
      createParagraphs();
      break;
    case "tweets":
      createTweetsAndBullets();
      break;
    case "bullets":
      createTweetsAndBullets();
      break;
    default:
      break;
  }
}

function createParagraphs() {
  const resumeContainer = document.getElementById("answer-content");

  const paragraphs = answerSummary.split(/\n/g).filter((p) => p !== "");
  let childEl;

  function typewriterEffect(textArray, index) {
    childEl = document.createElement("p");
    childEl.id = `answer-paragraph-${index}`;
    resumeContainer.appendChild(childEl);
    console.log("textArray, index: ", textArray, index);

    if (index < textArray.length) {
      let j = 0;

      const interval = setInterval(() => {
        const answerP = document.getElementById(`answer-paragraph-${index}`);
        answerP.innerHTML += textArray[index].charAt(j);

        j++;

        if (j >= textArray[index].length) {
          clearInterval(interval);
          setTimeout(function () {
            typewriterEffect(textArray, index + 1);
          }, 400); // set a delay before starting the next paragraph
        }
      }, speed);
    }
  }

  typewriterEffect(paragraphs, 0);
}

function createTweetsAndBullets() {
  const resumeContainer = document.getElementById("answer-content");
  const listElem = document.createElement("ul");
  const listText = answerSummary.split(/\n/g).filter((p) => p !== "");
  listElem.id = "list-container";
  listElem.classList.add(formatValue.value);
  resumeContainer.appendChild(listElem);
  let childEl;

  function typewriterEffect(textArray, index) {
    let j = 0;
    childEl = document.createElement("li");
    childEl.id = `answer-li-${index}`;
    listElem.appendChild(childEl);

    if (index < textArray.length) {
      let j = 0;

      const interval = setInterval(() => {
        const answerP = document.getElementById(`answer-li-${index}`);
        answerP.innerHTML += textArray[index].charAt(j);

        j++;

        if (j >= textArray[index].length) {
          clearInterval(interval);
          setTimeout(function () {
            typewriterEffect(textArray, index + 1);
          }, 500); // set a delay before starting the next paragraph
        }
      }, speed);
    }
  }

  typewriterEffect(listText, 0);
}

function setSummaryResultHtml() {
  mainContainer.innerHTML = `
  <div class="title" role="heading">
    <h1>Pollux</h1>
    <img src="./assets/twins2.png" />
  </div>
  <div class="answer-container">
      <h2>Your summary:</h2>
      <div class="answer-content" id="answer-content">
      </div>
    <div class="answer-options">
      <button class="icon-button" id="expand-answer">
        <span class="circle">
          <img src="../assets/expand.svg" alt="copy icon" />
        </span>
        <span class="hover-text">Expand</span>
      </button>
      <button class="icon-button" id="copy-answer">
        <span class="circle">
          <img src="../assets/copy.svg" alt="copy icon" />
        </span>
        <span class="hover-text copy-text">Copy</span>
      </button>
      <button class="icon-button" id="download-answer">
        <span class="circle">
          <img src="../assets/download.svg" alt="download icon" />
        </span>
        <span class="hover-text">Download</span>
      </button>
    </div>
  </div>
        `;
  if (!document.getElementById("script-result-explain")) {
    const script = document.createElement("script");
    script.src = "./src/scripts/result-handlers.js";
    script.id = "script-result-explain";
    document.body.appendChild(script);
  }
}
