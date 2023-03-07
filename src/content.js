const resumeButton = document.getElementById("resume-button");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const web = request.web;
  const url = request.url;
  console.log("url: ", url);
  console.log("web: ", web);
  return "";
});

resumeButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: getContentToResume,
  });
});

function getContentToResume() {
  const web = document.body.innerHTML;

  const url = document.querySelector('link[rel="canonical"]')?.href;
  chrome.runtime.sendMessage({web, url});
}

function getInnerTextRecursive(element) {
  let text = "";

  // check if the element has child nodes
  if (element.childNodes.length > 0) {
    // loop over the child nodes
    for (let i = 0; i < element.childNodes.length; i++) {
      const child = element.childNodes[i];
      // if the child is a text node, append its content to the text variable
      if (child.nodeType === Node.TEXT_NODE) {
        text += child.textContent;
      }
      // if the child is an element node, recursively call this function on the child and append its inner text to the text variable
      else if (child.nodeType === Node.ELEMENT_NODE) {
        text += getInnerTextRecursive(child);
      }
    }
  }
  // return the concatenated text
  return text;
}
