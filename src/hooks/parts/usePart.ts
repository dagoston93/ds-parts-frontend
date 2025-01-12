import { ENTITY_TYPE_PART } from "../../common/entity";
import partService, { Part, PartFormData } from "../../services/partService";
import useEntity from "../entities/useEntity";

export default (id: string, onError: (message: string) => void) =>
    useEntity<Part, PartFormData>(id, partService, ENTITY_TYPE_PART, onError);
