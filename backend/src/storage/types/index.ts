export interface Storage {
  /**
   * Store an attachment
   * @param attachment The attachment to store
   * @returns The uploaded file name
   */
  upload(filename: string, buffer: Buffer): Promise<string>;
}
