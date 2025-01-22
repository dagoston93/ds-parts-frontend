import { ENTITY_TYPE_PART } from "../../common/entity";
import partService, { Part, PartFormData } from "../../services/partService";
import useEntitiesByIds from "../entities/useEntitiesById";

export default (ids: string[], onError: (message: string) => void) =>
    useEntitiesByIds<Part, PartFormData>(
        ids,
        partService,
        ENTITY_TYPE_PART,
        onError
    );
