import packageService, { Package } from "../services/packageService";
import useEntity from "./useEntity";

export default (errorHandler: (message: string) => void) => {
    const { entities, isLoading, setEntities } = useEntity<Package>(
        packageService,
        errorHandler
    );

    return { packages: entities, isLoading, setPackages: setEntities };
};
