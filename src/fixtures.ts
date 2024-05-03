import { FetchCitation, FetchCommitment, FetchCommitments, ParamArray } from "./types"

type Reference = { key: string, line: number, word: number }

type Scene = {
  poems: { [key: string]: { lines: string[], seed: bigint } }
  citations: { a: Reference, b: Reference, length: number }[]
}

export const scenes: { [sceneName: string]: Scene } = {
  demo1: {
    poems: {
      root: {
        lines: ["some test content", "for the root poem", "edit", "only if", "you dare"],
        seed: BigInt("1470258369")
      },
      branch: {
        lines: ["this branched poem", "is preloaded", "with some test content", "too"],
        seed: BigInt("1627384950")
      }
    },
    citations: [
      {
        a: { key: "root", line: 0, word: 0 },
        b: { key: "branch", line: 2, word: 1 },
        length: 3,
      }
    ]
  }
}

export function parseScene(scene: Scene): {
  commitment: ParamArray<FetchCommitment>,
  commitments: ParamArray<FetchCommitments>,
  citations: ParamArray<FetchCitation>,
} {
  const fetchCommitment: ParamArray<FetchCommitment>
    = Object.values(scene.poems).flatMap(
      value => value.lines.map(
        line => ([{ line, seed: value.seed }] as unknown as Parameters<FetchCommitment>)
  ));
  const fetchCommitments: ParamArray<FetchCommitments>
    = Object.values(scene.poems).map(
      value => [value.lines, value.seed]
  );
  const fetchCitation: ParamArray<FetchCitation>
    = Object.values(scene.citations).map(
      value => [
        {
          content: scene.poems[value.a.key].lines[value.a.line],
          seed: scene.poems[value.a.key].seed,
        },
        {
          content: scene.poems[value.b.key].lines[value.b.line],
          seed: scene.poems[value.b.key].seed,
        },
        {
          rootWord: value.a.word,
          branchWord: value.b.word,
          length: value.length,
        }
      ]
  );
  return {
    commitment: fetchCommitment,
    commitments: fetchCommitments,
    citations: fetchCitation,
  };
}