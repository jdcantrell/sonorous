Dev notes:
---

Couple of symbolic links to help when using the flask server:
ln -s music_folder ./view/music
ln -s ./view ./build/static

Also here's the gunicorn command if you want to share your dev with
someone, run in ./build:

gunicorn -w 4 -b 0.0.0.0:5000 serve:app 

