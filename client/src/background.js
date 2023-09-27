// let contextMenuItem = {
//   id: "pollux",
//   title: "Explain or summarize with Pollux",
//   contexts: ["selection"],
// };
// chrome.contextMenus.create(contextMenuItem);

// chrome.contextMenus.onClicked.addListener(async function (clickData) {
//   if (clickData.menuItemId === "pollux" && clickData.selectionText) {
//     let url = "popup.html?text=" + encodeURIComponent(clickData.selectionText);
//     await chrome.windows.create({
//       url: url,
//       width: 453,
//       height: 685,
//       type: "popup",
//       left: 0,
//     });
//   }
// });

chrome.action.onClicked.addListener(async (tab) => {
  let htmlString = "";
  await chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    chrome.scripting.executeScript(
      {
        target: {tabId: tabs[0].id},
        func: () => {
          const bodyHtml = document.body.innerHTML;
          console.log("in here!! bodyHtml > ", bodyHtml);
          htmlString = bodyHtml.toString();
        },
      },
      function () {
        let url = "popup.html?html=" + encodeURIComponent(htmlString);
        chrome.windows.create({
          url,
          width: 453,
          height: 685,
          type: "popup",
          left: 0,
        });
      }
    );
  });
});
