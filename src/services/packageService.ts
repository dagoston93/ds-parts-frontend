import { NamedEntity } from "../common/entity";
import HttpService from "./httpService";

export const possiblePackageTypes = ["SMD", "THT"] as const;
type PackageType = (typeof possiblePackageTypes)[number];

export interface Package extends NamedEntity {
    type: PackageType;
}

export interface PackageFormData {
    name: string;
    type: PackageType;
}

export function packageToPackageFormData(partPackage: Package) {
    return {
        name: partPackage.name,
        type: partPackage.type,
    };
}

export default new HttpService<Package, PackageFormData>("/packages");
