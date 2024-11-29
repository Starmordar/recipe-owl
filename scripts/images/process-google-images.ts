import path from 'path';

import { Storage as GoogleStorageClient } from '@google-cloud/storage';
import { config as dotenvConfig } from 'dotenv';
import sharp from 'sharp';

dotenvConfig({ path: path.resolve(__dirname, '../../.env') });

const storage = new GoogleStorageClient({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  },
});

const bucket = storage.bucket(process.env.GOOGLE_BUCKET_NAME as string);

async function listFiles() {
  const [files] = await bucket.getFiles();
  const filenames = files.map(file => file.name);
  return filenames;
}

async function processFiles() {
  const filenames = await listFiles();

  for (const filename of filenames) {
    const file = bucket.file(filename);
    const imageBuffer = await file.download();

    const buffer = imageBuffer[0];
    const outBuffer = await sharp(buffer).resize(750).toFormat('webp', { quality: 70 }).toBuffer();
    console.log(buffer.byteLength, outBuffer.byteLength);
    await file.save(outBuffer);
  }
}

processFiles();
