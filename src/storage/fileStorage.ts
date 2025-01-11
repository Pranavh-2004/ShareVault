import * as fs from 'fs/promises';
import * as path from 'path';
import { EncryptedFragment } from '../types';

export class FileStore {
  private readonly storageDir: string;

  constructor(storageDir: string = '.file-storage') {
    this.storageDir = storageDir;
  }

  async initialize(): Promise<void> {
    await fs.mkdir(this.storageDir, { recursive: true });
  }

  async saveFragment(fileId: string, fragment: EncryptedFragment): Promise<void> {
    const fragmentDir = path.join(this.storageDir, fileId);
    await fs.mkdir(fragmentDir, { recursive: true });
    
    const metadata = {
      index: fragment.index,
      totalFragments: fragment.totalFragments,
      originalFileName: fragment.originalFileName,
      timestamp: fragment.timestamp
    };

    await Promise.all([
      fs.writeFile(
        path.join(fragmentDir, `${fragment.index}.bin`),
        fragment.data
      ),
      fs.writeFile(
        path.join(fragmentDir, `${fragment.index}.meta.json`),
        JSON.stringify(metadata)
      )
    ]);
  }

  async getFragment(fileId: string, index: number): Promise<EncryptedFragment> {
    const fragmentDir = path.join(this.storageDir, fileId);
    const [data, metadataStr] = await Promise.all([
      fs.readFile(path.join(fragmentDir, `${index}.bin`)),
      fs.readFile(path.join(fragmentDir, `${index}.meta.json`), 'utf-8')
    ]);

    const metadata = JSON.parse(metadataStr);
    return { ...metadata, data, id: fileId };
  }

  async getFragmentCount(fileId: string): Promise<number> {
    const fragmentDir = path.join(this.storageDir, fileId);
    const files = await fs.readdir(fragmentDir);
    return files.filter(f => f.endsWith('.bin')).length;
  }
}