import manufacturerService, {
    Manufacturer,
    ManufacturerFormData,
} from "../../services/manufacturerService";
import useAddEntity from "../entities/useAddEntitiy";

export default (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) =>
    useAddEntity<Manufacturer, ManufacturerFormData>(
        manufacturerService,
        "manufacturers",
        "Manufacturer",
        onSuccess,
        onError
    );
