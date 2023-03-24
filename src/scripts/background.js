let contextMenuItem = {
  id: "summary-chat-gpt",
  title: "Summary with chat-gpt",
  contexts: ["selection"],
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(async function (clickData) {
  if (clickData.menuItemId === "summary-chat-gpt" && clickData.selectionText) {
    let url = "popup.html?text=" + encodeURIComponent(clickData.selectionText);
    await chrome.windows.create({
      url: url,
      width: 460,
      height: 450,
      type: "popup",
      left: 500,
    });
  }
});
