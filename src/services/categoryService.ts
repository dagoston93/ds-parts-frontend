import HttpService from "./httpService";

export interface Category {
    _id: string;
    name: string;
}

export default new HttpService<Category>("/categories");
