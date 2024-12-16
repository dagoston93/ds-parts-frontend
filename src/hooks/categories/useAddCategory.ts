import { ENTITY_TYPE_CATEGORY } from "../../common/entity";
import categoryService, {
    Category,
    CategoryFormData,
} from "../../services/categoryService";
import useAddEntity from "../entities/useAddEntitiy";

export default (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) =>
    useAddEntity<Category, CategoryFormData>(
        categoryService,
        ENTITY_TYPE_CATEGORY,
        onSuccess,
        onError
    );
