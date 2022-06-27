# The following lines of code import the needed libraries to be used in this project
import os
import wx
import shutil
import eel
import cv2
from skimage.metrics import structural_similarity as ssim

eel.init("web")
dir = 'web/assets/uploads/'
#deleting all images in uploads directory before first run
for f in os.listdir(dir):
    os.remove(os.path.join(dir, f))


# Exposing the analyse_images function to javascript
@eel.expose
def analyse_images(original,duplicate):

	# load the images -- the original and the duplicate,
	original = cv2.imread(original)
	duplicate = cv2.imread(duplicate)

	# convert the images to grayscale
	original = cv2.cvtColor(original, cv2.COLOR_BGR2GRAY)
	duplicate = cv2.cvtColor(duplicate, cv2.COLOR_BGR2GRAY)

	# compare the images
	return compare_images(original, duplicate)

# Exposing the retrieve_path function to javascript
@eel.expose
def retrive_path(wildcard="*"):
    app = wx.App(None)
    style = wx.FD_OPEN | wx.FD_FILE_MUST_EXIST
    dialog = wx.FileDialog(None, 'Open', wildcard=wildcard, style=style)
    if dialog.ShowModal() == wx.ID_OK:
        path = dialog.GetPath()
    else:
        path = None
    dialog.Destroy()
    path = shutil.copy(path, 'web/assets/uploads/')

    return path

def compare_images(imageA, imageB):
	# compute the structural similarity
	# index for the images
	s = ssim(imageA, imageB)
	return s

# Start the index.html file
eel.start("index.html")
