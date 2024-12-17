import { NamedEntity } from "../common/entity";
import HttpService from "./httpService";

type PackageType = "SMD" | "THT";

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
