# quotidian-mock
A tabulated subset of the quotidian API, intended for use in integration tests and CI jobs.

### API
```ts
import { Client } from "quotidian-mock";

const client = new Client;
await Client.init();

const commitment = await client.fetchCommitment({
  content: "A quotidian-encodable string.",
  seed: BigInt("0x12ed13100"),
});

const commitments = await client.fetchComitments(
  contents: [
    "A quotidian-encodable string.",
    "Another quotidian-encodable string.",
    "A 'string', if you will; encodable by quotidian",
  ],
  seed: BigInt("0x10203040"),
);

const citation = await client.fetchCitation(
  {
    content: "The quick brown fox jumps over the lazy dog.",
    seed: BigInt(1),
  },
  {
    content: "The cow jumps over the moon.",
    seed: BigInt("0x1111"),
  },
  // common substring: ["jumps", "over", "the"]
  {
    rootWord: 4,
    branchWord: 2,
    length: 3,  
  },
);
```

If the tabulated client doesn't have an entry for the method called on a particular set of arguments, it throws an error like below.
```ts
const missingFromTabulation = "Yet another quotidian-encodable string...";
try {
  const result = await client.fetchCommitment({
    content: missingFromTabulation,
    seed: BigInt(1),
  });
} catch (error: Error) {
  const messageStart = "quotidian tabular client does not have record for";
  const check: true = error.message.substring(len(messageStart)) === messageStart;
}
```

See [inputs.ts](./src/inputs.ts) for the list of tabulated inputs.
