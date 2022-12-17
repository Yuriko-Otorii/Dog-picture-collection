import React from "react";

import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";

import signUpStyle from "../styles/signup.module.scss";
import { supabase } from "../Auth/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

type signupItem = {
  confirm: string;
  username: string;
  email: string;
  password: string;
};



function SignUp() {
  const navigate = useNavigate()

  const supabaseSignup = async (signupItem: signupItem) => {
    const { data, error } = await supabase.auth.signUp({email: signupItem.email, password: signupItem.password});
      error && console.log(error);

  };

  const handleSubmit = async (values: signupItem) => {
    try {      
      await supabaseSignup(values);
      const {
        data: { session },
      } = await supabase.auth.getSession();      
      await supabase.from("users").insert([{ username: values.username, userId: session?.user.id}]);
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <>
      <div className={signUpStyle["Signup-body"]}>
        <h2 className={signUpStyle["Signup-title"]}>Sign up</h2>
        <Form onFinish={handleSubmit} className={signUpStyle["Signup-form"]}>
          <Form.Item
            name="username"
            label="User name"
            labelCol={{ span: 9 }}
            labelAlign="right"
            rules={[{ required: true, message: "Please input your Username!" }]}
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
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
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
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
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
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
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
            <Button
              type="primary"
              htmlType="submit"
              size="large"
            >
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
}

export default SignUp;

//https://codesandbox.io/s/dq4rgv?file=/demo.tsx

//https://www.npmjs.com/package/antd-password-input-strength

//https://dev.classmethod.jp/articles/supabase-triggers/
