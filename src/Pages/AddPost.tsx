import React, { useEffect, useState } from "react";

import { Form, Input, Button, Upload, message } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import dogGif from "../pictures/dogGif.gif"
import addPostStyle from "../Styles/addPost.module.scss";
import { supabase } from "../Auth/supabaseClient";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

const { TextArea } = Input;
const {
  data: { session },
} = await supabase.auth.getSession();


function AddPost() {
  const [imgURL, setImgUrl] = useState<string>()
  const [loading, setLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) navigate("/login");
  }, []);

  const handleChange = (response: any) => {
    if (response.file.status !== 'uploading') {
      console.log(response.file, response.fileList);
    }
    if (response.file.status === 'done') {
      message.success(`${response.file.name} 
                       file uploaded successfully`);
    } else if (response.file.status === 'error') {
      message.error(`${response.file.name} 
                     file upload failed.`);
    }  
  };
  const handleSubmit = () => {};


  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className={addPostStyle["addPost-body-wrapper"]}>
      <h1 style={{margin: "5rem auto 2rem"}}>Coming soon!</h1>
      <img src={dogGif} alt="Dog gif" />
    </div>
  )
  // (
  //   <>
  //     <div className={addPostStyle["addPost-body-wrapper"]}>
  //       {/* <h2 style={{ marginBottom: "1rem" }}>Create new post</h2> */}
  //       <Header title="Create new post" />
  //       <Form onFinish={handleSubmit}>
  //         <Form.Item
  //           name="postText"
  //           label="Text"
  //           // labelCol={{ span: 9 }}
  //           labelAlign="right"
  //         >
  //           <TextArea rows={3} placeholder="Write about dog..." />
  //         </Form.Item>
  //         <Form.Item
  //           name="postImg"
  //           label="Image"
  //           labelAlign="right"
  //           style={{ width: "100px" }}
  //           valuePropName="checked"
  //         >
  //           <Upload
  //             listType="picture-card"
  //             showUploadList={false}
  //             beforeUpload={(file) => {
  //               console.log("beforeUpload", file);
  //             }}
  //             onChange={handleChange}
  //           >
  //             {imgURL ? imgURL : uploadButton}
  //           </Upload>
  //         </Form.Item>
  //         <Form.Item className={addPostStyle["addPost-post-btn"]}>
  //           <Button type="primary" htmlType="submit" size="large">
  //             Post
  //           </Button>
  //         </Form.Item>
  //       </Form>
  //     </div>
  //   </>
  // );
}

export default AddPost;


//https://www.to-r.net/media/supabase-next/
