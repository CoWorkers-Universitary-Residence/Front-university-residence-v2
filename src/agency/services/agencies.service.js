import http from '../../core/http-common'

class AgenciesService {
    endPoint = 'https://go2climbisw22.azurewebsites.net/api/v1/agencies';

    getAll() {
        return http.get(this.endPoint);
    }
    getById(id) {
        return http.get(`${this.endPoint}/${id}`);
    }
    getServices(id) {
        return http.get(`${this.endPoint}/${id}/services`);
    }
    getServiceOffer(id) {
        return http.get(`${this.endPoint}/${id}/services?isOffer=1`);
    }
    getReviews(id) {
        return http.get(`${this.endPoint}/${id}/agencyreviews`); //agencyreviews en el backend
    }
    create(createAgencyDto) {
        return http.post(this.endPoint, createAgencyDto);
    }
    update(id, updateAgencyDto) {
        return http.put(`${this.endPoint}/${id}`, updateAgencyDto);
    }
    delete(id) {
        return http.delete( `${this.endPoint}/${id}`);
    }
    findByEmail(email) {
        return http.get(`${this.endPoint}?email=${email}`);
    }
}

export default new AgenciesService();
