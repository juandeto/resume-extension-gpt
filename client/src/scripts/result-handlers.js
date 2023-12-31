var copyButton = document?.getElementById("copy-answer");
var copyText = document.querySelector(".copy-text");
var downloadButton = document.getElementById("download-answer");
var answerContent = document.getElementById("answer-content");
var expandButton = document.getElementById("expand-answer");

var paragraphs = document.querySelectorAll(".typewriter");

// methods in the menu options

copyButton?.addEventListener("click", () => {
  copyContent(answerContent.innerText);
  copyText.innerText = "Copied to clipboard";
});

async function copyContent(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.log(error);
  }
}

downloadButton.addEventListener("click", () => {
  downloadText(answerContent.innerText);
});

function downloadText(text) {
  try {
    const link = document.createElement("a");
    const file = new Blob([text], {type: "text/plain"});
    link.href = URL.createObjectURL(file);
    link.download = "answer.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.log(error);
  }
}

expandButton.addEventListener("click", () => {
  expandCurrentWindow();
});

async function expandCurrentWindow() {
  let url = "popup.html";
  const window = await chrome.windows.getCurrent();

  await chrome.windows.update(window.id, {
    width: 393,
    height: 850,
    left: 0,
  });
}
