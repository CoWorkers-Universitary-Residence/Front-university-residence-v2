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
        let encodedEmail = encodeURIComponent(user.email);
        let encodedPassword = encodeURIComponent(user.password);
        return axios.get(`${API_SIGN_IN_TENANT}?email=${encodedEmail}&password=${encodedPassword}`)
            .then(response => {
                if (response.status === 200) {
                    console.log("user:" + response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    loginOwner(user) {
        let encodedEmail = encodeURIComponent(user.email);
        let encodedPassword = encodeURIComponent(user.password);
        return axios.get(`${API_SIGN_IN_OWNER}?email=${encodedEmail}&password=${encodedPassword}`)
            .then(response => {
                if (response.status === 200) {
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
    registerTenant(customer) {
        return axios.post(API_SIGN_UP_TENANT, {
            name: customer.name,
            lastName: customer.lastname,
            gender: customer.gender,
            date_of_birth: customer.date_of_birth,
            description: customer.description,
            photo: customer.photo,
            email: customer.email,
            occupation: customer.occupation,
            password: customer.password,
            phone_number: customer.phone_number,
            country: customer.country,
            city: customer.city
        });
    }

    //REGISTER AGENCY
    registerOwner(agency) {
        return axios.post(API_SIGN_UP_OWNER, {
            email: agency.email,
            password: agency.password,
            name: agency.name,
            lastName: agency.lastName,
            gender: agency.gender,
            date_of_birth: agency.date_of_birth,
            description: agency.description,
            phone_number: agency.phone_number,
            country: agency.country,
            city: agency.city,
            address: agency.address,
            photo: agency.photo,
            score: agency.score,
            subscriptionId: agency.subscriptionId
        }).then(
            response => {
                if (response.status === 200) {
                    console.log("user:" + response.data);
                }
                else{
                    console.log(response.status)
                    console.log(response.data)
                }
            }
        )
            .catch(e => console.log(e));
    }

}
export default new AuthService()
