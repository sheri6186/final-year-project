"use client";
import React, { useEffect, useState } from "react";
import { fetchAtrticlesAPI } from "./lib/client";


export default function Home() {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        // Fetch data from Strapi API
        const categoriesResp = await fetchAtrticlesAPI("api/categories");
        setCategories(categoriesResp.data);
        console.log("categories: ", categoriesResp.data);
        const response = await fetchAtrticlesAPI("api/articles?filters[categories][id][$in]=1&populate=*");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Welcome</h1>
      <p className="mb-5">
        This is the dashboard for the news article website. Please subscribe to
        the latest news articles and leave comments on articles.
      </p>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-5">
            Young guy got assassinated by kite fight
          </h1>
          <img
            className="w-full"
            src="https://i.ytimg.com/vi/yMwZWtoEn1U/maxresdefault.jpg"
            alt="kite fight"
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa a
            adipisci id placeat ipsum, voluptatem laborum in reiciendis
            accusamus vero quos eligendi, est corporis cumque asperiores? Ullam
            repellat nisi magni laboriosam delectus?
          </p>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-5">Birthday celebrated</h1>
          <img
            className="w-full"
            src="https://www.greenvelope.com/blog/wp-content/uploads/group-of-friends-with-cake-and-balloons-at-a-party.jpg"
            alt="birthday celebration"
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa a
            adipisci id placeat ipsum, voluptatem laborum in reiciendis
            accusamus vero quos eligendi, est corporis cumque asperiores? Ullam
            repellat nisi magni laboriosam delectus?
          </p>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-5">
            Hawkin opened scholarships
          </h1>
          <img
            className="w-full"
            src="https://www.isdb.org/sites/default/files/styles/full_width/public/media/images/Image%20%23%206.jpg?itok=3yjsJeJl"
            alt="scholarships"
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa a
            adipisci id placeat ipsum, voluptatem laborum in reiciendis
            accusamus vero quos eligendi, est corporis cumque asperiores? Ullam
            repellat nisi magni laboriosam delectus?
          </p>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        data.map(
          (
            val,
            index // Add index parameter to the map function
          ) => (
            <button key={index} className="m-5 p-3 h-100 w-1/2 bg-slate-500 mb-2">
              {" "}
              {"social"}
              <div>{val.attributes.name}</div>
              <div>{val.attributes.publishedAt}</div>
              <div>{val.attributes.createdAt}</div>
            </button>
          )
        )
      ) : (
        <p>No data available</p>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        data.map(
          (
            val,
            index // Add index parameter to the map function
          ) => (
            <div key={index} className="m-5 p-3 h-100 w-1/2 bg-slate-500 mb-2">
              {" "}
              {/* Add key prop */}
              <div>{val.attributes.title}</div>
              <img
                className="h-1000 w-1/2"
                src={
                  "http://localhost:1337" +
                  val.attributes.image.data?.attributes?.url
                }
              ></img>
              <div>{val.attributes.desc}</div>
              <div>{val.attributes.createdAt}</div>
            </div>
          )
        )
      ) : (
        <p>No data available</p>
      )}
      <categories/>
    </>
  );
}
