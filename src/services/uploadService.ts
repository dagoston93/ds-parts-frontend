import { NamedEntity } from "../common/entity";
import apiClient from "./apiClient";

export interface File extends NamedEntity {
    description: string;
    fileName: string;
}

export interface FileUploadFormData extends NamedEntity {
    description: string;
    name: string;
    image: FileList;
}

class UploadService {
    uploadImage = (data: FileUploadFormData) => {
        return apiClient
            .post("/upload/image", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => res.data);
    };
}

export default new UploadService();
