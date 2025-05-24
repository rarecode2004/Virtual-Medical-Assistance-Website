import os
import cv2
import numpy as np
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['SECRET_KEY'] = 'some_secret_key'  # just in case

def classify_skin_condition(image_path):
    """
    Classify skin condition by measuring pigmented area in an image.
    Categories (demo):
      - Clear: ratio < 0.05
      - Light Face Disease: 0.05 <= ratio < 0.15
      - Moderate: 0.15 <= ratio < 0.30
      - High: ratio >= 0.30
    """
    image = cv2.imread(image_path)
    if image is None:
        return None, "Error: Cannot load image."
    
    # Convert to HSV color space
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    
    # Define range for pigmented color (brown/dark) - adjust as needed
    lower_brown = np.array([10, 80, 50])
    upper_brown = np.array([20, 255, 200])
    
    # Create mask for pigmented areas
    mask = cv2.inRange(hsv, lower_brown, upper_brown)
    
    # Optional morphological ops to reduce noise
    kernel = np.ones((5, 5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel, iterations=1)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel, iterations=1)
    
    # Calculate pigmented ratio
    pigmented_pixels = cv2.countNonZero(mask)
    total_pixels = image.shape[0] * image.shape[1]
    ratio = pigmented_pixels / total_pixels
    
    # Classify based on ratio thresholds
    if ratio >= 0.30:
        classification = "High"
    elif ratio >= 0.15:
        classification = "Moderate"
    elif ratio >= 0.05:
        classification = "Light Face Disease"
    else:
        classification = "Clear"
    
    return ratio, classification

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        if "image" not in request.files:
            return redirect(request.url)
        file = request.files["image"]
        if file.filename == "":
            return redirect(request.url)
        if file:
            file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
            file.save(file_path)

            ratio, classification = classify_skin_condition(file_path)
            os.remove(file_path)  # Remove the uploaded file after processing

            return render_template("result.html", ratio=ratio, classification=classification)

    return render_template("index.html")

if __name__ == '__main__':
    # Create uploads folder if not exists
    if not os.path.exists(app.config["UPLOAD_FOLDER"]):
        os.makedirs(app.config["UPLOAD_FOLDER"])
    app.run(debug=True)
