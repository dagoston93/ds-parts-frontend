import partService, { Part, PartFormData } from "../../services/partService";
import useEntities from "../entities/useEntities";

export default (onError: (message: string) => void) =>
    useEntities<Part, PartFormData>(partService, "parts", onError);
