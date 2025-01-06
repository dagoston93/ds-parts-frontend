interface UnitGroup {
    name: string;
    baseUnit: string;
    smallerUnits: string[];
    largerUnits: string[];
    difference: number;
}

const useUnitGroups: () => UnitGroup[] = () => {
    return [
        {
            name: "capacitance",
            baseUnit: "F",
            smallerUnits: ["pF", "nF", "uF", "mF"],
            largerUnits: [],
            difference: 1000,
        },
        {
            name: "current",
            baseUnit: "A",
            smallerUnits: ["pA", "nA", "uA", "mA"],
            largerUnits: [],
            difference: 1000,
        },
        {
            name: "inductance",
            baseUnit: "H",
            smallerUnits: ["nH", "uH", "mH"],
            largerUnits: [],
            difference: 1000,
        },
        {
            name: "resistance",
            baseUnit: "Ω",
            smallerUnits: ["mΩ"],
            largerUnits: ["kΩ", "MΩ"],
            difference: 1000,
        },
        {
            name: "voltage",
            baseUnit: "V",
            smallerUnits: ["uV", "mV"],
            largerUnits: ["kV"],
            difference: 1000,
        },
        {
            name: "percentage",
            baseUnit: "%",
            smallerUnits: [],
            largerUnits: [],
            difference: 1,
        },
    ];
};

export default useUnitGroups;
