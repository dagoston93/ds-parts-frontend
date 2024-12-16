import { ENTITY_TYPE_MANUFACTURER } from "../../common/entity";
import manufacturerService, {
    Manufacturer,
    ManufacturerFormData,
} from "../../services/manufacturerService";
import useDeleteEntity from "../entities/useDeleteEntity";

export default (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) =>
    useDeleteEntity<Manufacturer, ManufacturerFormData>(
        manufacturerService,
        ENTITY_TYPE_MANUFACTURER,
        onSuccess,
        onError
    );
