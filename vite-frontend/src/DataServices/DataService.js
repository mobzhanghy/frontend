import http from "../http-common";
import qs from "qs";

class DataService {
    getAll() {
        return http.get("/");
    }

    create(data) {//set headers to application/x-www-form-urlencoded
        return http.post("/", qs.stringify(data));
    }

/*     createGet(data){
        return http.get(`/add?name=${data.name}&star=${data.star}&start=${data.start}&end=${data.end}&description=${data.desc}`);
    } */

    createWithGroup(data) {
        return http.post("/withGroup", qs.stringify(data));
    }

    search(name) {
        return http.get(`/${name}`);
    }

    login(data) {
        return http.post("/login", qs.stringify(data));
    }

    getGroup(name) {
        return http.get(`/group/${name}`);
    }

    searchInGroup(name, group) {
        return http.get(`/nameGroup/${name}/${group}`);
    }

    addCredit(username){
        return http.get(`/addCredit/${username}`);
    }

    getRank(){
        return http.get("/rank/rank");
    }
}

export default new DataService();