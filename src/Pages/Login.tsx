import React, { useState } from "react";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../Auth/supabaseClient";
import loginStyle from "../Styles/login.module.scss";

type loginItems = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate()
  const [session, setSession] = useState(null)

  const handleOnSubmit = async (values: loginItems) => {
    console.log(values.email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email, 
      password: values.password,
    })   
    navigate('/')
    error && console.log(error);
  };

  return (
    <>
      <div className={loginStyle["Login-body"]}>
        <h2 className={loginStyle["Login-title"]}>Login</h2>
        <Form
          name="normal_login"
          className={loginStyle["Login-form"]}
          initialValues={{ remember: true }}
          onFinish={handleOnSubmit}
        >
          <Form.Item
            name="email"
            label="E-mail"
            labelCol={{ span: 7 }}
            labelAlign="left"
            rules={[{ required: true, message: "Please input your E-mail!" }]}
          >
            <Input
              name="email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            labelCol={{ span: 7 }}
            labelAlign="left"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              name="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item className={loginStyle["Login-btn"]}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
            >
              Log in
            </Button>
            <br />
          </Form.Item>
          <Form.Item className={loginStyle["Login-register-link"]}>
            <Link to={"/signup"}>Register now from here!</Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Login;
