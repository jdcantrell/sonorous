var Track = Backbone.Model.extend({});

var Player = Backbone.View.extend({
  events: {
    'click .play': 'play',
    'click .pause': 'pause',
    'click .stop': 'stop',
    'click .next': 'next',
    'click .prev': 'prev',
  },
  initialize: function () {
    this.model.on('change:play', this.play, this)
    this.model.on('change:file_path', this.displayTrack, this)
    this.player = $('#player')[0]; 
  },
  displayTrack: function () {
    this.$el.find('.track').html(this.model.get("name"));
    if (this.model.get('play')) {
      this.play();
    }
  },
  play: function () {
    if (this.model.get('play')) {
      this.player.pause();
      $(this.player).attr('src', this.model.get('file_path'));
      this.player.play();
    }
    else {
      this.player.pause();
    }
  },
  stop: function (event) {
    this.player.pause();
    this.currentTime = 0;
  },
  pause: function (event) {
    this.player.pause();
  },
  next: function () {},
  prev: function () {},
});
