import http from '../../core/http-common'

class AgenciesService {
    endPoint = 'https://app-univeristy-userservice.herokuapp.com/api/v1/usersowner';

    getById(id) {
        return http.get(`${this.endPoint}/${id}`);
    }
}

export default new AgenciesService();
