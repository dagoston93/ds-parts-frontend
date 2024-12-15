import partService, { Part, PartFormData } from "../../services/partService";
import useAddEntity from "../entities/useAddEntitiy";

export default (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) =>
    useAddEntity<Part, PartFormData>(
        partService,
        "parts",
        "Part",
        onSuccess,
        onError
    );
