import { Hash, Proof, Reference, SaltedString, Seed, Witness } from "./types";
import { hashArgs } from "./utils";
import record from "./outputs.json";

// this logic should be totally automatable
// but for typescript's apparent limitation
export class Client {
  async fetchCommitment(line: SaltedString): Promise<Hash> {
    const argHash = hashArgs([line]);
    if ( argHash in record.fetchCommitment ) {
      return BigInt(record.fetchCommitment[argHash]);
    } else {
      throw Error("quotidian tabular client does not have record for fetchCommitment(line: " + line + ")");
    }
  }

  async fetchCommitments(contents: string[], seed: Seed): Promise<Hash[]> {
    const argHash = hashArgs([contents, seed]);
    if ( argHash in record.fetchCommitments ) {
      return record.fetchCommitments[argHash].map(BigInt);
    } else {
      throw Error("quotidian tabular client does not have record for fetchCommitments(contents: " + contents + ", seed: " + seed + ")");
    }
  }
  
  async fetchCitation(S: SaltedString, T: SaltedString, R: Reference): Promise<[Proof, Witness]> {
    const argHash = hashArgs([S, T, R]);
    if ( argHash in record.fetchCitation ) {
      return record.fetchCitation[argHash].map((entry: Array<any>) => entry.map(BigInt));
    } else {
      throw Error("quotidian tabular client does not have record for fetchCitation(S: " + S + ", T: " + T + ", R: " + R + ")");
    }
  }
}