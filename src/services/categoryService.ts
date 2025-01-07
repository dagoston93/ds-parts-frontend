import { NamedEntity } from "../common/entity";
import HttpService from "./httpService";

export type CustomFieldType = "string" | "number" | "enum";
export type UnitGroup =
    | "capacitance"
    | "current"
    | "inductance"
    | "resistance"
    | "voltage"
    | "percentage";

export interface CustomFieldBase {
    name: string;
    type: CustomFieldType;
    required: boolean;
}

export interface CustomStringField extends CustomFieldBase {
    type: "string";
    minLength: number;
    maxLength: number;
}

export interface CustomNumberField extends CustomFieldBase {
    type: "number";
    min: number | null;
    max: number | null;
    decimal: boolean;
    unitGroupName: UnitGroup | null;
}

export interface CustomEnumField extends CustomFieldBase {
    type: "enum";
    values: string[];
}

type CustomField = CustomStringField | CustomNumberField | CustomEnumField;

export interface Category extends NamedEntity {
    parent?: Category;
    customFields?: CustomField[];
}

export interface CategoryFormData {
    name: string;
    parent?: string;
    customFields?: CustomField[];
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
