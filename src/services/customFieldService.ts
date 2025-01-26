import { Category } from "./categoryService";

export type CustomFieldType =
    | "Capacitance"
    | "Voltage"
    | "Current"
    | "Resistance"
    | "Power"
    | "Frequency"
    | "BaudRate"
    | "Temperature"
    | "Length"
    | "Percentage"
    | "FileSize"
    | "Distance"
    | "Integer"
    | "Float"
    | "String";

export interface CustomField {
    id: string;
    name: string;
    type: CustomFieldType;
    required: boolean;
}

export interface UnitGroup {
    name: string;
    baseUnit: string;
    smallerUnits: string[];
    largerUnits: string[];
    conversionFactor: number;
}

const unitGroups: { [key in CustomFieldType]?: UnitGroup | null } = {
    Capacitance: {
        name: "Capacitance",
        baseUnit: "F",
        smallerUnits: ["pF", "nF", "µF", "mF"],
        largerUnits: [],
        conversionFactor: 1000,
    },
    Voltage: {
        name: "Voltage",
        baseUnit: "V",
        smallerUnits: ["µV", "mV"],
        largerUnits: ["kV"],
        conversionFactor: 1000,
    },
    Current: {
        name: "Current",
        baseUnit: "A",
        smallerUnits: ["µA", "mA"],
        largerUnits: ["kA"],
        conversionFactor: 1000,
    },
    Resistance: {
        name: "Resistance",
        baseUnit: "Ω",
        smallerUnits: ["mΩ"],
        largerUnits: ["kΩ", "MΩ"],
        conversionFactor: 1000,
    },
    Power: {
        name: "Power",
        baseUnit: "W",
        smallerUnits: ["mW"],
        largerUnits: ["kW", "MW"],
        conversionFactor: 1000,
    },
    Frequency: {
        name: "Frequency",
        baseUnit: "Hz",
        smallerUnits: ["mHz"],
        largerUnits: ["kHz", "MHz", "GHz"],
        conversionFactor: 1000,
    },
    BaudRate: {
        name: "Baud Rate",
        baseUnit: "Bps",
        smallerUnits: [],
        largerUnits: ["kBps", "MBps"],
        conversionFactor: 1000,
    },
    Temperature: {
        name: "Temperature",
        baseUnit: "°C",
        smallerUnits: [],
        largerUnits: [],
        conversionFactor: 1,
    },
    Length: {
        name: "Length",
        baseUnit: "m",
        smallerUnits: ["mm", "cm"],
        largerUnits: ["km"],
        conversionFactor: 1000,
    },
    Percentage: {
        name: "Percentage",
        baseUnit: "%",
        smallerUnits: [],
        largerUnits: [],
        conversionFactor: 1,
    },
    FileSize: {
        name: "File Size",
        baseUnit: "B",
        smallerUnits: [],
        largerUnits: ["kB", "MB", "GB", "TB"],
        conversionFactor: 1024,
    },
    Distance: {
        name: "Distance",
        baseUnit: "m",
        smallerUnits: ["mm", "cm"],
        largerUnits: ["km"],
        conversionFactor: 1000,
    },
    Integer: null,
    Float: null,
    String: null,
};

export function getUnitGroupByType(type: CustomFieldType): UnitGroup | null {
    return unitGroups[type] || null;
}

export function getCustomFieldTypes(): string[] {
    return Object.keys(unitGroups);
}

export const getAllCustomFields = (
    categoryId: string,
    categories: Category[]
) => {
    const categoryObj = categories?.find((c) => c._id === categoryId);
    if (!categoryObj) {
        return [];
    }

    let newCustomFields = categoryObj.customFields || [];

    if (categoryObj.parent) {
        newCustomFields = newCustomFields.concat(
            getAllCustomFields(categoryObj.parent._id, categories)
        );
    }

    return newCustomFields;
};
