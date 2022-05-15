# Imports PIL module
from PIL import Image
import time, os, json


datafile = "data.json"
image_dir = "images"
numbers = []

# "01","02","03","04","05","06","07","08","09","10",
# "11","12","13","14","15","16","17","18","19","20",
# "21","22","23","24","25","26","27","28","29","30",
# "31","32","33","34","35","36","37","38","39","40",
# "41","42","43","44","45","46","47","48","49","50",
# "51","52","53","54","55","56","57","58","59","60",
# "61","62","63","64","65","66","67","68","69","70",
# "71","72","73","74","75","76","77","78","79","80",
# "81","82","83","84","85","86","87","88","89","90",
# "91","92","93","94","95","96","97","98","99","100"

# 1.
# turn everything below into function
# that receives an image path like "testSource.png"
# and that does its thing


# 2.
# use premiere make a bunch of exactly same image size
# put them all into a folder inside this directory
# use python to iterate of each filename in this folder
# for each filename / path use function from step 1.

# any questions any time ask leon fast!!

def crop_image(file_numbers):

    for num in file_numbers:
        filename = "frame/" + num + ".jpg"

        # open an image
        original = Image.open(filename)
        width, height = original.size
        print("width", width) # 768
        print("height", height) # 838

        # crop drawing
        left = 0
        top = (height-width)*2
        right = width-(height-width)
        bottom = height
        char_drawing = original.crop((left, top, right, bottom))
        # char_drawing.show()

        # crop suggestion
        # char_suggestion = original.crop((0, 0, (height-width)*2.2, (height-width)*2.2))
        char_suggestion = original.crop((0, 0, (height-width)*3.2, (height-width)*3.2))
        # script will open the suggested character and ask
        # char_suggestion.show()
        # ask us to input which character it represents
        actual_char = input("What do you see?")
        print(actual_char)

        # save the images
        ts = round( time.time() )
        folder_name = actual_char+"_"+str(ts)
        folder_path = image_dir+"/"+folder_name
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

crop_images = crop_image(numbers)
