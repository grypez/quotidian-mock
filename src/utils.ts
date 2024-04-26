import crypto from "node:crypto";

const rewriteBigInt = (_: string, v: any) => typeof v === "bigint" ? v.toString() : v;
export const stringify = (obj: any) => JSON.stringify(obj, rewriteBigInt);

const sha1 = () => crypto.createHash("sha1");
const hash = (value: string) => sha1().update(value).digest("hex");
export const hashArgs = (...args: any) => hash(stringify(args));
