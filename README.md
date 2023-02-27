![logo](public/EPS-01.png)

# EPS Portable Widget

This simple react app allows any react frontend to include a simple EPS widget for sending mail.

See it in action at: https://ethereumpostalservice.com

Allows default encrypted address configuration, allowing mail to be sent to a physical address from Ethereum without revealing to users where the mail is headed. These encrypted addresses will be unenrypted to the EPS backend and service providers.

## Install in React app

### Standard form

- Install: `yarn add https://github.com/EthereumPostalService/eps-widget`

```jsx
<EthMailForm address={"0x2156fcCff55637317D211B62318007309378fB95"} />
```

### Preset address

- Install: `yarn add https://github.com/EthereumPostalService/eps-widget`
- Pre-encrypt address: `ts-node ./scripts/encrypt-interactive.ts -r https://opt-mainnet.g.alchemy.com/v2/<ALCHEMY API KEY> -a 0x2156fcCff55637317D211B62318007309378fB95`

```jsx
<EthMailForm
  address={"0x2156fcCff55637317D211B62318007309378fB95"}
  defaultEncryptedAddress={{
    addressLine1:
      "04ada685a0501b7a2af948e3a08d857dd915ed6c87e219f1caccf9d53c90b6ca9b8ed1afff9b71d98069bf26f79aa18aa599855634bb15b265f0b75a7cf2eabb1cd10b8c8be69ae7002a5de301ca5525330443e1915215338edf8a3df519d41281b7b76b341b3e82c16be4f1673abe9837ff",
    addressLine2:
      "04ef1f40c044b0d9972c481c2cf9414e1eb240f0852fa1c677bfd1b13719f52a1e38e4289c6658cf4ea6cc7555c37ccf9f99943864c44fe8e7422270df0c4f6029e2ccaa8cbb47575902f697172382a9a75713edb1fa7c36d06a504c8ec481ac56",
    city: "04a19fa79bc63ccd1367a98b83897865f41422d8d163b1b2d393389c40a40381275d134a6af9fea2e5701b26e4d2d7dc79940fef9d7e0e106fb4001ea5ee4755b66ae2bbf5f271168fb6c96cf447106586aed453f6a31207d015a411b0f89a55b0fd8343fe0a579d71dc77a15dd6",
    countryCode:
      "04f13eb9af3ad911d3afbb26da18e35a1b10ebc14ad436ce617c35b397d9fc397abe647a6c52168a4b7b25805f970e31f6899eddbab1cd1ffea351f3e6c1827ed9c4b95b37a850a1f8d7bde952d688dc79519f604aae27bfe6cefb0f369b88c95c81be",
    postalOrZip:
      "04362def7cecd764811a0ab04138e4592380b036da152de0c1daa5d8117818d8df0bb59ff0b6fb1e01e2dc72ef5d212f60dd7ca144383fc8782951f4ab94630976e5fddf7ac935e2a693030292948fa88c4ad4dd59f09f4ba65e04ddab9261dced1ef367e70f",
    name: "04040054aff843e9da9aba860a2781ccda20db104d22b55d34a060bd384cd752fd73f5bb7be798bc2c0f9c45b2dcfb88f495e306649ba6d23498e085cc0eaa77678c0e640503a6a63ee85a54a75a5f7db4fbfde6a4614a796bdfe4944802953287787686bec1",
  }}
/>
```
