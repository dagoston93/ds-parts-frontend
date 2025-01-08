import { NamedEntity } from "../common/entity";
import { CustomField } from "./customFieldService";
import HttpService from "./httpService";

export interface Category extends NamedEntity {
    parent?: Category;
    customFields?: CustomField[];
}

export interface CategoryFormData {
    name: string;
    parent?: string;
    customFields: CustomField[];
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
