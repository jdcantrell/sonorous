/* globals Backbone */
var Track = Backbone.Model.extend({
});

var Playlist = Backbone.Collection.extend({
  model: Track,
  initialize: function () {
    //hook into our global events
    this.index = 0;
    this._currentTrack = false;
    this.listenTo(Backbone.Events, 'musicLeafFileSelect', function (event, data) {
      this.queue(data, event.altKey);
    });

    this.on('change:play', function (playing) {this._playing = playing;}, this);
  },
  select: function (track) {
    console.log('select', track);
    this.trigger('select', track, this.index);
    this._currentTrack = track;
  },
  queue: function (data, front) {
    var track = new Track(data);
    if (front) {
      this.add(track, {at: 1});
    }
    else {
      this.add(track);
    }
    console.log('queued', track);
    if (this._currentTrack === false) {
      this.index = this.indexOf(track);
      this.select(track);
    }
  },
  next: function () {
    this.index += 1;
    if (this.length > this.index) {
      this.select(this.at(this.index));
    }
  },
  previous: function () {
    this.index -= 1;
    if (this.index >= 0) {
      this.select(this.at(this.index));
    }
  }
});


var Player = Backbone.View.extend({
  events: {
    'click .play': 'play',
    'click .pause': 'pause',
    'click .stop': 'stop',
    'click .next': 'next',
    'click .prev': 'prev'
  },
  initialize: function () {
    this.collection.on('add', this.updateButtons, this);
    this.collection.on('remove', this.updateButtons, this);
    this.collection.on('select', this.updateCurrentTrack, this);
    this.playerEl = this.$el.find('audio'); 
    this.player = this.playerEl.get(0);
    var self = this;
    this.playerEl.on('timeupdate', function (event) {
      self.updateTime(event);
    });

    this.playerEl.on('ended', function (event) {
      self.collection.next();
    });
  },

  //event handlers
  updateButtons: function () {
    if (this.collection.length > 1) {
      this.$el.find('.next').show();
      this.$el.find('.prev').show();
    }
    else {
      this.$el.find('.next').hide();
      this.$el.find('.prev').hide();
    }
  },
  updateCurrentTrack: function (track, idx) {
    this.displayTrack(track.get('name'));
    this.setAudio(track.get('file_path'));
    this.updatePlay(true);
  },
  setAudio: function (src) {
    $(this.player).attr('src', src);
  },
  updatePlay: function (play) {
    if (play) {
      this.$el.find('.play').hide();
      this.$el.find('.pause').show();
      //this.$el.find('.stop').show();
      this.player.pause();
      this.player.play();
      this._playing = true;
    }
    else {
      this.$el.find('.play').show();
      this.$el.find('.pause').hide();
      //this.$el.find('.stop').hide();
      this._playing = false;
    }
  },
  displayTrack: function (name) {
    this.$el.find('.track').html(name);
  },
  updateTime: function (event) {
    var mins = Math.floor(this.player.currentTime / 60);
    var secs = Math.floor(this.player.currentTime - mins * 60);
    if (mins < 10) {
      mins = '0' + '' + mins;
    }
    if (secs < 10) {
      secs = '0' + '' + secs;
    }
    this.$el.find('.currentTime').html(mins + ':' + secs);
  },

  //click actions
  play: function () {
    this.updatePlay(true);
  },
  stop: function (event) {
    this.player.currentTime = 0;
    this.player.pause();
    this.updatePlay(false);
  },
  pause: function (event) {
    this.player.pause();
    this.updatePlay(false);
  },
  next: function () {
    this.collection.next();
  },
  prev: function () {
    this.collection.previous();
  }
});
