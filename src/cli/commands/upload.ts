// import * as fs from "fs/promises";
// import * as path from "path";
// import * as crypto from "crypto";
// import ora from "ora";
// import { fragmentFile } from "../../storage/fragmentation";
// import { EncryptionService } from "../../storage/encryption";
// import { FileStore } from "../../storage/fileStorage";
// import { EncryptedFragment } from "../../types/cli";

// export async function uploadFile(filePath: string): Promise<string> {
//   const spinner = ora("Processing file...").start();

//   try {
//     const fileContent = await fs.readFile(filePath);
//     const fileName = path.basename(filePath);
//     const fileId = crypto.randomBytes(16).toString("hex");

//     spinner.text = "Fragmenting file...";
//     const fragments = fragmentFile(fileContent);

//     spinner.text = "Encrypting fragments...";
//     const encryptionService = new EncryptionService(
//       process.env.ENCRYPTION_KEY!
//     );
//     const fileStore = new FileStore();
//     await fileStore.initialize();

//     spinner.text = "Storing encrypted fragments...";
//     const encryptionPromises = fragments.map(async (fragment, index) => {
//       const encryptedData = await encryptionService.encrypt(fragment);
//       const encryptedFragment: EncryptedFragment = {
//         id: fileId,
//         data: encryptedData,
//         index,
//         totalFragments: fragments.length,
//         originalFileName: fileName,
//         timestamp: Date.now(),
//       };

//       await fileStore.saveFragment(fileId, encryptedFragment);
//     });

//     await Promise.all(encryptionPromises);

//     spinner.succeed(`File uploaded successfully! File ID: ${fileId}`);
//     return fileId;
//   } catch (error) {
//     spinner.fail("Upload failed");
//     throw error;
//   }
// }

import * as fs from "fs";
import * as path from "path";

export async function upload(filePath: string) {
  try {
    console.log(`Uploading file: ${filePath}`);

    if (!fs.existsSync(filePath)) {
      console.error("File does not exist:", filePath);
      return;
    }

    // Simulating upload
    const fileName = path.basename(filePath);
    console.log(`File ${fileName} successfully uploaded.`);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}
