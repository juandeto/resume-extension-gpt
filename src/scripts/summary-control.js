const mainContainer = document.getElementById("main-container");
const formatValue = document.getElementById("format");
const longValue = document.getElementById("long");
const translateValue = document.getElementById("language");
const explainAsFiveValue = document.getElementById("explain-as-five");
const resumeButton = document.getElementById("summary-submit-button");
const formElem = document.querySelector("#summary-form");

const urlParams = new URLSearchParams(window.location.search);
const selectedText = urlParams.get("text");
const MAX_LENGTH_TEXT = 5000;
var answerSummary;
var speed = 35;

explainAsFiveValue.addEventListener("change", (event) => {
  if (event.target.checked) {
    explainAsFiveValue.value = "checked";
  } else {
    explainAsFiveValue.value = "unchecked";
  }
});

// function that runs when "generate summary" is clicked
formElem.addEventListener("submit", async (e) => {
  e.preventDefault();

  // call the fastAPI api down here
  try {
    setSpinner(true);
    const fetchOptions = buildFetchOptions();

    const res = await fetch(`http://localhost:8000/api/summary`, fetchOptions);

    await res.json().then((text) => {
      setSpinner(false);

      if (text?.detail) {
        throw new Error(text?.detail);
      }

      answerSummary = text;
      setSummaryHtml();
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

function setSummaryHtml() {
  mainContainer.innerHTML = `
  <div class="title" role="heading">
    <h1>IA Resume</h1>
    <h2>Your summary:</h2>
  </div>
  <div class="answer-content" id="answer-content">
  </div>
  <div class="answer-options">
    <button class="icon-button" id="expand-answer">
      <span class="circle">
        <img src="./assets/copy.svg" alt="copy icon" />
      </span>
      <span class="hover-text">Expand</span>
    </button>
    <button class="icon-button" id="copy-answer">
      <span class="circle">
        <img src="./assets/copy.svg" alt="copy icon" />
      </span>
      <span class="hover-text">Copy</span>
    </button>
    <button class="icon-button" id="download-answer">
    <span class="circle">
        <img src="./assets/download.svg" alt="download icon" />
      </span>
      <span class="hover-text">Download</span>
    </button>
  </div>
        `;
  const script = document.createElement("script");
  script.src = "scripts/result-handlers.js";
  document.body.appendChild(script);
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
  const splittedAnswerSummary = answerSummary
    .split(/\n/g)
    .filter((p) => p !== "");
  let childEl;

  splittedAnswerSummary.forEach((paragraph, idx) => {
    let j = 0;
    const paragraphLength = paragraph.length;
    childEl = document.createElement("p");
    childEl.id = `answer-paragraph-${idx}`;
    resumeContainer.appendChild(childEl);

    setTimeout(() => {
      function typing() {
        if (j >= paragraphLength) return;
        console.log("idx: ", idx);
        console.log("j: ", j);
        console.log("paragraphLength inside: ", paragraphLength);
        const answerP = document.getElementById(`answer-paragraph-${idx}`);
        answerP.innerHTML += paragraph[j];

        j++;

        setTimeout(typing, speed);
      }
      typing();
    }, idx * paragraph.length * speed);
  });
}

function createTweetsAndBullets() {
  const resumeContainer = document.getElementById("answer-content");
  const listElem = document.createElement("ul");
  listElem.id = "list-container";
  listElem.classList.add(formatValue.value);
  resumeContainer.appendChild(listElem);
  const splittedAnswer = answerSummary.split(/\n/g).filter((p) => p !== "");
  let childEl;
  let currIdx = console.log("splittedAnswer: ", splittedAnswer);
  splittedAnswer.forEach((paragraph, idx) => {
    let j = 0;
    const paragraphLength = paragraph.length;
    childEl = document.createElement("li");
    childEl.id = `answer-li-${idx}`;
    listElem.appendChild(childEl);

    setTimeout(() => {
      function typing() {
        if (j >= paragraphLength) return;
        console.log("paragraphLength: ", paragraphLength);
        const answerP = document.getElementById(`answer-li-${idx}`);
        answerP.innerHTML += paragraph[j];

        j++;

        setTimeout(typing, speed);
      }

      typing();
    }, idx * speed * paragraphLength);
  });
}
