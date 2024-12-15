import HttpService from "./httpService";

export interface Manufacturer {
    _id: string;
    name: string;
}

export interface ManufacturerFormData {
    name: string;
}

export function manufacturerToManufacturerFormData(
    manufacturer: Manufacturer
): ManufacturerFormData {
    return {
        name: manufacturer.name,
    };
}

export default new HttpService<Manufacturer, ManufacturerFormData>(
    "/manufacturers"
);
