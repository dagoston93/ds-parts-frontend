import { ENTITY_TYPE_CONTAINER } from "../../common/entity";
import containerService, {
    Container,
    ContainerFormData,
} from "../../services/containerService";
import useAddEntity from "../entities/useAddEntitiy";

export default (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) =>
    useAddEntity<Container, ContainerFormData>(
        containerService,
        ENTITY_TYPE_CONTAINER,
        onSuccess,
        onError
    );
