from flask import Flask, request
from flask_cors import CORS
import torch
from torchvision import transforms
from PIL import Image

app = Flask(__name__)
CORS(app)


model = torch.jit.load("artefacts/pretrained_alexnet.pt")
with open('artefacts/imagenet_classes.txt') as f:
    labels = [line.strip() for line in f.readlines()]
labels = labels[4:]

transform = transforms.Compose([            
 transforms.Resize(256),                    
 transforms.CenterCrop(224),               
 transforms.ToTensor(),                    
 transforms.Normalize(                     
 mean=[0.485, 0.456, 0.406],               
 std=[0.229, 0.224, 0.225]                  
 )])




@app.route('/', methods=['POST'], )
def process():
    body = request.json

    image_data = list(body['imageData'].values())
    
    image = Image.frombytes('RGBA', (body['width'], body['height']), bytes(image_data)).convert("RGB")

    image_transformed = transform(image)
    sample_batch = torch.unsqueeze(image_transformed, 0)
    out = model(sample_batch)
    _, index = torch.max(out, 1)
    percentage = torch.nn.functional.softmax(out, dim=1)[0] * 100
    answer = str(labels[index[0]]).split(', ')[1] + ' with confidence ' + str(round(percentage[index[0]].item(), 1)) + '%'
    return answer
