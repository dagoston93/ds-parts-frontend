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
        "manufacturers",
        "Manufacturer",
        onSuccess,
        onError
    );
