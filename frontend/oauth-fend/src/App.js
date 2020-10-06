import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import DefaultNavBar from "./components/navbars/DefaultNavBar";
import LogedInNavBar from "./components/navbars/LogedInNavBar";
import Main from "./components/Main";
import { UserContext } from './services/UserContext';
import { TokenContext } from './services/TokenContext.js';
import Cookie from "js-cookie";


function useQuery() {
  return new URLSearchParams(window.location.search);
}

const useStateWithCookie = key => {
  const [token, setToken] = useState(
    Cookie.get(key) || ''
  );

  useEffect(() => {
    Cookie.set(key, token);
  }, [token]);

  return [token, setToken];
};

const App = () => {
  const [token, setToken] = useStateWithCookie(
    'ssdAssignmentToken'
  );
  const [user, setUser] = useState();

  useEffect(() => {
    if (token != '' && user == null) {
      axios.post('http://localhost:5000/user/getUserInfo', { token: JSON.parse(token) }).then((res) => {
        if (res.status != 200) return console.log(res.statusText);
        console.log(res.data);
        setUser(res.data);
      });
    }
  });

  let query = useQuery();

  if (query.get('code') != null) {
    console.log('found code')
    axios.post('http://localhost:5000/auth/validate', { code: query.get('code') }).then((res) => {
      res.status == 200 ? setToken(JSON.stringify(res.data)) : console.log(res.statusText);
      window.location.search = '';
    });
  }

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <UserContext.Provider value={{ user, setUser }}>
        {token == '' ? <DefaultNavBar /> : <LogedInNavBar />}
        <Main />
      </UserContext.Provider>
    </TokenContext.Provider>
  );
};


export default App;