import { ENTITY_TYPE_CATEGORY } from "../../common/entity";
import categoryService, {
    Category,
    CategoryFormData,
} from "../../services/categoryService";
import useDeleteEntity from "../entities/useDeleteEntity";

export default (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) =>
    useDeleteEntity<Category, CategoryFormData>(
        categoryService,
        ENTITY_TYPE_CATEGORY,
        onSuccess,
        onError
    );
