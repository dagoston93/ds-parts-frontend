import partService, { Part, PartFormData } from "../../services/partService";
import useUpdateEntity from "../entities/useUpdateEntity";

export default (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) =>
    useUpdateEntity<Part, PartFormData>(
        partService,
        "parts",
        "Part",
        onSuccess,
        onError
    );
