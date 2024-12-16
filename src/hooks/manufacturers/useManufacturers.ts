import { ENTITY_TYPE_MANUFACTURER } from "../../common/entity";
import manufacturerService, {
    Manufacturer,
    ManufacturerFormData,
} from "../../services/manufacturerService";
import useEntities from "../entities/useEntities";

export default (onError: (message: string) => void) =>
    useEntities<Manufacturer, ManufacturerFormData>(
        manufacturerService,
        ENTITY_TYPE_MANUFACTURER,
        onError
    );
