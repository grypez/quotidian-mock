import { Client } from "./client";
import { scenes, parseScene } from "./fixtures";

const parsedScenes = Object.keys(scenes).flatMap(
  key => parseScene(scenes[key])
);

const fetchCommitment = parsedScenes.flatMap(args => args.commitment);
const fetchCommitments = parsedScenes.flatMap(args => args.commitments);
const fetchCitation = parsedScenes.flatMap(args => args.citations);

const mocks = {
  fetchCommitment:  fetchCommitment.map(params => ({ endpoint: Client.prototype.fetchCommitment, params: params})),
  fetchCommitments: fetchCommitments.map(params => ({ endpoint: Client.prototype.fetchCommitments, params: params})),
  fetchCitation:    fetchCitation.map(params => ({ endpoint: Client.prototype.fetchCitation, params: params})),
};

export default mocks;