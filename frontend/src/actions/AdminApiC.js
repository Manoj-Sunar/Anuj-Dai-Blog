

export const AdminLogin = async (isAdmin) => {
    
    try {
        const response = await fetch(`https://anuj-dai-blog-backend.onrender.com/admin-route/admin-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(isAdmin)
        });

        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            return result;
        }

    } catch (error) {

    }
}




export const AdminGetDashboardSummery=async()=>{
     try {
        const response = await fetch(`https://anuj-dai-blog-backend.onrender.com/admin-route/admin-dashboard-stats`, {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
            },
            
        });

        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            return result;
        }

    } catch (error) {
           console.log(error);
    }
}


export const AdminGetBlogsOverTimeLineChart=async()=>{
     try {
        const response = await fetch(`https://anuj-dai-blog-backend.onrender.com/admin-route/get-blogs-overtime`, {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
            },
            
        });

        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            return result;
        }

    } catch (error) {
           console.log(error);
    }
}


export const AdminGetDunutChart=async()=>{
     try {
        const response = await fetch(`https://anuj-dai-blog-backend.onrender.com/admin-route/get-bar-chart-data`, {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
            },
            
        });

        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            return result;
        }

    } catch (error) {
           console.log(error);
    }
}
