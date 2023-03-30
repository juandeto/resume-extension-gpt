const keyButtonForm = document.getElementById("key-button");
const keyForm = document.getElementById("key-form");
var quitButton = document.getElementById("go-back");

if (keyForm) {
  keyForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const userKey = e.target.key.value;

    window.localStorage.setItem("openai-key", userKey);

    setTimeout(() => {
      if (optionSelected === "explain") {
        setExplainAsHtml();
      } else {
        setSummaryHtml();
      }
    }, 1500);
  });
}

quitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const window = await chrome.windows.getCurrent();

  await chrome.windows.remove(window.id);
});
