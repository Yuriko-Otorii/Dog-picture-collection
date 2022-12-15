import React, { useState } from "react";

import { Form, Input, Button, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import Navigation from "../Components/Navigation";
import addPostStyle from "../Styles/addPost.module.scss";

const { TextArea } = Input;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

function AddPost() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleSubmit = () => {};

  return (
    <>
      <div className={addPostStyle["addPost-body-wrapper"]}>
        <h2 style={{ marginBottom: "1rem" }}>Create new post</h2>
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="postText"
            label="Text"
            // labelCol={{ span: 9 }}
            labelAlign="right"
          >
            <TextArea rows={4} placeholder="Write about dog..." />
          </Form.Item>
          {/* <Form.Item name="postImg" label="Image" labelAlign="right" style={{width: "100px"}}>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item> */}
          <Form.Item className={addPostStyle["addPost-post-btn"]}>
            <Button type="primary" htmlType="submit" size="large">
              Post
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Navigation />
    </>
  );
}

export default AddPost;
