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
        "manufacturers",
        "Manufacturer",
        onSuccess,
        onError
    );
