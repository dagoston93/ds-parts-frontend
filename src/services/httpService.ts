import apiClient from "./apiClient";

class HttpService<T extends { _id: string }> {
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

    delete(id: string) {
        return apiClient.delete(`${this.endpoint}/${id}`);
    }
}

export default HttpService;
