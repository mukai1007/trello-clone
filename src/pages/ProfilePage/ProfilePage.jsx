import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { firebase } from "../../firebase";
import { doPasswordUpdate } from "../../firebase/auth";

import { Input, Form, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";

import "./_profile_page.scss";

const Account = () => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory();

  useEffect(() => {
    firebase.auth.onAuthStateChanged((authUser) => {
      authUser ? setUser(authUser) : setUser(null);
    });
  }, []);

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (password === passwordTwo) {
      return doPasswordUpdate(password)
        .then(() => {
          setPassword("");
          setPasswordTwo("");
          setError(null);
          alert("Пароль был успешно изменен");
          history.push("/boards");
        })
        .catch((err) => setError(err.message));
    } else {
      setError("Пароли не совпадают");
    }
  };
  
  return (
    <div className="account-container">
      <div className="account-details">
        <h2>Аккаунт: {user && user.email}</h2>
        <p>Хотите сбросить пароль?</p>
      </div>
      <form className="account-form">
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Пожалуйста, введите ваш пароль!" }]}
        >
          <Input.Password
            name="password"
            type="password"
            value={password}
            placeholder="Введите новый пароль"
            onChange={(e) => setPassword(e.target.value)}
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: "Пожалуйста, введите ваш пароль!" }]}
        >
          <Input.Password
            name="confirmPassword"
            type="password"
            value={passwordTwo}
            placeholder="Подтвердите новый пароль"
            onChange={(e) => setPasswordTwo(e.target.value)}
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" block onClick={(e) => handleOnSubmit(e)}>
            Сбросить пароль
          </Button>
        </Form.Item>
        {error && (
          <div style={{ color: "red", fontSize: "0.75rem" }}>{error}</div>
        )}
      </form>
    </div>
  );
}

export default Account
