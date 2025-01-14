import { Patch as Patch$1 } from '@automerge/automerge-repo/slim';

/**
 * A way to describe move, copy, wrap, cherry-pick and rich text
 * @see https://braid.org/meeting-62/portals
 */
interface Portal {
    start: number;
    end: number;
    path: PathPart[];
    referencing: PatchVersion;
}
type PatchVersion = string & {
    "patch-version": true;
};
interface PatchSet {
    version: PatchVersion;
    parents: PatchVersion[];
    mergeType: string;
    patches: Patch[];
    meta: Record<string, string | number | (string | number)[]>;
}
type PathPart = number | string;
type PatchRange = [number?, number?] | PathPart;
type Patch = [path: PathPart[], range: PatchRange, val?: any];
declare function pojo(target: any): target is Record<string | number, any>;
/**
 * walk a path in an obj, optionally mutating it to insert missing parts
 * for the inspiration of @see https://github.com/braid-org/braid-spec/blob/aea85367d60793c113bdb305a4b4ecf55d38061d/draft-toomim-httpbis-range-patch-01.txt
 *
 * to insert a string in an array, you need to wrap it in []
 *	to insert an array in an array you need to wrap it in []
 */
declare function apply<T>(path: PathPart[], target: any, range: PatchRange, val?: any, reviver?: (value: any, key: any, parent: any, path: PathPart[], obj: T, range: PatchRange) => void): void;
declare const patch: typeof apply;
declare function fromAutomerge(autopatch: Patch$1): Patch;

export { type PatchRange, type PatchSet, type PatchVersion, type PathPart, type Portal, apply, fromAutomerge, patch, pojo };
