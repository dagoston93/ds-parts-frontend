import HttpService from "./httpService";

export interface Manufacturer {
    _id: string;
    name: string;
}

export default new HttpService<Manufacturer>("/manufacturers");
