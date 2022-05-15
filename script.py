from PIL import Image
import time, os, json
#print(round(time.time()))


#print("hello")

image_dir = "images"
filename = "testSource.png"
datafile = "data.json"

# turn everything below into function
# that receives an image path like "testSource.png"
# and that does its thing

# 2.
# use premiere make a bunch of exactly same image size
# put them all into a folder inside this directory
# use python to iterate of each filename

# open an image
original = Image.open(filename)
width, height = original.size

print("width", width)
print("height", height)

# crop drawing
left = 0
top = height-width
right = width
bottom = height
char_drawing = original.crop((left, top, right, bottom))
# char_drawing.show()

# crop suggestion
char_suggestion = original.crop((0, 0, height-width, height-width))
# char_suggestion.show()

# script will open the suggested character and ask us
# char_suggestion.show()
# to input which character it represent
actual_char = input("what do you see?")
print(actual_char)

# save the images
ts = round(time.time())
folder_name = actual_char+str(ts)
folder_path = image_dir+"/"+folder_name
os.mkdir(folder_path)
# print(folder_path)
drawing_filename = actual_char+"drawing_"+str(ts)+".png"
drawing_save_path = folder_path + "/" + drawing_filename
# print(drawing_save_path)
char_drawing.save(drawing_save_path)

suggestion_filename = actual_char+"suggestion_"+str(ts)+".png"
suggestion_save_path = folder_path + "/" + suggestion_filename
# char_suggestion.save(suggestion_save_path)
# char_drawing.save(drawing_filename)
suggestion_filename = actual_char+"suggestion_"+str(ts)+".png"
char_suggestion.save(suggestion_filename)

# add image names and the char it represent into a json file
with open(datafile,'r+') as file:
          # First we load existing data into a dict.
        file_data = json.load(file)
        print(file_data)
        if actual_char in file_data:
            print("already have this character")
        else:
            file_data[actual_char] = {
                "timestamp": ts,
                "character": actual_char,
                "drawing_path": drawing_save_path,
                "suggestion_path": suggestion_save_path
            }
        print(file_data)
        file.seek(0)
        json.dump(file_data, file, indent=4)
