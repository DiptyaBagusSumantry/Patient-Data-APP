import request from "./utils/request";

class Api {

    static urlAPI() {
        return process.env.REACT_APP_BACKEND_URL
        // return process.env.REACT_APP_BACKEND_PROD_URL
    }

    // Begin :: Auth
    static Login(username, password) {
        let path = 'login';
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data: {
                username,
                password,
            },
        })
    }
    static Register(data) {
        let path = 'register';
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data
        })
    }

    // static Register(data) {
    //     let path = 'register';
    //     return request(`${this.urlAPI()}${path}`, {
    //         method: 'POST',
    //         data,
    //     })
    // }

    static Fetch(token) {
        let path = `fetch`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static GetCode(token) {
        let path = `key-code`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static AmountHeader(token) {
        let path = `header`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    // Pasien
    static GetPasien(token, keyword, page) {
        let path = `patient?search=${keyword}&page=${page}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static GetPasienById(token, id) {
        let path = `patient/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static CreatePasien(token, data) {
        let path = `patient`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static UpdatePasien(token, data, id) {
        let path = `patient/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    
    static DeletePasien(token, id) {
        let path = `patient/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    // Rekam Medis
    static GetRekamMedisByPatient(token, id) {
        let path = `rekam-medis/patient/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static GetRekamMedis(token, keyword, page) {
        let path = `rekam-medis?search=${keyword}&page=${page}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static GetRekamMedisById(token, id) {
        let path = `rekam-medis/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static CreateRekamMedis(token, data) {
        let path = `rekam-medis`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static UpdateRekamMedis(token, data, id) {
        let path = `rekam-medis/put/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    
    static DeleteRekamMedis(token, id) {
        let path = `rekam-medis/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    // Payment

    static GetPayment(token, keyword, page) {
        let path = `invoice?search=${keyword}&page=${page}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static GetPaymentById(token, id) {
        let path = `invoice?invoiceId=${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static UpdatePayment(token, data, id) {
        let path = `invoice/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static CreateLayanan(token, data) {
        let path = `medicine`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static GetLayanan(token, keyword) {
        let path = `medicine`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static GetLayananById(token, id) {
        let path = `medicine/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static UpdateLayanan(token, data, id) {
        let path = `medicine/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static DeleteLayanan(token, id) {
        let path = `medicine/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
}

export default Api;
