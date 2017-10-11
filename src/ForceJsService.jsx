import * as LCC from "lightning-container";
import DataService from "forcejs/data-service";

let service = DataService.createInstance({accessToken:LCC.getRESTAPISessionKey()}, {apiVersion:"v42.0"});
service.useProxy = false; // This line should not be necessary.

export let query = (soql) => service.query(soql);

export let update = (objectName, data) => service.update(objectName, data);

export let create = (objectName, data) => service.create(objectName, data);

export let del = (objectName, id) => service.del(objectName, id);
