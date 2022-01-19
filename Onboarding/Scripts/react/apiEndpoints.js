import Axios from 'axios';

// fetch is unused but is available.
const ApiEndpoints = {
    customer: {
        fetchAll: (page, limit) => Axios.get(`/Customer/Fetch?page=${page}&limit=${limit}`),
        fetchCount: () => Axios.get('/Customer/FetchCount'),
        fetch: (id) => Axios.get('/Customer/Fetch/' + id),
        create: (customer) => Axios.post('/Customer/Create', customer),
        update: (customer) => Axios.put('/Customer/Update', customer),
        delete: (id) => Axios.delete('/Customer/Delete/' + id),
    },

    product: {
        fetchAll: (page, limit) => Axios.get(`/Product/Fetch?page=${page}&limit=${limit}`),
        fetchCount: () => Axios.get('/Product/FetchCount'),
        fetch: (id) => Axios.get('/Product/Fetch/' + id),
        create: (product) => Axios.post('/Product/Create', product),
        update: (product) => Axios.put('/Product/Update', product),
        delete: (id) => Axios.delete('/Product/Delete/' + id),
    },

    store: {
        fetchAll: (page, limit) => Axios.get(`/Store/Fetch?page=${page}&limit=${limit}`),
        fetchCount: () => Axios.get('/Store/FetchCount'),
        fetch: (id) => Axios.get('/Store/Fetch/' + id),
        create: (store) => Axios.post('/Store/Create', store),
        update: (store) => Axios.put('/Store/Update', store),
        delete: (id) => Axios.delete('/Store/Delete/' + id),
    },

    sale: {
        fetchAll: (page, limit) => Axios.get(`/Sale/Fetch?page=${page}&limit=${limit}`),
        fetchCount: () => Axios.get('/Sale/FetchCount'),
        fetch: (id) => Axios.get('/Sale/Fetch/' + id),
        create: (sale) => Axios.post('/Sale/Create', sale),
        update: (sale) => Axios.put('/Sale/Update', sale),
        delete: (id) => Axios.delete('/Sale/Delete/' + id),
    }
};

export default ApiEndpoints;