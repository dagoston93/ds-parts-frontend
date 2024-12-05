import HttpService from "./httpService";

export interface Part {
    _id: string;
    name: string;
    manufacturer?: {
        _id: string;
        name: string;
    };
    partPackage?: {
        _id: string;
        name: string;
        type: "SMD" | "THT";
    };
    price: number;
    count: number;
    category?: {
        _id: string;
        name: string;
    };
}

export interface PartFormData {
    name: string;
    manufacturer: string;
    partPackage: string;
    price: number | null;
    count: number | null;
    category: string;
}

export function partToPartFormData(part: Part): PartFormData {
    return {
        name: part.name,
        manufacturer: part.manufacturer?._id || "",
        partPackage: part.partPackage?._id || "",
        price: part.price,
        count: part.count,
        category: part.category?._id || "",
    };
}

export default new HttpService<Part, PartFormData>("/parts");
