import axios from "axios";
// const url = 'http://localhost:5000'
// const url = 'https://taskmanagerbackend-jr6a.onrender.com'
// const url = 'https://siddhant-sharma.in'
const url = `${window.location.origin}`


export const createUser = async(params)=>{
    try {
        console.log("params",params)
        const data = await axios.post(`${url}/api/createUser`,params);
        return data;
    } catch (error) {
        console.log("error occured in api.js")
    }
}

export const login = async(params)=>{
    try {
        const data = await  axios.post(`${url}/api/login`,params);
        return data;
    } catch (error) {
        console.log("error occurd in api.js")
    }
}

export const getUser = async(params)=>{
    try {
        const data = await axios.get(`${url}/api/getUser`,{
            "auth-token":params
        })
        return data;
    } catch (error) {
        console.log("error occured in api.js")
    }
}

export const fetAllTask = async(params)=>{
    try {
        console.log("params------",params);
        let data = await axios.get(`${url}/api/AllTask`,{
            headers:{
            "auth-token":params
        }});
        return data;
    } catch (error) {
        console.log("error occured in api.js")
    }
}

export const addTask = async(params)=>{
    try{
        console.log(params)
        let data={
            title:params.title,
            description:params.description,
            status:params.status,
            dueDate:params.dueDate
        }
        let token=params.token
    const response = await axios.post(`${url}/api/AddTask`,data,{
        headers:{
            "auth-token":token
        }
    });
    return response;
    }catch(error){
        console.log("error occured in api.js");
    }
}

export const updateTask = async(params)=>{
    try {
        // console.log("params==============",params)
        let token = params.token;
        let id = params._id

        let body = {
            title:params.title,
            description:params.description,
            status:params.status,
            dueDate:params.dueDate
        }
        const data = await axios.put(`${url}/api/UpdateTask/${id}`,body,{
            headers:{
                "auth-token":token
            }
        });
        return data;
    } catch (error) {
        console.log("error occured in api.js")
        
    }
}
export const deleteTask = async(params)=>{
    try {
        const data = await axios.delete(`${url}/api/DeleteTask/${params._id}`,{
            headers:{
                "auth-token":params.token
            }
        });
        return data;
    } catch (error) {
        console.log("error occured in api.js")
        
    }
}
