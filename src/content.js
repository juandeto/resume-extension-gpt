const resumeButton = document.getElementById("resume-button");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const url = request.url;
  console.log("url: ", url);
  // here we will call the gpt function with the text and the user options
  return "";
});

// function that runs when "generate resume" is clicked
resumeButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: getContentToResume,
    args: [tab.url],
  });
});

async function getContentToResume(url) {
  chrome.runtime.sendMessage({url});
}
