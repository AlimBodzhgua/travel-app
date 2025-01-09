import axios from 'axios';

const appHeaders = {
	'Content-Type': 'application/json',
};

const $axios = axios.create({
	baseURL: 'http://localhost:8080',
	headers: appHeaders,
});

export default $axios;