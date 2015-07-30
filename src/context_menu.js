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

var beer_ad = function(term){
  var beer = formatBeer(term);
  var url = "http://www.beeradvocate.com/search/?q=" + beer + "&qt=beer";
  $.ajax({
    url: url,
    type: 'GET',
    success: function(data){
      var html = $.parseHTML(data);
      var beeradvocateBeer = $(html).find('#ba-content').children().last().find('ul').children().first().children().first().attr('href');
      var beeradvcateURL = "http://www.beeradvocate.com" + beeradvocateBeer;
      window.open(beeradvcateURL, '_blank');
    }
  });
};

var google = function(term){
  var url = "https://www.google.com/search?q=" + encodeURIComponent(term);
  window.open(url, '_blank');
};


var child1 = chrome.contextMenus.create({
  title: "Search on BeerAdvocate",
  parentId: parent1,
  contexts: ["selection"],
  onclick: function(info, tab){
    var beer = formatBeer(JSON.stringify(info['selectionText']));
    beer_ad(beer);
  }
});

var child2 = chrome.contextMenus.create({
  title: "Search Google",
  parentId: parent1,
  contexts: ["selection"],

  onclick: function(info, tab){
    console.log("child2 item " + info.menuItemId + " was clicked");
    console.log("child2 info: " + JSON.stringify(info));
    console.log("child2 tab: " + JSON.stringify(tab));
    var beer = info['selectionText'];
    google(beer);
  }
});

var child3 = chrome.contextMenus.create({
  title: "Find best beer from this list",
  parentId: parent1,
  contexts: ["selection"],
  onclick: function(info, tab){
    alert("The best beer is Miller Lite!");
  }
});
