export interface EncryptedFragment {
    id: string;
    data: Buffer;
    index: number;
    totalFragments: number;
    originalFileName: string;
    timestamp: number;
  }
  