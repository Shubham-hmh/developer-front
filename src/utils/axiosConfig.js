// export const base_url ="http://localhost:5000/api/";
export const base_url ="https://developer-back.onrender.com/api/";


const getTokenFromLocalStorage =localStorage.getItem('customer')
? JSON.parse(localStorage.getItem("customer")):null;

console.log(getTokenFromLocalStorage,"👌👌👌👌");

export const config ={
    headers:{
        Authorization: `Bearer ${
            getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : " "
        }` ,
        Accept:"application/json",
    },
};