# Imports PIL module
from PIL import Image
import time, os, json


datafile = "data.json"
image_dir = "new_images2"
source_dir = "new_frames2"


def produce_appearance(filepath, destination):

    # filename = "frame/" + num + ".jpg"

    # open an image
    original = Image.open(filepath)
    width, height = original.size
    print("width", width) # 888
    print("height", height) # 913
    print(filename)

    # crop drawing
    left = 0
    top = (height-width)*3
    right = width-(height-width)
    bottom = height
    char_drawing = original.crop((left, top, right, bottom))
    # char_drawing.show()

    # crop suggestion
    char_suggestion = original.crop((0, 0, (height-width)*8, (height-width)*3))
    # char_suggestion = original.crop((0, 0, (height-width)*3.2, (height-width)*3.2))
    # script will open the suggested character and ask
    char_suggestion.show()
    # ask us to input which character it represents
    actual_char = input("What do you see?")
    print(actual_char)

    # save the images
    ts = round( time.time() )
    folder_name = actual_char+"_"+str(ts)
    folder_path = destination+"/"+folder_name
    os.mkdir(folder_path)
    drawing_filename = actual_char+"_drawing_"+str(ts)+".png"
    drawing_save_path = folder_path + "/" + drawing_filename
    char_drawing.save(drawing_save_path)

    suggestion_filename = actual_char+"_suggestion_"+str(ts)+".png"
    suggestion_save_path = folder_path + "/" + suggestion_filename
    char_suggestion.save(suggestion_save_path)

    # add image names and the char it represent into a json file
    with open(datafile,'r+') as file:
        # First we load existing data into a dict.
        file_data = json.load(file)
        # print(file_data)
        if actual_char in file_data:
            file_data[actual_char]["appearance"].append({
                "timestamp": ts,
                "character": actual_char,
                "drawing_path": drawing_save_path,
                "suggestion_path": suggestion_save_path,
                "sourcefile":filepath.split("/")[-1]
            })
            print("already have this character")
        else:
            file_data[actual_char] = {}

            file_data[actual_char]["appearance"] = [
                {
                    "timestamp": ts,
                    "character": actual_char,
                    "drawing_path": drawing_save_path,
                    "suggestion_path": suggestion_save_path,
                    "sourcefile":filepath.split("/")[-1]
                }
            ]
            # file_data[actual_char] = {
            #     "appearance":[
            #         {
            #             "timestamp": ts,
            #             "character": actual_char,
            #             "drawing_path": drawing_save_path,
            #             "suggestion_path": suggestion_save_path,
            #             "sourcefile":filepath.split("/")[-1]
            #         }
            #     ]
            #     }
        # print(file_data)
        file.seek(0)
        json.dump(file_data, file, indent=4)

images_already_processed = []

with open(datafile,'r+') as file:
    # First we load existing data into a dict.
    file_data = json.load(file)
    keys = file_data.keys()
    for key in keys:
        print(key)
        current_appearance = file_data[key]
        print(current_appearance)
        for appearance in current_appearance["appearance"]:
            # print(appearance["sourcefile"])
            images_already_processed.append(appearance["sourcefile"])
            # print("------------")

print(images_already_processed)

# crop_images = crop_image(filepath)
for filename in os.listdir(source_dir)[0:750]:
    if filename == ".DS_Store":
        continue
    if filename in images_already_processed:
        print("[-] already processed this file:", filename)
        continue
    # print(filename)
    filepath = os.path.join(source_dir, filename)
    produce_appearance(filepath, image_dir)
