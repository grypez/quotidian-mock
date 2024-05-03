import { Client } from "./client";

type ArgHash = string;

export type FetchCommitment = typeof Client.prototype.fetchCommitment;
export type FetchCommitments = typeof Client.prototype.fetchCommitments;
export type FetchCitation = typeof Client.prototype.fetchCitation;

export type Endpoint =
  | FetchCommitment
  | FetchCommitments
  | FetchCitation
  ;

export type AsyncFunc = (...args: any) => Promise<any>;
export type ParamArray<F extends AsyncFunc> = Array<Parameters<F>>;
export type Applicable<F extends AsyncFunc> = { endpoint: F, params: Parameters<F> }
export type Mock =
  | Applicable<FetchCommitment>
  | Applicable<FetchCommitments>
  | Applicable<FetchCitation>
  ;

// would like to assert the value type dependent on the key type
// but this containing union type will have to do
export type MockMap = Map<Endpoint["name"], [Endpoint, Map<ArgHash, ReturnType<Endpoint>>]>;

export type Seed = bigint;
export type Hash = bigint;

type Digit = 0|1|2|3|4|5|6|7|8|9;
export type Tuple<T, N extends Digit> =
  N extends 0 ? [] :
  N extends 1 ? [T] :
  N extends 2 ? [T, T] :
  N extends 3 ? [T, T, T] :
  N extends 4 ? [T, T, T, T] :
  N extends 5 ? [T, T, T, T, T] :
  N extends 6 ? [T, T, T, T, T, T] :
  N extends 7 ? [T, T, T, T, T, T, T] :
  N extends 8 ? [T, T, T, T, T, T, T, T] :
  N extends 9 ? [T, T, T, T, T, T, T, T, T] :
  never ;

export type Proof = Tuple<bigint, 8>;
export type CompressedProof = Tuple<bigint, 4>;
export type Witness = Tuple<bigint, 5>;

export class ProofError extends Error { }
export class Reference {
  rootWord: number
  branchWord: number
  length: number

  constructor(rootWord: number, branchWord: number, length: number) {
    this.rootWord = rootWord;
    this.branchWord = branchWord;
    this.length = length;
  }
}
export type SaltedString = {
  content: string
  seed: Seed
}
export type FetchCommitmentResponse = {
  Index: number
  Response: { Hash: Hash, Seed: Seed } | null
  Error: Error | null
}
export type FetchCommitmentsResponse = FetchCommitmentResponse[]

export type FetchEncryptResponse = {
  RequestId: string
  Encrypted: Uint8Array
}