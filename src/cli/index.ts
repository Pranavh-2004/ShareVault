import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { generateZKP } from "./commands/generate-zkp";
import { retrieve } from "./commands/retrieve";
import { upload } from "./commands/upload";
import { verifyZKP } from "./commands/verify-zkp";

void yargs(hideBin(process.argv))
  .command({
    command: 'generate-zkp <data> <randomness>',
    describe: 'Generate a zero-knowledge proof',
    builder: (yargs) => {
      return yargs
        .positional('data', {
          describe: 'Input data',
          type: 'string',
          demandOption: true,
        })
        .positional('randomness', {
          describe: 'Randomness for commitment',
          type: 'string',
          demandOption: true,
        });
    },
    handler: async (argv) => {
      await generateZKP(argv.data, argv.randomness);
    },
  })
  .command({
    command: 'retrieve <commitment>',
    describe: 'Retrieve data using a commitment',
    builder: (yargs) => {
      return yargs
        .positional('commitment', {
          describe: 'Commitment value',
          type: 'string',
          demandOption: true,
        });
    },
    handler: async (argv) => {
      await retrieve(argv.commitment);
    },
  })
  .command({
    command: 'upload <filePath>',
    describe: 'Upload a file',
    builder: (yargs) => {
      return yargs
        .positional('filePath', {
          describe: 'Path to the file',
          type: 'string',
          demandOption: true,
        });
    },
    handler: async (argv) => {
      await upload(argv.filePath);
    },
  })
  .command({
    command: 'verify-zkp <proofFilePath> <publicSignalsPath>',
    describe: 'Verify a zero-knowledge proof',
    builder: (yargs) => {
      return yargs
        .positional('proofFilePath', {
          describe: 'Path to proof file',
          type: 'string',
          demandOption: true,
        })
        .positional('publicSignalsPath', {
          describe: 'Path to public signals file',
          type: 'string',
          demandOption: true,
        });
    },
    handler: async (argv) => {
      await verifyZKP(argv.proofFilePath, argv.publicSignalsPath);
    },
  })
  .demandCommand(1, 'You need to specify a command')
  .strict()
  .help()
  .parse();