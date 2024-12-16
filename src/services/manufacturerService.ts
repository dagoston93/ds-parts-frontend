import { NamedEntity } from "../common/entity";
import HttpService from "./httpService";

export interface Manufacturer extends NamedEntity {}

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
