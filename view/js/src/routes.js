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
    if (nodes) {
      this.nodeList.reset(nodes);
    }
    if (leaves) {
      this.leafList.reset(leaves);
    }
  },
  load: function (data) {
    console.log(data);
  },
  index: function () {
    console.log('resetHAI');
  },
  view: function (path) {
    console.log('http://sonorous.dev:5000/' + path);
    $.getJSON('http://sonorous.dev:5000/' + path, function (data) {
      SonorousApp.load(data);
    });
  }
}));

$(function () { SonorousApp.start() } );
