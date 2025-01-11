export interface Entity {
    _id: string;
}

export interface NamedEntity extends Entity {
    name: string;
}

interface IEntityType {
    name: string;
    nameCapital: string;
    queryKey: string;
}

export const ENTITY_TYPE_PART: IEntityType = {
    name: "part",
    nameCapital: "Part",
    queryKey: "parts",
} as const;

export const ENTITY_TYPE_CATEGORY: IEntityType = {
    name: "category",
    nameCapital: "Category",
    queryKey: "categories",
} as const;

export const ENTITY_TYPE_CONTAINER: IEntityType = {
    name: "container",
    nameCapital: "Container",
    queryKey: "containers",
} as const;

export const ENTITY_TYPE_MANUFACTURER: IEntityType = {
    name: "manufacturer",
    nameCapital: "Manufacturer",
    queryKey: "manufacturers",
} as const;

export const ENTITY_TYPE_PACKAGE: IEntityType = {
    name: "package",
    nameCapital: "Package",
    queryKey: "packages",
} as const;

export type EntityType =
    | typeof ENTITY_TYPE_PART
    | typeof ENTITY_TYPE_CATEGORY
    | typeof ENTITY_TYPE_MANUFACTURER
    | typeof ENTITY_TYPE_PACKAGE;
