import { ENTITY_TYPE_CATEGORY } from "../../common/entity";
import categoryService, {
    Category,
    CategoryFormData,
} from "../../services/categoryService";
import useUpdateEntity from "../entities/useUpdateEntity";

export default (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) =>
    useUpdateEntity<Category, CategoryFormData>(
        categoryService,
        ENTITY_TYPE_CATEGORY,
        onSuccess,
        onError
    );
