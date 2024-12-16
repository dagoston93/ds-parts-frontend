import { ENTITY_TYPE_MANUFACTURER } from "../../common/entity";
import manufacturerService, {
    Manufacturer,
    ManufacturerFormData,
} from "../../services/manufacturerService";
import useUpdateEntity from "../entities/useUpdateEntity";

export default (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) =>
    useUpdateEntity<Manufacturer, ManufacturerFormData>(
        manufacturerService,
        ENTITY_TYPE_MANUFACTURER,
        onSuccess,
        onError
    );
