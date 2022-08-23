import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './Login.scss';
import { useAuth } from '../../hook/useAuth';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const content = useAuth();
  const users = content?.users;
  const setUsers = content?.setUsers;
  const singin = content?.singin;
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isValid, setIsValid] = useState(true);

  const handleCallbackResponse = (respose: { credential: string; }) => {
    const userObject: UserGoogle = jwt_decode(respose.credential);

    const newUser = {
      id: Date.now(),
      name: userObject.name,
      email: userObject.email,
      picture: userObject.picture,
      status: "online",
      password: '',
    };

    if (singin) {
      singin(newUser, () => navigate('/', { replace: true }));
    }
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "527915999336-87cb59dp6vnnkji5v702l6oubn9bdhd2.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signinDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setIsValid(true);

    switch (name) {
      case 'email':
        setForm({
          ...form,
          email: value,
        });
        break;

      case 'password':
        setForm({
          ...form,
          password: value,
        });
        break;

      default:
        break;
    }
  };

  const resetForm = () => {
    setForm({
      email: '',
      password: '',
    });

    setIsValid(true);
  };

  const validation = useMemo(() => {
    // eslint-disable-next-line no-useless-escape
    const validator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return (form.password.length > 0
      && validator.test(form.email));
  }, [form]);

  const userSingin = useMemo(() => {
    const newUser = users?.find(user => user.email === form.email
      && user.password === form.password);

    return newUser;
  }, [form, users]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validation) {
      const person = userSingin;
      
      if (person && singin) {
        singin(person, () => navigate('/', { replace: true }));
        
        if (users && setUsers) {
          person.status = 'online';
  
          const updateUsers = users.map(user => user.id === person.id
            ? person
            : user);

          setUsers(updateUsers);
          localStorage.setItem('users', JSON.stringify(updateUsers));
        }
      } else {
        navigate('/wrong');
      }

      resetForm();
    } else {
      setIsValid(false);
    }
  }

  return (
    <div className="login login--mobile">
      <h2 className="login__title">Login Page</h2>
      <form
        method="POST"
        className="login__form login__form--mobile"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Email"
          className="login__form__input"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Password"
          className="login__form__input"
          onChange={handleChange}
        />

        {!isValid && (
          <p className="login__form__error">Enter correct information</p>
        )}

        <button type="submit" className="login__form__submit-button">
          Log in
        </button>

        <p className="login__form__text">OR</p>
        <div id="signinDiv" className='login__form__googleBtn'></div>
      </form>
    </div>
  );
};
