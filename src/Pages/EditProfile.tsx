import { useState } from "react";

import { Button, Form, Input, Upload, message } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { v4 as uuidv4 } from "uuid";

import profileStyle from "../Styles/profile.module.scss";
import { supabase } from "../Auth/supabaseClient";
import Header from "../Components/Header";
import { useAuth } from "../Auth/AuthContext";

const EditProfile = () => {
  const { user } = useAuth()
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      setUploading(true);
      const uuid = uuidv4();
      if(values.avatarImg && values.username){
        const { data, error } = await supabase.storage
          .from("avatar-images")
          .upload(`${user.id}/${uuid}`, values.avatarImg.file, {
            cacheControl: "3600",
            upsert: false,
          });
  
        const key: string | undefined = data?.path;
        const { data: publicUrl } = supabase.storage
          .from("avatar-images")
          .getPublicUrl(key!);      
        
        await supabase
          .from("users")
          .update({
            username: values.username,
            avatarImg: publicUrl,
          })
          .eq("userId", user.id);
      }else if(!(values.avatarImg)){
        await supabase
          .from("users")
          .update({
            username: values.username,
          })
          .eq("userId", user.id);
      }else if(!(values.username)){
        const { data, error } = await supabase.storage
          .from("avatar-images")
          .upload(`${user.id}/${uuid}`, values.avatarImg.file, {
            cacheControl: "3600",
            upsert: false,
          });
  
        const key: string | undefined = data?.path;
        const { data: publicUrl } = supabase.storage
          .from("avatar-images")
          .getPublicUrl(key!);      
        
        await supabase
          .from("users")
          .update({
            avatarImg: publicUrl,
          })
          .eq("userId", user.id);
      }

      form.resetFields();
      setUploading(false);
      //Success alart
      messageApi.open({
        type: "success",
        content: "Successfully added.",
      });
    } catch (error) {
      if (error) console.error(error);
      messageApi.open({
        type: "error",
        content: "Something wrong.",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className={profileStyle["EditProfile-body-wrapper"]}>
        <Header title="Edit Profile" />
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item
            name="username"
            label="User name"
            labelAlign="right"
            style={{ width: "300px" }}
            labelCol={{ span: 9 }}
          >
            <Input placeholder="New username" />
          </Form.Item>
          <Form.Item
            name="avatarImg"
            label="Avatar Image"
            labelAlign="right"
            style={{ width: "300px" }}
            valuePropName="checked"
          >
            <Upload
              listType="picture"
              maxCount={1}
              accept=".png, .jpeg"
              beforeUpload={(file) => {
                setFileList([...fileList, file]);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
          <Form.Item className={profileStyle["EditProfile-confirm-btn"]}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={uploading}
            >
              Comfirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditProfile;
