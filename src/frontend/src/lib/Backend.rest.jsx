import axios from "axios";
import { Backend, DataBackend, AdminBackend } from "./Backend";

export class RestDataBackend implements LiveBackend {
    constructor() {
        this.comp_x = 46.0421255;
        this.comp_y = 14.4879161;
    }

    async getPlaces(): Promise {
        console.log(`${process.env.PUBLIC_URL}/api/places`);
        return (await axios.get(`${process.env.PUBLIC_URL}/api/places`)).data;
    };

    async getNodes(): Promise {
        return (await axios.get(`${process.env.PUBLIC_URL}/api/nodes`)).data;
    };

    async getSensors(): Promise {
        return (await axios.get(`${process.env.PUBLIC_URL}/api/sensors`)).data;
    };

    async getLastSnapshot(): Promise {
        return (await axios.get(`${process.env.PUBLIC_URL}/api/snapshot`)).data;
    };

    async getSensorTs(sensor_id) {
        return (await axios.get(`${process.env.PUBLIC_URL}/api/sensorts/${sensor_id}`)).data;
    };

    async getTime() {
        return (await axios.get(`${process.env.PUBLIC_URL}/api/timestamp`)).data;
    }

    // EXTERNAL
    async getFursPosts() {
        return (await axios.get("https://ncku.siska.io/gis/datasource/poste")).data;
    }

    async getFursPins() {
        return (await axios.get("https://ncku.siska.io/gis/datasource/pinschah2Ohy")).data;
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