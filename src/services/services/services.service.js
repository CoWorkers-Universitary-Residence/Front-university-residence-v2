import http from '../../core/http-common'

class ServicesService {
    endPoint = 'https://university-publicationservice.herokuapp.com/api/v1/publications';
    getAll() {
        return http.get(`${this.endPoint}`);
    }
    getById(id) {
        return http.get(`${this.endPoint}/${id}`);
    }
    getByName(name, start, limit) {
        return http.get(`${this.endPoint}/services/text/${name}?start=${start}&limit=${limit}`);
    }
    getByAllFilter(name, score, min, max, start, limit) {
        return http.get(`${this.endPoint}/services/text/${name}/score/${score}/money?min=${min}&max=${max}&start=${start}&limit=${limit}`);
    }
    getWithServiceReviews(id) {
        return http.get(`${this.endPoint}/${id}/servicereviews`);
    }
    getWithActivities(id) {
        return http.get(`${this.endPoint}/${id}/activities`);
    }
}

export default new ServicesService();
