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

export default new HttpService<Part>("/parts");
