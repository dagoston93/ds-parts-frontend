import { NamedEntity } from "../common/entity";
import apiClient from "./apiClient";

export interface File extends NamedEntity {
    description: string;
    fileName: string;
}

export interface FileUploadFormData extends NamedEntity {
    description: string;
    name: string;
    file: FileList;
}

class FileService {
    private upload = (endpoint: string, data: FileUploadFormData) => {
        return apiClient
            .post<File>(endpoint, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => res.data);
    };

    uploadImage = (data: FileUploadFormData) => {
        return this.upload("/upload/image", data);
    };

    uploadFile = (data: FileUploadFormData) => {
        return this.upload("/upload/file", data);
    };

    getAllImages = () => {
        return apiClient.get<File[]>("/files/images").then((res) => res.data);
    };

    getAllFiles = () => {
        return apiClient.get<File[]>("/files/files").then((res) => res.data);
    };
}

export default new FileService();
