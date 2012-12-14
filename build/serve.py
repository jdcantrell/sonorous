import json
import random
from MusicFolder import MusicFolder
from flask import Flask
app = Flask(__name__)

@app.route("/")
def index():
  random.seed(1)
  data = []
  folder = MusicFolder("/Volumes/Twoflower/listen/", "/music/")
  for f in folder.children:
    if (len(f.files['images'])):
      images = f.files['images'];
      if len(images) > 4:
        images = random.sample(images, 4)
      data.append({"name": f.name, "path": f.web_path, "images": images})
  return json.dumps(data)

if __name__ == "__main__":
  index()
  app.run()
