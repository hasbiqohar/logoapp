
class Contour {
    
    scanImageData(canvas) {
        let ctx = canvas.getContext('2d');
        let result = [];

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        for(let y = 0; y < canvas.height; y++) {
            for(let x = 0; x < canvas.width; x++) {
                const dot = (y*canvas.width+x)*4+3;
                const data = imageData[dot];

                if(data > 0) {
                    result.push([x, y]);
                }
            }
        }
        
        return result;
    }

    arrangeXY(scanImageDataResult) {
        let data = scanImageDataResult;
        let x = [], y = [];
        let minX, maxX, minY, maxY;

        for(let i = 0; i < data.length; i++) {
            x.push(data[i][0]);
            y.push(data[i][1]);
        }

        minX = Math.min(...x);
        maxX = Math.max(...x);
        minY = Math.min(...y);
        maxY = Math.max(...y);

        return {
            x : {
                min : minX,
                max : maxX
            },
            y : {
                min : minY,
                max : maxY
            }
        }
    }

    hexToRGB(hex, alpha) {
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);

        if (alpha) {
            // return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
            return [r, g, b, alpha];
        } else {
            // return "rgb(" + r + ", " + g + ", " + b + ")";
            return [r, g, b];
        }
    }

    marchingText(canvas) {
        let ctx = canvas.getContext('2d');
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let start = [];
        
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const dot = (y*canvas.width+x)*4+3;
                const data = imageData[dot];

                if(data > 0) {
                    start.push([x, y]);
                }
            }
        }

        return start;

    }

    marchingSquare(canvas, xStart, yStart) {
        let ctx = canvas.getContext('2d');
        let imageData = ctx.getImageData(0,0, canvas.width, canvas.height).data;
        let scanStart = [];        

        for(let y = 0; y < canvas.height; y++) {
            for(let x = 0; x < canvas.width; x++) {
                const dot = (y*canvas.width+x)*4+3;
                const data = imageData[dot];
                if(data > 0) {
                    scanStart.push([x, y]);
                }
            }
        }

        let x = scanStart.length > 0 ? scanStart[0][0] : 0;
        let y = scanStart.length > 0 ? scanStart[0][1] : 0;
        let dx, dy, pdx, pdy;
        let i = 0;
        let startPixel = [];
        let contour = [];
        let contour_Dx = [0, 0, 1, 1, -1, 0, NaN, 1, 0, NaN, 0, 0, -1, 0, -1, -1];
        let contour_Dy = [1, -1, 0, 0, 0, -1, NaN, 0, 1, NaN, 1, 1, 0, -1, 0, 0];

        function imageAlpha(x, y) {
            let dot = (y*canvas.width+x)*4+3;
            let data = imageData[dot];
            return data;
        }

        function marchingDirection() {
            i = 0;

            if(imageAlpha(x-1, y-1)) i+=1;
            if(imageAlpha(x, y-1)) i+=2;
            if(imageAlpha(x-1, y)) i+=4;
            if(imageAlpha(x, y)) i+=8;

            if(i === 6) {
                dx = pdy === 1 ? 1 : -1;
                dy = 0;
            }else if(i === 9) {
                dy = pdx
                dx = 0;
            }else {
                dx = contour_Dx[i];
                dy = contour_Dy[i];
            }

            if(dx!== pdx || dy!== pdy) {
                pdx = dx;
                pdy = dy;   
                if(startPixel.length > 0) {
                    contour.push([x,y]);
                }
            }
            
            x += dx;
            y += dy;

        }

        startPixel = ( x> 0 && y > 0 ) ? [x, y] : null;
        let flag = startPixel ? true : false;       

        while(flag) {
            marchingDirection();
            flag = (x !== startPixel[0] || y !== startPixel[1]);
        }

        return contour;
    }
    
    
}

export default new Contour();