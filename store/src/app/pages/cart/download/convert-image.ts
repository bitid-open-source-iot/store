export var ConvertImage = async (src: string) => {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	return await addImageProcess(src).then(async (image: HTMLImageElement) => {
		canvas.width = image.width;
		canvas.height = image.height;
		context.drawImage(image, 0, 0, image.width, image.height);
		return await canvas.toDataURL();
	});
};

var addImageProcess = (src) => {
	return new Promise((resolve, reject) => {
		let image = new Image();
		image.crossOrigin = "Anonymous";
		image.onload = () => resolve(image);
		image.onerror = (error) => reject(error);
		image.src = src;
	});
};