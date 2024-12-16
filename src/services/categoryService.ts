import { NamedEntity } from "../common/entity";
import HttpService from "./httpService";

export interface Category extends NamedEntity {
    parent?: Category;
}

export interface CategoryFormData {
    name: string;
    parent: string;
}

export function categoryToCategoryFormData(
    category: Category
): CategoryFormData {
    return {
        name: category.name,
        parent: category.parent?._id || "",
    };
}

export default new HttpService<Category, CategoryFormData>("/categories");
