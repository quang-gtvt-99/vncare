// export const getUserInfo = (name) => {
//     let username = name.toLowerCase().trim();
//     const URL = `https://api.github.com/users/${username}`;
//     return fetch(URL)
//             .then((res) => res.json());
// }
import config from './config.js'

const {globalUrl} = config
export const getQuanHeByBenhNhanId = (benhnhanid) => {
    const URL = `${globalUrl}/benhnhan/${benhnhanid}/quanhe`;
    console.log(URL)
    return fetch(URL)
            .then((response) => response.json())
            .catch((error) => console.error(error));
}

export const getBenhNhanByBenhnhanId = (benhnhanid) =>{
    const URL = `${globalUrl}/benhnhan/${benhnhanid}`;
    return fetch(URL)
            .then((response) => response.json())
            .catch((error) => console.error(error));
}

export const getAllTinh = () =>{
    const URL = `${globalUrl}/tinh`
    return fetch(URL)
            .then((response) => response.json())
            .catch((error) => console.error(error));
}

export const getCosoyteByTinhId = (tinhid) =>{
    const URL = `${globalUrl}/tinh/${tinhid}/cosoyte`
    return fetch(URL)
            .then((response) => response.json())
            .catch((error) => console.error(error));
}

export const getKhoaByCosoyteId = (cosoyteid) =>{
    const URL = `${globalUrl}/cosoyte/${cosoyteid}/khoa`
    return fetch(URL)
            .then((response) => response.json())
            .catch((error) => console.error(error));
}

export const getBacSiByKhoaId = (khoaid) =>{
    const URL = `${globalUrl}/khoa/${khoaid}/bacsi`
    return fetch(URL)
            .then((response) => response.json())
            .catch((error) => console.error(error));
}

export const getTinhById = (id) =>{
    const URL = `${globalUrl}/tinh/${id}`
    return fetch(URL)
            .then((response) => response.json())
            .catch((error) => console.error(error));
}

export const getCosoyteById = (id) =>{
    const URL = `${globalUrl}/cosoyte/${id}`
    return fetch(URL)
            .then((response) => response.json())
            .catch((error) => console.error(error));
}

export const getKhoaById = (id) =>{
    const URL = `${globalUrl}/khoa/${id}`
    return fetch(URL)
            .then((response) => response.json())
            .catch((error) => console.error(error));
}

export const getBacSiById = (id) =>{
    const URL = `${globalUrl}/bacsi/${id}`
    return fetch(URL)
            .then((response) => response.json())
            .catch((error) => console.error(error));
}
