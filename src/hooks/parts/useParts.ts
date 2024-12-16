import { ENTITY_TYPE_PART } from "../../common/entity";
import partService, { Part, PartFormData } from "../../services/partService";
import useEntities from "../entities/useEntities";

export default (onError: (message: string) => void) =>
    useEntities<Part, PartFormData>(partService, ENTITY_TYPE_PART, onError);
