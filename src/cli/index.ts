// import { Command } from "commander";
// import { uploadFile } from "./commands/upload";

// const program = new Command();

// program
//   .name("secure-file-cli")
//   .description("CLI tool for secure file fragmentation and encryption")
//   .version("1.0.0");

// program
//   .command("upload")
//   .description("Upload and encrypt a file")
//   .argument("<filePath>", "path to the file to upload")
//   .action(async (filePath: string) => {
//     try {
//       await uploadFile(filePath);
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Error:", error.message);
//       } else {
//         console.error("Unknown error occurred:", error);
//       }
//       process.exit(1);
//     }
//   });

// program.parse();

import { generateZKP } from "./commands/generate-zkp";
import { retrieve } from "./commands/retrieve";
import { upload } from "./commands/upload";
import { verifyZKP } from "./commands/verify-zkp";
import yargs from "yargs";

yargs
  .command(
    "generate-zkp [data] [randomness]",
    "Generate a zero-knowledge proof",
    (yargs) => {
      yargs
        .positional("data", {
          describe: "Input data",
          type: "string",
          demandOption: true,
        })
        .positional("randomness", {
          describe: "Randomness for commitment",
          type: "string",
          demandOption: true,
        });
    },
    async (argv) => {
      await generateZKP(argv.data as string, argv.randomness as string);
    }
  )
  .command(
    "retrieve [commitment]",
    "Retrieve data using a commitment",
    (yargs) => {
      yargs.positional("commitment", {
        describe: "Commitment value",
        type: "string",
        demandOption: true,
      });
    },
    async (argv) => {
      await retrieve(argv.commitment as string);
    }
  )
  .command(
    "upload [filePath]",
    "Upload a file",
    (yargs) => {
      yargs.positional("filePath", {
        describe: "Path to the file",
        type: "string",
        demandOption: true,
      });
    },
    async (argv) => {
      await upload(argv.filePath as string);
    }
  )
  .command(
    "verify-zkp [proofFilePath] [publicSignalsPath]",
    "Verify a zero-knowledge proof",
    (yargs) => {
      yargs
        .positional("proofFilePath", {
          describe: "Path to proof file",
          type: "string",
          demandOption: true,
        })
        .positional("publicSignalsPath", {
          describe: "Path to public signals file",
          type: "string",
          demandOption: true,
        });
    },
    async (argv) => {
      await verifyZKP(
        argv.proofFilePath as string,
        argv.publicSignalsPath as string
      );
    }
  )
  .demandCommand(1, "You need to specify a command")
  .help().argv;
