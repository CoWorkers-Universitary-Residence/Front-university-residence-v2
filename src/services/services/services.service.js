import http from '../../core/http-common'

class ServicesService {
    endPoint = 'https://go2climbisw22.azurewebsites.net/api/v1/services';
    getAll() {
        return http.get(`${this.endPoint}`);
    }
    getById(id) {
        return http.get(`${this.endPoint}/${id}`);
    }
    getByCategory(category, start, limit) {
        return http.get(`${this.endPoint}/services/category?name=${category}&start=${start}&limit=${limit}`);
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
