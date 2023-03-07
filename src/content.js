const resumeButton = document.getElementById("resume-button");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const text = request.text;
  const url = request.url;
  console.log("url: ", url);
  console.log("text: ", text);

  // here we will call the gpt function with the text and the user options
  return "";
});

// function that runs when "generate resume" is clicked
resumeButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: getContentToResume,
  });
});

function getContentToResume() {
  const url = document.querySelector('link[rel="canonical"]')?.href;

  // 0. Check the url and depending on it use different selectors
  // const selectors = getSelectors(url)

  // 0.1. Get the headline string
  // example -> const headline = document.querySelector(selectors.headline)
  // const headlineString = getInnerTextRecursive(headline)

  // 0.2. Get the body string
  // example -> const body = document.querySelector(selectors.body)
  // const bodyString = getInnerTextRecursive(body)

  // 0.3. Join the string
  // const const text = headlineString + ' ' + bodyString

  const text = "hola";

  chrome.runtime.sendMessage({text, url});
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

function getSelectors(url) {
  const selectors = new Map([
    ["lanacion", {headline: "", body: ""}],
    ["clarin", {headline: "", body: ""}],
    ["infobae", {headline: "", body: ""}],
  ]);

  selectors.forEach((value, key) => {
    if (`/${key}/g`.test(url)) {
      return value;
    }
  });
}
