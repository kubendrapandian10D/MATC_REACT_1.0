import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";

import instance from "../../axios/instance";

import "bootstrap/dist/css/bootstrap.css";

const CarouselComp = () => {
  const CAROUSEL_API_URL = process.env.REACT_APP_CAROUSEL_API_URL;

  interface IPost {
    id?: number;
    image: string;
  }

  const defaultPosts: IPost[] = [];

  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] =
    useState(defaultPosts);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] = useState("");

  useEffect(() => {
    instance
      .get<IPost[]>(`${CAROUSEL_API_URL}`, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((ex) => {
        let error1 = axios.isCancel(ex)
          ? "Request Cancelled"
          : ex.code === "ECONNABORTED"
          ? "A timeout has occurred"
          : ex.response.status === 404
          ? "Resource Not Found"
          : "An unexpected error has occurred";

        setError(error1);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        display: "block",
        maxHeight: 400,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Carousel>
        {posts.map((data) => (
          <Carousel.Item>
            <img className="d-block   w-100" src={data.image} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComp;
