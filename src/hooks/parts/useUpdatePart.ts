import { ENTITY_TYPE_PART } from "../../common/entity";
import partService, { Part, PartFormData } from "../../services/partService";
import useUpdateEntity from "../entities/useUpdateEntity";

export default (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) =>
    useUpdateEntity<Part, PartFormData>(
        partService,
        ENTITY_TYPE_PART,
        onSuccess,
        onError
    );
