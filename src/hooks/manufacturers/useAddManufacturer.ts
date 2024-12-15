import { useMutation, useQueryClient } from "@tanstack/react-query";
import manufacturerService, {
    Manufacturer,
    ManufacturerFormData,
} from "../../services/manufacturerService";

const useAddManufacturer = (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) => {
    const queryClient = useQueryClient();

    return useMutation<Manufacturer, Error, ManufacturerFormData>({
        mutationFn: manufacturerService.create,
        onSuccess: (savedManufacturer) => {
            queryClient.invalidateQueries({
                queryKey: ["manufacturers"],
            });
            onSuccess(`Manufacturer added: ${savedManufacturer.name}.`);
        },
        onError: (error) => {
            onError(error.message);
        },
    });
};

export default useAddManufacturer;
