let contextMenuItem = {
  id: "pollux",
  title: "Explain or summarize with Pollux",
  contexts: ["selection"],
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(async function (clickData) {
  if (clickData.menuItemId === "pollux" && clickData.selectionText) {
    let url = "popup.html?text=" + encodeURIComponent(clickData.selectionText);
    await chrome.windows.create({
      url: url,
      width: 453,
      height: 685,
      type: "popup",
      left: 0,
    });
  }
});
