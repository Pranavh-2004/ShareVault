// src/storage/fragmentation.ts
import { Buffer } from 'buffer';

interface FragmentationOptions {
  /**
   * Size of each fragment in bytes
   * @default 1024 (1KB)
   */
  chunkSize?: number;
  /**
   * Minimum allowed chunk size in bytes
   * @default 512 (512B)
   */
  minChunkSize?: number;
  /**
   * Maximum allowed chunk size in bytes
   * @default 5242880 (5MB)
   */
  maxChunkSize?: number;
}

/**
 * Splits a file buffer into smaller fragments of specified size
 * @param fileContent - The buffer containing the file content
 * @param options - Configuration options for fragmentation
 * @returns Array of buffer fragments
 * @throws Error if the input or options are invalid
 */
export const fragmentFile = (
  fileContent: Buffer,
  options: FragmentationOptions = {}
): Buffer[] => {
  // Validate input
  if (!Buffer.isBuffer(fileContent)) {
    throw new Error('Input must be a Buffer');
  }

  if (fileContent.length === 0) {
    throw new Error('Input buffer is empty');
  }

  // Set default options
  const {
    chunkSize = 1024,
    minChunkSize = 512,
    maxChunkSize = 5 * 1024 * 1024, // 5MB
  } = options;

  // Validate chunk size
  if (!Number.isInteger(chunkSize)) {
    throw new Error('Chunk size must be an integer');
  }

  if (chunkSize < minChunkSize) {
    throw new Error(`Chunk size must be at least ${minChunkSize} bytes`);
  }

  if (chunkSize > maxChunkSize) {
    throw new Error(`Chunk size must not exceed ${maxChunkSize} bytes`);
  }

  // Create fragments
  const fragments: Buffer[] = [];
  let position = 0;

  try {
    while (position < fileContent.length) {
      // Calculate the size of the next chunk
      const remainingBytes = fileContent.length - position;
      const currentChunkSize = Math.min(chunkSize, remainingBytes);

      // Create and add the fragment
      const fragment = fileContent.slice(position, position + currentChunkSize);
      fragments.push(fragment);

      // Move to next position
      position += currentChunkSize;
    }

    return fragments;
  } catch (error) {
    throw new Error(`Failed to fragment file: ${error.message}`);
  }
};

/**
 * Utility function to get the total size of all fragments
 * @param fragments - Array of buffer fragments
 * @returns Total size in bytes
 */
export const getTotalFragmentSize = (fragments: Buffer[]): number => {
  return fragments.reduce((total, fragment) => total + fragment.length, 0);
};

/**
 * Utility function to validate if fragments can be reassembled to original size
 * @param fragments - Array of buffer fragments
 * @param originalSize - Original file size in bytes
 * @returns boolean indicating if fragments match original size
 */
export const validateFragments = (
  fragments: Buffer[],
  originalSize: number
): boolean => {
  return getTotalFragmentSize(fragments) === originalSize;
};