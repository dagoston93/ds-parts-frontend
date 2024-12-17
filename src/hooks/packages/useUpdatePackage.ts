import { ENTITY_TYPE_PACKAGE } from "../../common/entity";
import packageService, {
    Package,
    PackageFormData,
} from "../../services/packageService";
import useUpdateEntity from "../entities/useUpdateEntity";

export default (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) =>
    useUpdateEntity<Package, PackageFormData>(
        packageService,
        ENTITY_TYPE_PACKAGE,
        onSuccess,
        onError
    );
