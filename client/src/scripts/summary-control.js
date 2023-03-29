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
  console.log("splittedAnswer: ", splittedAnswer);
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
