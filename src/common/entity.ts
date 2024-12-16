export interface Entity {
    _id: string;
}

export interface NamedEntity extends Entity {
    name: string;
}

export type EntityType = "part" | "category" | "manufacturer" | "package";

export type EntityTypeCapital =
    | "Part"
    | "Category"
    | "Manufacturer"
    | "Package";

export type EntityQueryKeys =
    | "parts"
    | "categories"
    | "manufacturers"
    | "packages";
