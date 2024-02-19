import {API_URL} from "../constans/URLs"
import { getToken } from "../helpers/TokenHelper";
export async function Post<T>(entity:T, url:string, auth:boolean): Promise<T>{
    const _url = API_URL + url
    let token = ""
    if(auth){
        token = await getToken()??"";
    }
    const response = await fetch(_url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'token':token
        },
        body:JSON.stringify(entity)
    })
    if(!response.ok){
        const responseMessage = await response.text();  
        throw responseMessage;
    }
    const json = response.json();
    return json;
}
export async function Put<T>(entity:T, url:string, auth:boolean): Promise<T>{
    const _url = API_URL + url
    let token = ""
    if(auth){
        token = await getToken()??"";
    }
    const response = await fetch(_url,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'token':token
        },
        body:JSON.stringify(entity)
    })
    
    if(!response.ok){
        const responseMessage = await response.text();
        throw Error(responseMessage);
    }
    const json = response.json();
    return json;
}
export async function Get<T>(url:string, auth:boolean): Promise<T>{
    const _url = API_URL + url
    let token = ""
    if(auth){
        token = await getToken()??"";
    }
    const response = await fetch(_url,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'token':token
        }
    })
    if(!response.ok){
        const responseMessage = await response.text();
        throw Error(responseMessage);
    }
    const json = response.json();
    return json;
}