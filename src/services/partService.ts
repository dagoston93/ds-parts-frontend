import { NamedEntity } from "../common/entity";
import apiClient from "./apiClient";
import { Category } from "./categoryService";
import HttpService from "./httpService";
import { Manufacturer } from "./manufacturerService";
import { Package } from "./packageService";
import { File } from "./fileService";
import { Container } from "./containerService";

export interface CustomFieldValue {
    numericValue?: number | null;
    stringValue?: string | null;
    unit?: string | null;
}

export type CustomFieldValues = Record<string, CustomFieldValue>;

export interface Part extends NamedEntity {
    manufacturer?: Manufacturer;
    partPackage?: Package;
    price: number;
    count: number;
    category?: Category;
    container?: Container;
    description?: string;
    primaryImage?: File;
    images?: File[];
    files?: File[];
    customFieldValues?: CustomFieldValues;
    relatedParts?: string[];
    relatedLinks?: string[];
}

export interface PartFormData {
    name: string;
    manufacturer: string;
    partPackage: string;
    price: number | null;
    count: number | null;
    category: string;
    container: string;
    description: string;
    primaryImage?: string;
    images: string[];
    files: string[];
    customFieldValues: CustomFieldValues;
    relatedParts: string[];
    relatedLinks: string[];
}

export function partToPartFormData(part: Part): PartFormData {
    return {
        name: part.name,
        manufacturer: part.manufacturer?._id || "",
        partPackage: part.partPackage?._id || "",
        price: part.price,
        count: part.count,
        category: part.category?._id || "",
        container: part.container?._id || "",
        description: part.description || "",
        primaryImage: part.primaryImage?._id || "",
        images: part.images?.map((i) => i._id) || [],
        files: part.files?.map((f) => f._id) || [],
        customFieldValues: part.customFieldValues || {},
        relatedParts: part.relatedParts || [],
        relatedLinks: part.relatedLinks || [],
    };
}

class PartService extends HttpService<Part, PartFormData> {
    constructor() {
        super("/parts");
    }

    incrementCount = (id: string) => {
        return apiClient
            .post(`${this.endpoint}/${id}/increment-count`)
            .then((res) => res.data);
    };

    decrementCount = (id: string) => {
        return apiClient
            .post(`${this.endpoint}/${id}/decrement-count`)
            .then((res) => res.data);
    };
}

export default new PartService();
