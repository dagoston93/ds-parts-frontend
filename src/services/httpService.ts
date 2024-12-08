import apiClient from "./apiClient";

class HttpService<T extends { _id: string }, U> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = () => {
        return apiClient.get<T[]>(this.endpoint).then((res) => res.data);
    };

    create = (entity: U) => {
        return apiClient.post<T>(this.endpoint, entity).then((res) => res.data);
    };

    update = (entity: U, id: string) => {
        return apiClient
            .put(`${this.endpoint}/${id}`, entity)
            .then((res) => res.data);
    };

    delete = (id: string) => {
        return apiClient
            .delete(`${this.endpoint}/${id}`)
            .then((res) => res.data);
    };
}

export default HttpService;
