import { Entity } from "../common/entity";
import apiClient from "./apiClient";

class HttpService<TEntity extends Entity, TFormData> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = () => {
        return apiClient.get<TEntity[]>(this.endpoint).then((res) => res.data);
    };

    getById = (id: string) => {
        return apiClient
            .get<TEntity>(`${this.endpoint}/${id}`)
            .then((res) => res.data);
    };

    getByIds = (ids: string[]) => {
        let entities: TEntity[] = [];

        return Promise.all(
            ids.map((id) => {
                return apiClient
                    .get<TEntity>(`${this.endpoint}/${id}`)
                    .then((res) => {
                        entities.push(res.data);
                    });
            })
        ).then(() => entities);
    };

    create = (entity: TFormData) => {
        return apiClient
            .post<TEntity>(this.endpoint, entity)
            .then((res) => res.data);
    };

    update = (entity: TFormData, id: string) => {
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
