import partService, { Part, PartFormData } from "../../services/partService";
import useDeleteEntity from "../entities/useDeleteEntity";

export default (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) =>
    useDeleteEntity<Part, PartFormData>(
        partService,
        "parts",
        "Part",
        onSuccess,
        onError
    );
