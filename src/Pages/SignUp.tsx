import React from "react";

import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";

import signUpStyle from "../Styles/signup.module.scss";
import { supabase } from "../Auth/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

type signupItem = {
  confirm: string;
  username: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const navigate = useNavigate();

  const supabaseSignup = async (signupItem: signupItem) => {
    const { data, error } = await supabase.auth.signUp({
      email: signupItem.email,
      password: signupItem.password,
    });
    error && console.log(error);
  };

  const handleSubmit = async (values: signupItem) => {
    try {
      await supabaseSignup(values);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      await supabase
        .from("users")
        .insert([{ username: values.username, userId: session?.user.id }]);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const passwordValidator = {
    lowerCaseLetters: /[a-z]/g,
    upperCaseLetters: /[A-Z]/g,
    numbers: /[0-9]/g,
    length: 8,
  }

  const validateMessages = {
    required: "${label} is required",
    email: "${label} is not a valid email"    
  };

  return (
    <>
      <div className={signUpStyle["Signup-body"]}>
        <h2 className={signUpStyle["Signup-title"]}>Sign up</h2>
        <Form
          onFinish={handleSubmit}
          className={signUpStyle["Signup-form"]}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="username"
            label="User name"
            labelCol={{ span: 9 }}
            labelAlign="right"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Username"
              name="username"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            labelCol={{ span: 9 }}
            labelAlign="right"
            rules={[{ type: "email" }, { required: true }]}
          >
            <Input
              placeholder="E-mail"
              name="email"
              prefix={<MailOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            labelCol={{ span: 9 }}
            labelAlign="right"
            rules={[{required: true}, 
              //Check lowercase letters
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue('password').match(passwordValidator.lowerCaseLetters)) {
                    return Promise.resolve();
                  }else{
                    return Promise.reject(new Error('Password must include lowercase letters'));
                  }                  
                },
              }),
              //Check uppercase letters
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue('password').match(passwordValidator.upperCaseLetters)) {
                    return Promise.resolve();
                  }else{
                    return Promise.reject(new Error('Password must include uppercase letters'));
                  }                  
                },
              }),
              //Check numbers
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue('password').match(passwordValidator.numbers)) {
                    return Promise.resolve();
                  }else{
                    return Promise.reject(new Error('Password must include numbers'));
                  }                  
                },
              }),
              //Check length
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue('password').length >= 8) {
                    return Promise.resolve();
                  }else{
                    return Promise.reject(new Error('Password must be more than 8 characters'));
                  }                  
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Password"
              name="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            labelCol={{ span: 9 }}
            labelAlign="right"
            dependencies={["password"]}
            hasFeedback
            rules={[{required: true},
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match."
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Password"
              name="confirm"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item className={signUpStyle["Signup-btn"]}>
            <Button type="primary" htmlType="submit" size="large">
              Register
            </Button>
          </Form.Item>
          <Form.Item className={signUpStyle["Signup-login-link"]}>
            <Link to={"/login"}>Login from here!</Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default SignUp;

//https://codesandbox.io/s/dq4rgv?file=/demo.tsx

//https://www.npmjs.com/package/antd-password-input-strength

//https://dev.classmethod.jp/articles/supabase-triggers/
