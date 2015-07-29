function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
  alert(info.selectionText + ". Great choice, I drink that one a lot");
}

var parent1 = chrome.contextMenus.create({
  title: "Quetzale",
  contexts: ["selection"]
});

var child1 = chrome.contextMenus.create({
  title: "Search on BeerAdvocate",
  parentId: parent1,
  contexts: ["selection"],
  onclick: genericOnClick
});

var child2 = chrome.contextMenus.create({
  title: "Search on some other beer website",
  parentId: parent1,
  contexts: ["selection"],
  onclick: genericOnClick
});

