import { Backend, DataBackend } from "./Backend";

export class MockDatBackend implements DataBackend {
    constructor() {
        this.comp_x = 46.0420155;
        this.comp_y = 14.4879161;
        this.comp_x2 = 46.0423155;
        this.comp_y2 = 14.4849161;
    }

    getPlaces(done, err) {
        done([]);
    };

    getNodes(done, err) {
        done([]);
    };

    getLastSnapshot(done, err) {
        done([]);
    };

    getSensorTs(sensor_id, done, err) {
        done([]);
    };

    getTime(done, err) {
        done(Math.round(new Date().getTime() / 1000));
    }
}

export class MockBackend implements Backend {
    data: DataBackend;

    constructor() {
        this.data = new MockDataBackend();
    }
}