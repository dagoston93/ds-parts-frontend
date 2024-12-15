import manufacturerService, {
    Manufacturer,
    ManufacturerFormData,
} from "../../services/manufacturerService";
import useEntities from "../entities/useEntities";

export default (onError: (message: string) => void) =>
    useEntities<Manufacturer, ManufacturerFormData>(
        manufacturerService,
        "manufacturers",
        onError
    );
