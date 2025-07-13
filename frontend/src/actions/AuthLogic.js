

// src/actions/auth/registerUser.js

export async function registerUser(formData) {
  const user = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user-route/user-register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.msg || 'Registration failed');
    }

    const result = await response.json();
    return result; // { message: "User created", user: {...} }
  } catch (err) {
    throw err;
  }
}



// login user
export async function LoginUser(formData) {

  const user = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user-route/user-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });


  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.msg || 'Login failed');
    }

    const result = await response.json();

    return result;
  } catch (err) {
    throw err;
  }
}

export async function AuthUser(){
   try {
     const response =await fetch(`${import.meta.env.VITE_API_BASE_URL}/user-route/auth-user-details`,{
      method:'GET',
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
      }
     });

     const result=await response.json();

     if(response.ok){

      return result;

     }else{

      return result;

     }

    
   } catch (error) {
     throw error;
   }
}