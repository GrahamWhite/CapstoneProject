import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { backendURL } from '../../globals';
import SettingsForm from '../SettingsForm';


function SettingsPage() {

  const [user, setUser] = useState({});

  const history = useHistory();

  useEffect(() => {
    let storedUsername = localStorage.getItem('username');
    let username = '';

    if (storedUsername) {
      username = storedUsername;
    }
    else {
      history.push('/login');
    }

    let url = `${backendURL}/select_user?username=${username}`;
    fetch(url)
      .then(response => response.json())
      .then(data => { setUser(data); console.log(data); })
      .catch(err => console.log(err));
    console.log(user);
  }, [])

  return (
    <div>
      <SettingsForm 
        user={user}/>
    </div>
  )
}

export default SettingsPage
