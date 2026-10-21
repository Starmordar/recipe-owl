const maxSide = 1500;
const quality = 0.85;

const shrunkImages = new WeakMap<File, Promise<File>>();

// Phone photos often weigh several megabytes, more than a server action accepts (1 MB),
// and the server keeps only a 750px wide copy, so the photo is scaled down before the upload.
// The promise is reused for the same file, and for the shrunk one, so the form can await a photo
// that is still being shrunk without doing the work twice.
function shrinkImage(file: File): Promise<File> {
  let shrunkImage = shrunkImages.get(file);

  if (!shrunkImage) {
    shrunkImage = scaleDown(file);
    shrunkImages.set(file, shrunkImage);
    shrunkImage.then(image => shrunkImages.set(image, Promise.resolve(image)));
  }

  return shrunkImage;
}

async function scaleDown(file: File): Promise<File> {
  try {
    const image = await loadImage(file);
    const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);

    const context = canvas.getContext('2d');
    if (!context) return file;

    // JPEG has no transparency, so transparent pixels would otherwise turn black.
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>(resolve =>
      canvas.toBlob(resolve, 'image/jpeg', quality),
    );
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]*$/, '') || 'photo';
    return new File([blob], `${name}.jpg`, { type: 'image/jpeg' });
  } catch {
    // The browser couldn't decode the photo, so it's uploaded as it is.
    return file;
  }
}

// An <img> applies the photo's EXIF orientation, so the canvas copy isn't rotated.
// It waits for "load" rather than decode(), which Chrome doesn't settle until the page draws a frame,
// so it would hang while the tab is in the background.
function loadImage(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  const image = new Image();

  return new Promise<HTMLImageElement>((resolve, reject) => {
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  }).finally(() => URL.revokeObjectURL(url));
}

export { shrinkImage };
