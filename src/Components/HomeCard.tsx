
import { Avatar, Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { formatDistance } from "date-fns";

import dogImg1 from "../pictures/homePic2.jpg";
import dogImg2 from "../pictures/homePic3.jpg";
import { Post } from "../DataTypes/Post.type";

const { Meta } = Card;

function HomeCard({ item }: { item: Post }) {
  const timestamp = formatDistance(new Date(item.postDate), new Date(), {
    addSuffix: true,
  });

  return (
    <>
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="home pictute"
              src={item.postImg}
              style={{ width: "300px", height: "250px" }}
            />
          }
          // actions={[
          //   <EditOutlined key="edit" />,
          //   <EllipsisOutlined key="ellipsis" />,
          //   <HeartOutlined key="Favorite" />,
          // ]}
        >
          <Meta
            avatar={<Avatar shape="square" src={dogImg1} />}
            title={item.username}
          />
          <p style={{ marginTop: ".5rem", fontSize: ".7rem" }}>{timestamp}</p>
          <p style={{ marginTop: ".8rem" }}>{item.postText}</p>
        </Card>
    </>
  );
}

export default HomeCard;

//Resize img when it is posted
