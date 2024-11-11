import { AxiosInstance } from "@/app/api/axios";
import { ITextureImage } from "@/app/types/imageFile";
import { useEffect, useState } from "react";

function useViewModel() {
  const [file, setFile] = useState<ITextureImage[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllImage = () => {
    AxiosInstance.get("/texture")
      .then((res) => console.log("res =>", setFile(res.data)))
      .catch((err) => console.log("err =>", err))
      .finally(() => setLoading(false));
  };

  function handleImageInputChange(e: any) {
    setLoading(true);
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

  return { handleImageInputChange, file, loading };
}

export default useViewModel;
