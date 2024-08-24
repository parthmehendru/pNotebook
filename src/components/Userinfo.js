import React, {useEffect, useState} from 'react'

const Userinfo = () => {
    const [user, setUser] = useState({name:"", email: "", date: ""});
    const CMY = (timestamp)=> {
        const date = new Date(timestamp);
        // Extract the year and month
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' }); // 'long' gives the full name of the month
        const day = date.getDate();
        // Format as "Month Year"
        const formattedDate = `${month} ${day}, ${year}`;
        return formattedDate;
    }
    const getUser = async ()=> {
        const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const json = await response.json();
        setUser({name: json.name, email: json.email, date: json.date});

    }
    useEffect(() => {
      getUser();
    }, [])
    
    

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '20px auto' }}>
    <div className="card-body">
        <h5 className="card-title text-center">User Profile</h5>
        <div className="d-flex justify-content-between mb-3">
            <span className="fw-bold">Name:</span>
            <span>{user.name}</span>
        </div>
        <div className="d-flex justify-content-between mb-3">
            <span className="fw-bold">Email:</span>
            <span>{user.email}</span>
        </div>
        <div className="d-flex justify-content-between mb-3">
            <span className="fw-bold">Account Since:</span>
            <span>{CMY(user.date)}</span>
        </div>
    </div>
</div>
  )
}

export default Userinfo
