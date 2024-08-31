export interface ImageProcessOptions {
  maxWidth: number;
  format: 'avif' | 'webp' | 'jpeg';
  quality: number;
}

export interface ImageProcessor {
  /**
   * Scales an image to the specified maxWidth.
   * @param buffer The buffer containing the image data
   * @param options The process options
   * @returns The output image data
   */
  process(buffer: Buffer, options: ImageProcessOptions): Promise<Buffer>;

  /**
   * Returns whether the image scaler supports scaling the given mime type
   * @param mimeType The mime type
   * @returns True if the scaler can scale the image
   */
  supported(mimeType: string): boolean;
}
