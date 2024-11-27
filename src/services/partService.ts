import HttpService from "./httpService";

export interface Part {
    _id: string;
    name: string;
    manufacturer?: {
        name: string;
    };
    partPackage?: {
        name: string;
        type: "SMD" | "THT";
    };
    price: number;
    count: number;
    category?: {
        name: string;
    };
}

export interface PartData {
    name: string;
    manufacturer: string;
    partPackage: string;
    price: number;
    count: number;
    category: string;
}

export default new HttpService<Part, PartData>("/parts");
