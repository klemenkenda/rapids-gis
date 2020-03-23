import axios from "axios";
import { Backend, DataBackend, AdminBackend } from "./Backend";

export class RestDataBackend implements LiveBackend {
    constructor() {
        this.comp_x = 46.0421255;
        this.comp_y = 14.4879161;
    }

    getPlaces(done, err) {
        axios.get("/api/places")
            .then(result => {
                done(result.data);
            })
            .catch(error => {
                console.log(error);
                err(error);
            });
    };

    getNodes(done, err) {
        axios.get("/api/nodes")
            .then(result => {
                done(result.data);
            })
            .catch(error => {
                console.log(error);
                err(error);
            });
    };

    getLastSnapshot(done, err) {
        axios.get("/api/snapshot")
            .then(result => {
                done(result.data);
            })
            .catch(error => {
                console.log(error);
                err(error);
            });
    };

    getSensorTs(sensor_id, done, err) {
        axios.get("/api/sensorts/" + sensor_id)
            .then(result => {
                done(result.data);
            })
            .catch(error => {
                console.log(error);
                err(error);
            });
    };

    getTime(done, err) {
        axios.get("/api/timestamp")
            .then(result => {
                done(result.data);
            })
            .catch(error => {
                console.log(error);
                err(error);
            });
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