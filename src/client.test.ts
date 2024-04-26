import { Client } from "./client";
import mocks from "./inputs";

describe("Client", () => {
  const client = new Client;

  it("returns a value for each input in mock/inputs.ts", async () => {
    await Promise.all(mocks.fetchCommitment.map(async value => client.fetchCommitment(...value.params)));
    await Promise.all(mocks.fetchCommitments.map(async value => client.fetchCommitments(...value.params)));
    await Promise.all(mocks.fetchCitation.map(async value => client.fetchCitation(...value.params)));
  });
});
