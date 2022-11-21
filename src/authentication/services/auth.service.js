//LOCALSTORAGE OF BROWSER
import axios from 'axios';

//ENDPOINT
const API_URL = 'https://go2climbisw22.azurewebsites.net/api/v1/users/auth/sign-in/';
const API_SIGN_UP_CUSTOMER = 'https://go2climbisw22.azurewebsites.net/api/v1/customers/auth/sign-up/';
const API_SIGN_UP_AGENCY = 'https://go2climbisw22.azurewebsites.net/api/v1/agencies/auth/sign-up/';
class AuthService {
    //EJECUTA EL PROCESO DE LOGIN DADO UN USUARIO INGRESADO
    login(user) {
        return axios.post(API_URL, {
            email: user.email,
            password: user.password
        })
            .then(response => {
                if (response.data.token) {
                    console.log("user:" + response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    //ELIMINA EL USUARIO DEL NAVEGADOR
    logout() {
        localStorage.removeItem('user');
    }

    //REGISTER CUSTOMER
    registerCustomer(customer) {
        return axios.post(API_SIGN_UP_CUSTOMER, {
            name: customer.name,
            lastName: customer.lastname,
            email: customer.email,
            password: customer.password,
            phoneNumber: customer.phoneNumber,
        });
    }

    //REGISTER AGENCY
    registerAgency(agency) {
        return axios.post(API_SIGN_UP_AGENCY, {
            name: agency.name,
            email: agency.email,
            password: agency.password,
            description: agency.description,
            location: agency.location,
            ruc: agency.RUC,
            phoneNumber: agency.phoneNumber,
        });
    }

}
export default new AuthService()
