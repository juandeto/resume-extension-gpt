var formatSelectElement = document.getElementById("format");
var longSelectElement = document.getElementById("long");

var FORMATS = {
  PARAGRAPH: "paragraphs",
  BULLET: "bullets",
  TWEET: "tweets",
};

var paragraphLongValues = [
  {value: "1", text: "1"},
  {value: "2", text: "2"},
  {value: "3", text: "3"},
];
var bulletsLongValues = [
  {value: "4", text: "4"},
  {value: "6", text: "6"},
  {value: "8", text: "8"},
  {value: "10", text: "10"},
];

var tweetsLongValues = [
  {value: "1", text: "1"},
  {value: "2", text: "2"},
  {value: "3", text: "3"},
  {value: "4", text: "4"},
  {value: "5", text: "5"},
];

// event that triggers the long options/values to change when format changes
formatSelectElement?.addEventListener("change", () =>
  renderLongValues(formatSelectElement?.value)
);

function renderLongValues(value) {
  switch (value) {
    case FORMATS.PARAGRAPH:
      fillLongValues(paragraphLongValues);
      break;
    case FORMATS.BULLET:
      fillLongValues(bulletsLongValues);
      break;
    case FORMATS.TWEET:
      fillLongValues(tweetsLongValues);
      break;
    default:
      break;
  }
}

function fillLongValues(options) {
  // Remove all previous options
  longSelectElement.innerHTML = "";

  // Add new options based on the array of options
  options.forEach(function (option) {
    const newOption = document.createElement("option");
    newOption.value = option.value;
    newOption.text = option.text;
    longSelectElement.appendChild(newOption);
  });
}
