import * as readline from 'readline';
import * as util from 'util';

import { all } from "iso-3166-1";
import { Address, encrypt, encryptAddress } from "../src/helpers/enc";
import { exit } from 'process';
import { abi as EPSAbi } from "../src/EthereumPostalService.json";

import { Command } from "commander";
import { ethers } from 'ethers';

let program = new Command();

program.requiredOption("-r, --rpcUrl <rpcUrl>")
    .requiredOption("-a, --address <address>")
    .parse(process.argv);

run().then(_ => exit(1)).catch(err => { console.error(err); exit(-1) })


async function run() {
    let opts = program.opts();
    let provider = new ethers.providers.JsonRpcProvider(opts.rpcUrl);
    let contract = new ethers.Contract(opts.address, EPSAbi, provider);
    let pubkey = await contract.encryptionPubKey();


    let isCountry = (countryCode: string) =>
        all().filter(
            (country: {
                country: string;
                alpha2: string;
                alpha3: string;
                numeric: string;
            }) => {
                return (
                    countryCode === country.alpha2
                );
            }
        ).length === 1;



    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // @ts-ignore
    let question: (str: string) => Promise<string> = util.promisify(rl.question).bind(rl);

    let split = await question("Encrypt address (a) or message (m)?\n")
    if (split === "a") {
        let addressLine1 = await question("Address Line 1?\n");
        let addressLine2 = await question("Address Line 2?\n");
        let city = await question("City?\n");
        let countryCode = await question("Country code?\n");

        if (!isCountry(countryCode)) {
            console.error(`${countryCode} is an invalid country code.`);
            exit(-1);
        }

        let postalOrZip = await question("Postal or zip?\n")
        let name = await question("Name?\n")
        let address: Address = {
            addressLine1,
            addressLine2,
            city,
            countryCode,
            postalOrZip,
            name
        }

        let encryptedAddr = encryptAddress(address, pubkey);
        console.log("Encrypted address: ", encryptedAddr);
    } else if (split === "m") {
        let msg: string = await question("Message?\n");
        let encrypted = encrypt(msg, pubkey);
        console.log("Encrypted: ", encrypted);
    } else {
        console.error("Invalid.");
        exit(-1);
    }
}


export { }