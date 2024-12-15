import { useMutation, useQueryClient } from "@tanstack/react-query";
import manufacturerService, {
    Manufacturer,
    ManufacturerFormData,
} from "../../services/manufacturerService";

interface UpdateManufacturerData {
    id: string;
    manufacturerFormData: ManufacturerFormData;
}

const useUpdateManufacturer = (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) => {
    const queryClient = useQueryClient();

    return useMutation<Manufacturer, Error, UpdateManufacturerData>({
        mutationFn: ({ id, manufacturerFormData }) =>
            manufacturerService.update(manufacturerFormData, id),
        onSuccess: (savedManufacturer) => {
            queryClient.invalidateQueries({
                queryKey: ["manufacturers"],
            });
            onSuccess(`Manufacturer updated: ${savedManufacturer.name}.`);
        },
        onError: (error) => {
            onError(error.message);
        },
    });
};

export default useUpdateManufacturer;
