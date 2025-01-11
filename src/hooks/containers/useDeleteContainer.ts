import { ENTITY_TYPE_CONTAINER } from "../../common/entity";
import containerService, {
    Container,
    ContainerFormData,
} from "../../services/containerService";
import useDeleteEntity from "../entities/useDeleteEntity";

export default (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) =>
    useDeleteEntity<Container, ContainerFormData>(
        containerService,
        ENTITY_TYPE_CONTAINER,
        onSuccess,
        onError
    );
