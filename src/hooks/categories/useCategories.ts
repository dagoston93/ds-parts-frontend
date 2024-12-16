import { ENTITY_TYPE_CATEGORY } from "../../common/entity";
import categoryService, {
    Category,
    CategoryFormData,
} from "../../services/categoryService";
import useEntities from "../entities/useEntities";

export default (onError: (message: string) => void) =>
    useEntities<Category, CategoryFormData>(
        categoryService,
        ENTITY_TYPE_CATEGORY,
        onError
    );
