import { NamedEntity } from "../common/entity";
import HttpService from "./httpService";

export interface Category extends NamedEntity {}

export default new HttpService<Category, Category>("/categories");
