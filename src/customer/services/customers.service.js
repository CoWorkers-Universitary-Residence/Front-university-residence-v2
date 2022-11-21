import http from '../../core/http-common'
import authHeader from "../../authentication/services/auth.header";

class CustomersService {
    endPoint = 'https://go2climbisw22.azurewebsites.net/api/v1/customers';

    getAll() {
        return http.get(this.endPoint,{ headers: authHeader()});
    }
    getById(id) {
        return http.get(`${this.endPoint}/${id}`,{ headers: authHeader()});
    }
    getHiredServicesByCustomerIdWithServiceInformation(id) {
        return http.get(`${this.endPoint}/${id}/hiredservices/information?expand=service`,{ headers: authHeader()});
    }
    create(createCustomerDto) {
        return http.post(this.endPoint, createCustomerDto,{ headers: authHeader()});
    }
    update(id, updateCustomerDto) {
        return http.put(`${this.endPoint}/${id}`, updateCustomerDto,{ headers: authHeader()});
    }
    delete(id) {
        return http.delete( `${this.endPoint}/${id}`,{ headers: authHeader()});
    }
    findByEmail(email) {
        return http.get(`${this.endPoint}?email=${email}`,{ headers: authHeader()});
    }
}

export default new CustomersService();
