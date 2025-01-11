import { Command } from "commander";
import { uploadFile } from "./commands/upload";

const program = new Command();

program
  .name("secure-file-cli")
  .description("CLI tool for secure file fragmentation and encryption")
  .version("1.0.0");

program
  .command("upload")
  .description("Upload and encrypt a file")
  .argument("<filePath>", "path to the file to upload")
  .action(async (filePath: string) => {
    try {
      await uploadFile(filePath);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unknown error occurred:", error);
      }
      process.exit(1);
    }
  });

program.parse();
