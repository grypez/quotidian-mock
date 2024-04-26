import { AsyncFunc, FetchCommitment, FetchCommitments, FetchCitation } from "./types";
import { Client } from "./client";

type ParamArray<F extends AsyncFunc> = Array<Parameters<F>>;

const fetchCommitment: ParamArray<FetchCommitment> = [
  [{
    content: "someline",
    seed: BigInt(33),
  }],

]

const fetchCommitments: ParamArray<FetchCommitments> = [
  [
    ["some", "lines"],
    BigInt(3030),
  ],

]

const fetchCitation: ParamArray<FetchCitation> = [
  [
    {
      content: "some lines are bigger than others",
      seed: BigInt(44),
    },
    {
      content: "always drawing some lines in the sand",
      seed: BigInt(22),
    },
    {
      rootWord: 0,
      branchWord: 2,
      length: 2,
    }
  ],

];

const mocks = {
  fetchCommitment:  fetchCommitment.map(params => ({ endpoint: Client.prototype.fetchCommitment, params: params})),
  fetchCommitments: fetchCommitments.map(params => ({ endpoint: Client.prototype.fetchCommitments, params: params})),
  fetchCitation:    fetchCitation.map(params => ({ endpoint: Client.prototype.fetchCitation, params: params})),
};

export default mocks;