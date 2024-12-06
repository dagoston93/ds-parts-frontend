import apiClient from "./apiClient";
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

class PartService extends HttpService<Part, PartFormData> {
    constructor() {
        super("/parts");
    }

    incrementCount(id: string) {
        return apiClient.post(`${this.endpoint}/${id}/increment-count`);
    }

    decrementCount(id: string) {
        return apiClient.post(`${this.endpoint}/${id}/decrement-count`);
    }
}

export default new PartService();
