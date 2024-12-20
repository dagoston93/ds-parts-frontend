type StorageType = "LOCAL" | "SESSION";
const KEY_TOKEN = "authToken";
const KEY_STORAGE_TYPE = "storageType";

class TokenStorage {
    storage: Storage;

    constructor() {
        let type = localStorage.getItem(KEY_STORAGE_TYPE);

        if (type === "LOCAL") {
            this.storage = localStorage;
        } else {
            this.storage = sessionStorage;
        }
    }

    setStorageType = (type: StorageType) => {
        if (type === "LOCAL") {
            this.storage = localStorage;
        } else if (type === "SESSION") {
            this.storage = sessionStorage;
        }
        localStorage.setItem(KEY_STORAGE_TYPE, type);
    };

    saveToken = (token: string) => {
        this.storage.setItem(KEY_TOKEN, token);
    };

    removeToken = () => {
        localStorage.removeItem(KEY_STORAGE_TYPE);
        this.storage.removeItem(KEY_TOKEN);
    };

    getToken = () => {
        return this.storage.getItem(KEY_TOKEN);
    };

    hasTokenChanged = (event: StorageEvent) => {
        return event.key === KEY_TOKEN;
    };
}

export default new TokenStorage();
