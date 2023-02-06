import React, { useState } from "react";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../Auth/supabaseClient";
import loginStyle from "../Styles/login.module.scss";
import { useAuth } from "../Auth/AuthContext"

type loginItems = {
  email: string;
  password: string;
};

const Login = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  const handleOnSubmit = async (values: loginItems) => {
    try {     
      const { data } = await supabase.auth.signInWithPassword({
        email: values.email, 
        password: values.password,
      })

      if(data.user){
        navigate("/") 
        
      }else{
        messageApi.open({
          type: 'error',
          content: 'Cannot find user. Please try again.',
        })
      }      
    } catch (error) {
      console.error(error); 
      messageApi.open({
        type: 'error',
        content: 'Something went wrong. Please try again.',
      })
    }
  };  

  const validateMessages = {
    required: '${label} is required',
    email: '${label} is not a valid email'
  };
  
  return (
    <>
      {contextHolder}
      <div className={loginStyle["Login-body"]}>
        <h2 className={loginStyle["Login-title"]}>Login</h2>
        <Form
          name="normal_login"
          className={loginStyle["Login-form"]}
          initialValues={{ remember: true }}
          validateMessages={validateMessages}
          onFinish={handleOnSubmit}
        >
          <Form.Item
            name="email"
            label="E-mail"
            labelCol={{ span: 7 }}
            labelAlign="left"
            rules={[{ required: true, type: 'email'}]}
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
            rules={[{ required: true},
              //Check length
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue('password').length >= 6) {
                    return Promise.resolve();
                  }else{
                    return Promise.reject(new Error('Password must be more than 6 characters'));
                  }                  
                },
              }),
            ]}
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


