//LOCALSTORAGE OF BROWSER
import axios from 'axios';

//ENDPOINT
const API_SIGN_IN_TENANT = 'https://app-univeristy-userservice.herokuapp.com/api/v1/userstenant/sign-in';
const API_SIGN_UP_TENANT = 'https://app-univeristy-userservice.herokuapp.com/api/v1/userstenant/sign-up';
const API_SIGN_IN_OWNER = 'https://app-univeristy-userservice.herokuapp.com/api/v1/usersowner/sign-in';
const API_SIGN_UP_OWNER = 'https://app-univeristy-userservice.herokuapp.com/api/v1/usersowner/sign-up';
class AuthService {
    //EJECUTA EL PROCESO DE LOGIN DADO UN USUARIO INGRESADO
    loginTenant(user) {
        return axios.get(`${API_SIGN_IN_TENANT}?email=${user.email}&password=${user.password}`)
            .then(response => {
                if (response.status === 200) {
                    console.log("user:" + response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    return response.data;
                }
                else{
                    console.log("Something went wrong 1")
                    this.loginOwner(user);
                }
            });
    }

    loginOwner(user) {
        return axios.get(`${API_SIGN_IN_OWNER}?email=${user.email}&password=${user.password}`)
            .then(response => {
                if (response.status === 200) {
                    console.log("user:" + response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                else{
                    console.log("Something went wrong 2")
                }
                return response.data;
            });
    }

    //ELIMINA EL USUARIO DEL NAVEGADOR
    logout() {
        localStorage.removeItem('user');
    }

    //REGISTER CUSTOMER
    registerTenant(customer) {
        return axios.post(API_SIGN_UP_TENANT, {
            name: customer.name,
            lastName: customer.lastname,
            email: customer.email,
            password: customer.password,
            phoneNumber: customer.phoneNumber,
        });
    }

    //REGISTER AGENCY
    registerOwner(agency) {
        return axios.post(API_SIGN_UP_OWNER, {
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
