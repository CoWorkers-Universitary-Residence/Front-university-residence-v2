import http from '../../core/http-common'

class ServicesService {
    endPoint = 'https://university-publicationservice.herokuapp.com/api/v1/publications';

    getById(id) {
        return http.get(`${this.endPoint}/${id}`);
    }
}

export default new ServicesService();
