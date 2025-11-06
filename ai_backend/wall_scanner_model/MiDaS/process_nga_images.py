import os
from PIL import Image

# -----------------------------------------------------------
# 1. Configuration: Update these variables for your project
# -----------------------------------------------------------
# The folder where your new paintings are stored
input_dir = "new_paintings" 

# The folder where you want to save the processed, resized images
# This can be the same as the input_dir if you want to overwrite them
output_dir = "new_paintings" 

# Desired dimensions for the resized images (e.g., for model input)
image_size = (224, 224) 
# -----------------------------------------------------------

# Create the output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# List all image files in the input directory
image_files = [f for f in os.listdir(input_dir) if f.endswith(('.jpg', '.jpeg', '.png', '.gif'))]

# Loop through each image file
for filename in image_files:
    try:
        # Create the full path to the input and output images
        input_path = os.path.join(input_dir, filename)
        output_path = os.path.join(output_dir, filename)

        # Open the image file
        with Image.open(input_path) as img:
            # Convert the image to RGB mode
            img = img.convert("RGB")
            
            # Resize the image to the desired dimensions
            img = img.resize(image_size)
            
            # Save the processed image
            img.save(output_path)
            print(f"✅ Processed and saved: {output_path}")

    except Exception as e:
        print(f"❌ Failed to process {filename}: {e}")