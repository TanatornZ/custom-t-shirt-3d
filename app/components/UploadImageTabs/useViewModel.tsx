import axios from "axios";
import React, { useEffect, useState } from "react";

function useViewModel() {
  const AxiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });

  const [file, setFile] = useState<string[]>([]);

  const getAllImage = () => {
    AxiosInstance.get("/texture")
      .then((res) => console.log("res =>", setFile(res.data)))
      .catch((err) => console.log("err =>", err));
  };

  function handleImageInputChange(e: any) {
    setFile([URL.createObjectURL(e.target.files[0]), ...file]);
    var formData = new FormData();
    formData.append("file", e.target.files[0]);
    AxiosInstance.post("/texture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => getAllImage())
      .catch((err) => console.log("err => ", err));
  }

  useEffect(() => {
    getAllImage();
  }, []);

  return { handleImageInputChange, file };
}

export default useViewModel;
