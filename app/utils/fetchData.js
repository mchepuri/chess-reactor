import {wrapPromise} from './wrapPromise';
import axios from 'axios';
export const fetchData = (url) => {
    const response=axios.get(url)
    .then((res) => res.json())
    .then((res) => res.data);
    return wrapPromise(response);
}
