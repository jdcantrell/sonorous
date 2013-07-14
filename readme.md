Dev notes:
---

Couple of symbolic links to help when using the flask server:
ln -s music_folder ./view/music
ln -s ./view ./build/static

Also here's the gunicorn command if you want to share your dev with
someone, run in ./:


Run python app/app.py or gunicorn -w 4 -b 0.0.0.0:5000 app:app
Also don't use FF if you're testing mp3s

TODO:
 - Display queue (popup from play bar)
 - Icon font for next prev, pause and play
 - breadcrumbs
 - url clean up?
 - decide if leaf nodes should show up expanded or compressed
 - get mp3 titles from file
 - load indicator while loading
 - show number of queued songs
 - shortcuts for queue immediately after
 - hide next when there is no next (same with prev)
 - figure out font treament for now playing

 - stat tracking
 - flac/ogg/other formats
 - actually cache folder look ups instead of rebuilding all the time
 - fix sticky folders
