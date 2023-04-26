import { useState, useRef } from "react";
import { useHistory, Link } from "react-router-dom";

import { auth, db } from "../../firebase";
import { Form, Input, Button} from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

import "./_sign_up_page.scss";

const SignUp = () => {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
    error: null,
  });

  const signInRef = useRef(null)

  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      event.preventDefault()
      signInRef.current.click()
    }
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const { fullName, email, password } = userDetails;

    return auth
      .doCreateUserWithEmailAndPassword(email, password, fullName)
      .then((authUser) => {
        db.doCreateUser(authUser.user.uid, fullName, email);
        history.push("/boards");
      })
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
    <div className="sign-up-container">
      <Form onKeyDown={handleKeyPress}>
        <h1>Зарегистрироваться</h1>

        <Form.Item
          name="fullName"
          rules={[{ required: true, message: "Пожалуйста, введите ваше имя пользователя!" }]}
        >
          <Input
            type="text"
            name="fullName"
            placeholder="Введите свое полное имя"
            onChange={(e) => handleOnChange(e)}
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Пожалуйста, введите ваше имя пользователя!" }]}
        >
          <Input
            type="text"
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
            placeholder="введите пароль"
            onChange={(e) => handleOnChange(e)}
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
            placeholder="Подтвердите пароль"
            onChange={(e) => handleOnChange(e)}
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block onClick={(e) => handleOnSubmit(e)} ref={signInRef}>
            Зарегистрироваться
          </Button>
        </Form.Item>
        {userDetails.error && (
          <div style={{ color: "red", fontSize: "0.75rem" }}>
            {userDetails.error}
          </div>
        )}
        <Form.Item>
        У вас уже есть аккаунт? <Link to="/sign-in">Войти</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignUp
