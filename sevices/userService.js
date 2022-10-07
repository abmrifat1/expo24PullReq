import IPv4 from '../config';

const URL = `http://${IPv4}:3333`

export const getAllUsers = async () => {
    try {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json')

        const requestOptions = {
            method: 'GET',
            headers: headers
        };

        const response = await fetch(`${URL}/users`, requestOptions);
        const json = await response.json();
        return json;

    } catch (e) {
        console.log('error in geting branch by address!', e);
    }
}

export const getUserByName = async (name) => {
    try {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json')

        const requestOptions = {
            method: 'GET',
            headers: headers
        };

        const response = await fetch(`${URL}/users/${name}`, requestOptions);
        const json = await response.json();
        return json;

    } catch (e) {
        console.log('error in geting branch by address!', e);
    }
}

const UserService = {
    getAllUsers
}

export default UserService;