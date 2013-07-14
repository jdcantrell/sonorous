import json
import random
import urllib
import logging
import os

from werkzeug import SharedDataMiddleware
from MusicFolder import MusicFolder
from flask import Flask

global config
config = {
  'library': '/Volumes/Calcifer/listen'
}

app = Flask(__name__)
ch = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
app.logger.addHandler(ch)

app.wsgi_app = SharedDataMiddleware(app.wsgi_app, {
  '/': os.path.join(os.path.dirname(__file__), '../ui'),
  '/static/music/': '/Volumes/Calcifer/listen'
})

@app.route("/")
def index():
  return get_music_directory('')

@app.route("/music/<path:directory>")
def get_music_directory(directory):
  random.seed(1)
  nodes = []
  leaves = []
  print "DIR: %s" % directory
  folder = MusicFolder("%s/%s" % (config['library'], urllib.unquote(directory)), "/static/music/%s" % directory)
    
  for f in folder.children:
    if (len(f.children)):
      if (len(f.files['images'])):
        images = f.files['images'];
        if len(images) > 4:
          images = random.sample(images, 4)
        nodes.append({"name": f.name, "path": f.web_path, "images": images})
    elif f.files['music']:
      if f.files['images']:
        img = random.choice(f.files['images'])
      else:
        img = {"path": ""}

      leaf = {"files": [], "name": f.name, "path": f.web_path, 'img': img['path']}
      for file in f.files['music']:
        leaf['files'].append({"path": file['path'], "name": file['name']})
      leaves.append(leaf)
  return json.dumps({"nodes": nodes, "leaves": leaves})


if __name__ == "__main__":
  app.run(host="0.0.0.0", threaded=True)
