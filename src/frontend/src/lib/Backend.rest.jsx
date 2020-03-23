import axios from "axios";
import { Backend, DataBackend, AdminBackend } from "./Backend";

export class RestDataBackend implements LiveBackend {
    constructor() {
        this.comp_x = 46.0421255;
        this.comp_y = 14.4879161;
    }

    async getPlaces(): Promise {
        return (await axios.get("/api/places")).data;
    };

    async getNodes(): Promise {
        return (await axios.get("/api/nodes")).data;
    };

    async getLastSnapshot(): Promise {
        return (await axios.get("/api/snapshot")).data;
    };

    async getSensorTs(sensor_id) {
        return (await axios.get("/api/sensorts/" + sensor_id)).data;
    };

    async getTime() {
        return (await axios.get("/api/timestamp")).data;
    }

};

export class RestAdminBackend implements AdminBackend {
    login(u, p, done, err) {
        axios.get(`/api/admin/login/${u}/${p}`)
            .then(result => {
                done(result.data);
            })
            .catch(error => {
                console.log(error);
                err(error);
            });
    };

}

export class RestBackend implements Backend {
    data: DataBackend;
    admin: AdminBackend;

    constructor() {
        this.data = new RestDataBackend();
        this.admin = new RestAdminBackend();
    }
}