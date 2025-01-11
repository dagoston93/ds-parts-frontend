import { ENTITY_TYPE_CONTAINER } from "../../common/entity";
import containerService, {
    Container,
    ContainerFormData,
} from "../../services/containerService";
import useUpdateEntity from "../entities/useUpdateEntity";

export default (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) =>
    useUpdateEntity<Container, ContainerFormData>(
        containerService,
        ENTITY_TYPE_CONTAINER,
        onSuccess,
        onError
    );
