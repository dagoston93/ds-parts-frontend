import { ENTITY_TYPE_PACKAGE } from "../../common/entity";
import packageService, {
    Package,
    PackageFormData,
} from "../../services/packageService";
import useAddEntity from "../entities/useAddEntitiy";

export default (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) =>
    useAddEntity<Package, PackageFormData>(
        packageService,
        ENTITY_TYPE_PACKAGE,
        onSuccess,
        onError
    );
