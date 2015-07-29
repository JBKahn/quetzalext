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


var formatBeer = function(beer){
  var formatted =  beer.replace(/\s+/g, '+').toLowerCase();
  var removed = formatted.replace(/\"/g, "");
  return removed;
};


var child1 = chrome.contextMenus.create({
  title: "Search on BeerAdvocate",
  parentId: parent1,
  contexts: ["selection"],

  onclick: function(info, tab){
    console.log("child1 item " + info.menuItemId + " was clicked");
    console.log("child1 info: " + JSON.stringify(info));
    console.log("child1 tab: " + JSON.stringify(tab));
    console.log("child1 info['height']: " + JSON.stringify(info['selectionText']));
    var beer = formatBeer(JSON.stringify(info['selectionText']));
    console.log("beer: "+beer);
    // confirm('Getting info for: '+ beer);
    var url = "http://www.beeradvocate.com/search/?q=" + beer + "&qt=beer";
    window.open(url, '_blank');
  }

});

var child2 = chrome.contextMenus.create({
  title: "Search on some other beer website",
  parentId: parent1,
  contexts: ["selection"],

  onclick: function(info, tab){
    console.log("child2 item " + info.menuItemId + " was clicked");
    console.log("child2 info: " + JSON.stringify(info));
    console.log("child2 tab: " + JSON.stringify(tab));
  }


});

