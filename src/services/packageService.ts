import { NamedEntity } from "../common/entity";
import HttpService from "./httpService";

export interface Package extends NamedEntity {
    type: "SMD" | "THT";
}

export default new HttpService<Package, Package>("/packages");
