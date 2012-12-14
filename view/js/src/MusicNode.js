/*globals Backbone, _*/
var MusicNode = Backbone.Model.extend({});

var MusicNodeView = Backbone.View.extend({
  events: {
    'click': "navigate"
  },
  className: 'music-node',
  template: 
    _.template('<ul class="node-cover">' + 
      '<% _.each(images, function (img) { %><li style="background-image:url(\'<%= img %>\')"> <% }); %>' +
    '</ul>' + 
    '<%= name %>'),
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
  },
  navigate: function () {
    SonorousApp.navigate(this.model.get("path"), {trigger: true});
  }
});

var NodeList = Backbone.Collection.extend({
  model: MusicNode
});

var NodeView = Backbone.View.extend({
  initialize: function () {
    this.collection.on('add', this.renderOne, this);
    this.collection.on('reset', this.render, this);
  },
  render: function () {
    this.collection.forEach(this.renderOne, this);
  },
  renderOne: function (node) {
    var view = new MusicNodeView({model: node});
    view.render();
    this.$el.append(view.el);
  }
})
