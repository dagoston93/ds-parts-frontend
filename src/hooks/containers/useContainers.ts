import { ENTITY_TYPE_CONTAINER } from "../../common/entity";
import containerService, {
    Container,
    ContainerFormData,
} from "../../services/containerService";
import useEntities from "../entities/useEntities";

export default (onError: (message: string) => void) =>
    useEntities<Container, ContainerFormData>(
        containerService,
        ENTITY_TYPE_CONTAINER,
        onError
    );
