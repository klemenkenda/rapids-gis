// o-gpsy backend

export interface DataBackend {
    getPlaces(): any;
    getNodes(): any;
    getSensors(): any;
    getLastSnapshot(): any;
    getSensorTs(sensor_id): any;
    getTime(done, err): void;
}

export interface AdminBackend {
    doLogin(u, p): void;
}

export interface Backend {
    data: DataBackend;
    admin: AdminBackend;
}

let backend = null;

export function getBackend(): Backend {
    if (backend != null) {
        return backend;
    } else {
        throw new Error("Missing backend singleton");
    }
}

export function setBackend(_backend: Backend): void {
    backend = _backend;
}