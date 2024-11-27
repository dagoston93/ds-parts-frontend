import apiClient from "./apiClient";

class HttpService<T extends { _id: string }, U> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll() {
        const controller = new AbortController();
        const request = apiClient.get<T[]>(this.endpoint, {
            signal: controller.signal,
        });

        return { request, cancel: () => controller.abort() };
    }

    create(entity: U) {
        return apiClient.post(this.endpoint, entity);
    }

    delete(id: string) {
        return apiClient.delete(`${this.endpoint}/${id}`);
    }
}

export default HttpService;
