import { ENTITY_TYPE_PACKAGE } from "../../common/entity";
import packageService, {
    Package,
    PackageFormData,
} from "../../services/packageService";
import useDeleteEntity from "../entities/useDeleteEntity";

export default (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) =>
    useDeleteEntity<Package, PackageFormData>(
        packageService,
        ENTITY_TYPE_PACKAGE,
        onSuccess,
        onError
    );
