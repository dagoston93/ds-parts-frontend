import { ENTITY_TYPE_PART } from "../../common/entity";
import partService, { Part, PartFormData } from "../../services/partService";
import useAddEntity from "../entities/useAddEntitiy";

export default (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) =>
    useAddEntity<Part, PartFormData>(
        partService,
        ENTITY_TYPE_PART,
        onSuccess,
        onError
    );
