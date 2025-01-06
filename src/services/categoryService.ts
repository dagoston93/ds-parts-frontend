import { NamedEntity } from "../common/entity";
import HttpService from "./httpService";

export interface CustomField {
    name: string;
    type: "string" | "number" | "enum";
    required: boolean;
}

export interface CustomStringField extends CustomField {
    type: "string";
    minLength: number;
    maxLength: number;
}

export interface CustomNumberField extends CustomField {
    type: "number";
    min: number | null;
    max: number | null;
    decimal: boolean;
    unitGroupName:
        | "capacitance"
        | "current"
        | "inductance"
        | "resistance"
        | "voltage"
        | "percentage";
}

export interface CustomEnumField extends CustomField {
    type: "enum";
    values: string[];
}

export interface Category extends NamedEntity {
    parent?: Category;
    customFields?: CustomEnumField[];
}

export interface CategoryFormData {
    name: string;
    parent?: string;
    customFields?: CustomEnumField[];
}

export function categoryToCategoryFormData(
    category: Category
): CategoryFormData {
    return {
        name: category.name,
        parent: category.parent?._id || "",
        customFields: category.customFields || [],
    };
}

export default new HttpService<Category, CategoryFormData>("/categories");
