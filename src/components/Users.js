import { useState, useEffect } from 'react';
import api from '../api';
import axios from 'axios';
export default function Users() {
  const [users, setUser] = useState([]);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGQ2ZWY5ZjlhOTc2MTliYzNiMTYzMCIsImlhdCI6MTY5NTU5NTY0MywiZXhwIjoxNjk1NjgyMDQzfQ.-bhx4829uCApxiXTlJpX2tnSPhITpyxdt6jW2D-5EDo'

  useEffect(() => {
    axios.post(`${api}/profile`,{},
      {
        headers: {
          'Authorization': `Basic ${token}` 
        }
      })
      .then(res => {
        const userData = res.data;
        setUser(userData);
      });
  }, []); 

  return (
    users
  );
}

