import { useState, useRef } from "react";
import { useHistory, Link } from "react-router-dom";

import { auth } from "../../firebase";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import "./_login_page.scss";

const SignIn = () => {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    error: null,
  });

  const loginRef = useRef(null)

  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      event.preventDefault()
      loginRef.current.click()
    }
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const { email, password } = userDetails;

    return auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => history.push("/boards"))
      .catch((error) =>
        setUserDetails((prevState) => ({ ...prevState, error: error.message }))
      );
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    setUserDetails((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="sign-in-container">
      <Form onKeyDown={handleKeyPress}>
        <h1>Войти</h1>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Пожалуйста, введите ваше имя пользователя!" }]}
        >
          <Input
            type="email"
            name="email"
            placeholder="Введите ваш адрес электронной почты"
            onChange={(e) => handleOnChange(e)}
            prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Пожалуйста, введите ваш пароль!" }]}
        >
          <Input.Password
            name="password"
            type="password"
            placeholder="Введите ваш пароль"
            onChange={(e) => handleOnChange(e)}
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" block onClick={(e) => handleOnSubmit(e)} ref={loginRef}>
            Войти
          </Button>
        </Form.Item>
        {userDetails.error && (
          <div style={{ color: "red", fontSize: "0.75rem" }}>
            {userDetails.error}
          </div>
        )}
        <Form.Item>
          {/* <div style={{ marginBottom: "12px" }}>
            <Link to="/forgot-password">Забыли пароль?</Link>
          </div> */}
          У вас нет аккаунта? <Link to="/sign-up">Зарегистрироваться</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignIn
