const API_URL = "http://localhost:5000/api";

export async function registerUser(userData) {
    const response = await fetch(`${API_URL}/users/register`,{
        method : "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
    });

    const data = await response.json();

    if(!response.ok)
        throw new Error(data.message || "Registeration failed");

    return data;
}


export async function loginUser(userData) {
    const response = await fetch(`${API_URL}/users/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
    }) ;
    
    const data = await response.json();

    if(!response.ok)
        throw new Error(data.message || "Registration failed");

    return data;
}

export async function getCaptions() {
    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:5000/api/captions",
        {
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if(!response.ok){
        throw new Error(
            data.message || "Failed to fetch captions"
        );
    }
    return data;
}