import categoryService, { Category } from "../services/categoryService";
import useEntity from "./useEntity";

export default (errorHandler: (message: string) => void) => {
    const { entities, isLoading, setEntities } = useEntity<Category>(
        categoryService,
        errorHandler
    );

    return {
        categories: entities,
        isLoading,
        setCategories: setEntities,
    };
};
