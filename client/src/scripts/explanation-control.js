var yearsValue = document.getElementById("years");
var languageValue = document.getElementById("language");

var submitExplanationButton = document.getElementById("explain-submit-button");
var formExplanationElem = document.querySelector("#explanation-form");

var urlParams = new URLSearchParams(window.location.search);
var selectedText = urlParams.get("text");

var answerExplanation;
var speed = 35;

// function that runs when "generate summary" is clicked
formExplanationElem.addEventListener("submit", async (e) => {
  e.preventDefault();
  // call the fastAPI api down here
  try {
    setSpinner(true);
    const fetchOptions = buildExplainFetchOptions();

    const res = await fetch(
      `http://localhost:8000/gptapi/explain`,
      fetchOptions
    );

    await res.json().then((text) => {
      setSpinner(false);

      if (text?.detail) {
        throw new Error(text?.detail);
      }

      answerExplanation = text;
      setExplanationHtml();
      fillExplanationHtml();
    });
  } catch (error) {
    setApiError(error);
  }
});

function buildExplainFetchOptions() {
  const data = {
    text: selectedText,
    years: yearsValue.value,
    language: languageValue.value,
    key: window?.localStorage?.getItem("openai-key") || null,
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

function setExplanationHtml() {
  mainContainer.innerHTML = `
  <div class="title" role="heading">
    <h1>Bluesetta-GPT</h1>
    <img src="../assets/rosetta.png" />
    </div>
  <div class="answer-container">
      <h2>Your explanation:</h2>
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

function fillExplanationHtml() {
  createParagraphs();
}

function createParagraphs() {
  const resumeContainer = document.getElementById("answer-content");

  const splittedAnswer = answerExplanation.split(/\n/g).filter((p) => p !== "");
  let childEl;

  splittedAnswer.forEach((paragraph, idx) => {
    let j = 0;
    const paragraphLength = paragraph.length;
    childEl = document.createElement("p");
    childEl.id = `answer-paragraph-${idx}`;
    resumeContainer.appendChild(childEl);

    setTimeout(() => {
      function typing() {
        if (j >= paragraphLength) return;

        const answerP = document.getElementById(`answer-paragraph-${idx}`);
        answerP.innerHTML += paragraph[j];

        j++;

        setTimeout(typing, speed);
      }
      typing();
    }, idx * paragraph.length * speed);
  });
}
