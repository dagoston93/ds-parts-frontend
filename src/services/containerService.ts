import { NamedEntity } from "../common/entity";
import HttpService from "./httpService";

export interface Container extends NamedEntity {}

export interface ContainerFormData {
    name: string;
}

export function containerToContainerFormData(
    container: Container
): ContainerFormData {
    return {
        name: container.name,
    };
}

export default new HttpService<Container, ContainerFormData>("/containers");
