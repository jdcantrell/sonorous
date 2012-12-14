/*globals Backbone, NodeView, NodeList */
var SonorousApp = new (Backbone.Router.extend({
  routes: {
    "": "index",
    "*path": "view"
  },
  initialize: function () {
    this.nodeList = new NodeList();
    this.nodeView = new NodeView({
      collection: this.nodeList
    });
    this.leafList = new LeafList();
    this.leafListView = new LeafListView({
      collection: this.leafList
    });
    $('.content').append(this.nodeView.el);
    $('.content').append(this.leafListView.el);
    //TODO: append leafView
  },
  start: function () {
    Backbone.history.start();
    if (typeof nodes !== "undefined") {
      this.nodeList.reset(nodes);
    }
    if (typeof leaves !== "undefined") {
      this.leafList.reset(leaves);
    }

    this.currentTrack = new Track();
    this.player = new Player({el:$('.controls'), model: this.currentTrack})
  },
  load: function (data) {
    console.log(data);
    if (data.nodes.length) {
      this.nodeList.reset(data.nodes)
    }
    if (data.leaves.length) {
      this.leafList.reset(data.leaves)
    }
  },
  index: function () {
    $.getJSON('/', function (data) {
      SonorousApp.load(data);
    });
  },
  view: function (path) {
    path = path.replace("static/", "")
    console.log('/' + path);
    $.getJSON('/' + path, function (data) {
      SonorousApp.load(data);
    });
  }
}));

$(function () { SonorousApp.start() } );
