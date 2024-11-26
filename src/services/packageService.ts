import HttpService from "./httpService";

export interface Package {
    _id: string;
    name: string;
    type: "SMD" | "THT";
}

export default new HttpService<Package>("/packages");
