import { useMutation, useQueryClient } from "@tanstack/react-query";
import manufacturerService, {
    Manufacturer,
} from "../../services/manufacturerService";

interface DeleteManufacturerContext {
    originalManufacturers: Manufacturer[];
}

const useDeleteManufacturer = (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) => {
    const queryClient = useQueryClient();

    return useMutation<Manufacturer, Error, string, DeleteManufacturerContext>({
        mutationFn: manufacturerService.delete,
        onMutate: (deletedManufacturerId: string) => {
            const originalManufacturers =
                queryClient.getQueryData<Manufacturer[]>(["manufacturers"]) ||
                [];

            queryClient.setQueryData<Manufacturer[]>(
                ["manufacturers"],
                (manufacturers = []) =>
                    manufacturers.filter((p) => p._id !== deletedManufacturerId)
            );

            return { originalManufacturers: originalManufacturers };
        },
        onSuccess: (savedManufacturer) => {
            onSuccess(`Manufacturer deleted: ${savedManufacturer.name}.`);
        },
        onError: (error, _, context) => {
            onError(error.message);

            if (context) {
                queryClient.setQueryData<Manufacturer[]>(
                    ["manufacturers"],
                    context.originalManufacturers
                );
            }
        },
    });
};

export default useDeleteManufacturer;
