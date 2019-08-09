import Contour from './Contour';

class Process {

    createImageData(url) {

        return new Promise((resolve) => {
            let image = new Image();

            image.onload = () => {
                resolve(drawImage());
            };

            image.src = url;

            function drawImage() {

                let imageWidth = image.width;
                let imageHeight = image.height;
                let width = imageWidth + Math.floor(imageWidth/2);
                let height = imageHeight + Math.floor(imageHeight/2);

                let canvas = document.createElement('canvas');
                canvas.setAttribute("width", width);
                canvas.setAttribute("height", height);
                
                let ctx = canvas.getContext('2d');

                let x = Math.floor(width/2) - Math.floor(imageWidth/2);
                let y = Math.floor(height/2) - Math.floor(imageHeight/2);

                ctx.drawImage(image, x, y, width, height);
                let contour = Contour.marchingSquare(canvas, canvas.width/2, canvas.height/2);
                let imagePixel = ctx.getImageData(0, 0, width, height).data;                   

                let imageData = {
                    image : imagePixel,
                    contour : contour
                }

                return imageData;
            }    
        })    
    }
}

export default new Process();