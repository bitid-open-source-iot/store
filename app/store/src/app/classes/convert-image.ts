export function convert(src, complete) {
    const image: HTMLImageElement = document.createElement('img');
    image.crossOrigin = 'Anonymous';
    image.onload = async () => {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context: CanvasRenderingContext2D = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        complete(canvas.toDataURL('image/png'));
    }
    image.src = src;
};