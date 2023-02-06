import React, { useEffect, useState } from "react";

import { Form, Input, Button, message, Upload } from "antd";
// import ImgCrop from 'antd-img-crop';
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import {v4 as uuidv4 } from "uuid"

import addPostStyle from "../Styles/addPost.module.scss";
import { supabase } from "../Auth/supabaseClient";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useAuth } from "../Auth/AuthContext";

const { TextArea } = Input;


const AddPost = () => {
  const { user } = useAuth()
  const [error, setError] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm();


  const handleSubmit = async (values: any) => {
    try {      
      setUploading(true);
      const uuid = uuidv4()
      const {data, error } = await supabase
        .storage
        .from("post-photos")
        .upload(`${user.id}/${uuid}`, values.postImg.file, {
          cacheControl: '3600',
          upsert: false
        })
      if(error) throw error;


      const key: string | undefined = data?.path;
      const { data: publicUrl } = supabase.storage.from("post-photos").getPublicUrl(key!)
      
      await supabase.from("all-posts").insert([{
        userId: user.id,
        postText: values.postText,
        postImg: publicUrl
      }])      
      
      form.resetFields();
      setUploading(false)
      
      //Success alart
      messageApi.open({
        type: 'success',
        content: 'Successfully added.',
      })        

    } catch (error) {
      console.error(error);
      messageApi.open({
        type: 'error',
        content: 'Something went wrong. Please try again.',
      })
    }   
      
  };

  const handleFailed = () => {
    setError(true)
  }

  return (
    <>
      {contextHolder}
      <div className={addPostStyle["addPost-body-wrapper"]}>
        <Header title="Create new post" />
        <Form onFinish={handleSubmit} onFinishFailed={handleFailed} form={form}>
          <Form.Item
            name="postText"
            label="Text"
            labelAlign="right"
            style={{ width: "300px" }}
            labelCol={{ span: 9 }}
          >
            <TextArea rows={3} placeholder="Write about dog..." />
          </Form.Item>
          <Form.Item
            name="postImg"
            label="Image"
            labelAlign="right"
            style={{ width: "300px" }}
            valuePropName="checked"
            labelCol={{ span: 9 }}
          >
          <Upload 
            listType="picture"
            maxCount={1}
            accept=".png, .jpeg"
            beforeUpload={file => {
              setFileList([...fileList, file])
              return false
            }}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
           
          </Form.Item>
          <Form.Item className={addPostStyle["addPost-post-btn"]}>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large"
              loading={uploading}
              disabled={fileList.length === 0}
              >
              Post
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default AddPost;