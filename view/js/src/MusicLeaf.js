var MusicLeaf = Backbone.Model.extend({});

var MusicLeafView = Backbone.View.extend({
  events: {
    'click a': 'play',
  },
  className: 'music-leaf media',
  template: _.template(
    '<h2><%= name %></h2>' +
    '<div class="music-leaf-cover img">' +
      '<img src="<%= img %>">' +
    '</div>' +
    '<div class="music-leaf-content bd">' +
      '<ol>' + 
        '<% _.each(files, function (file, idx) { %>' +
        '<li><a data-idx="<%= idx %>"><%= file.name %></a>' +
        '<% }); %>' + 
      '</pl>' + 
    '</div>' +
  '</div>'
  ),
  play: function (event) {
    var anchor = $(event.currentTarget)
    var file = this.model.get('files')[anchor.data('idx')];
    console.log(anchor, file);
    SonorousApp.currentTrack.set({"name": file.name, "file_path": file.path, "play": true})
  },
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
    this.$el.html("");
    this.collection.forEach(this.renderOne, this);
  },
  renderOne: function (node) {
    var view = new MusicLeafView({model: node});
    view.render();
    this.$el.append(view.el);
  }
})
