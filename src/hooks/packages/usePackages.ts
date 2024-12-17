import { ENTITY_TYPE_PACKAGE } from "../../common/entity";
import packageService, {
    Package,
    PackageFormData,
} from "../../services/packageService";
import useEntities from "../entities/useEntities";

export default (onError: (message: string) => void) =>
    useEntities<Package, PackageFormData>(
        packageService,
        ENTITY_TYPE_PACKAGE,
        onError
    );
