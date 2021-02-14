import Axios from "axios";

function getAllData(){
    return Axios.all([
        Axios.get('https://jsonplaceholder.typicode.com/users'), 
        Axios.get('https://fakestoreapi.com/products')
     ])
}

const x = {};
x.getAllData = getAllData;
export default x;