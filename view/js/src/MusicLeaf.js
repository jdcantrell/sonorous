var MusicLeaf = Backbone.Model.extend({});

var MusicLeafView = Backbone.View.extend({
  className: 'music-leaf media',
  template: _.template(
    '<div class="music-leaf-cover img">' +
      '<img src="<%= img %>">' +
    '</div>' +
    '<div class="music-leaf-content bd">' +
      '<ul>' + 
        '<% _.each(files, function (file, idx) { %>' +
        '<li><a><%= idx %>. <%= file.name %></a>' +
        '<% }); %>' + 
      '</ul>' + 
    '</div>' +
  '</div>'
  ),
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
  }
});

var LeafList = Backbone.Collection.extend({
  model: MusicLeaf
});

var LeafListView = Backbone.View.extend({
  initialize: function () {
    this.collection.on('add', this.renderOne, this);
    this.collection.on('reset', this.render, this);
  },
  render: function () {
    this.collection.forEach(this.renderOne, this);
  },
  renderOne: function (node) {
    var view = new MusicLeafView({model: node});
    view.render();
    this.$el.append(view.el);
  }
})
