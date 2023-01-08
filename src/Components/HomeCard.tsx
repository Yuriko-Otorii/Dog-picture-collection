import { Avatar, Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { formatDistance } from "date-fns";

import { Post } from "../DataTypes/Post.type";
import homeCardStyle from '../Styles/homeCard.module.scss'
const { Meta } = Card;

const HomeCard = ({ item }: { item: Post }) => {
  const timestamp = formatDistance(new Date(item.postDate), new Date(), {
    addSuffix: true,
  });  

  return (
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
          avatar={<Avatar shape="square" src={item.users.avatarImg} />}
          title={item.users.username}
        />
        <p style={{ marginTop: ".5rem", fontSize: ".7rem" }}>{timestamp}</p>
        <p className={homeCardStyle['HomeCard-post-text']}>{item.postText}</p>
      </Card>
  );
};

export default HomeCard;

//Resize img when it is posted
