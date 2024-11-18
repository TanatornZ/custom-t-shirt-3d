import { AxiosInstance } from "@/app/api/axios";
import { ITextureImage } from "@/app/types/imageFile";
import { useEffect, useState } from "react";

function useViewModel() {
  const [file, setFile] = useState<ITextureImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState("");
  const [uploading, setUploading] = useState<number | null>(null);
  const [deleteImageState, setDeleteImageState] = useState(false);

  const getAllImage = () => {
    AxiosInstance.get("/texture")
      .then((res) => setFile(res.data))
      .catch((err) => console.log("err =>", err))
      .finally(() => setLoading(false));
  };

  const handleDeleteImage = (image: ITextureImage) => {
    console.log("delete ", image.filePath);
    let files = file.filter((items) => items !== image);

    AxiosInstance.delete("/texture", { data: { pathImage: image.filePath } })
      .then(() => setFile(files))
      .catch((err) => console.log("err =>", err));
  };

  function handleImageInputChange(e: any) {
    setUploading(0);
    setUploadingImage(URL.createObjectURL(e.target.files[0]));
    var formData = new FormData();
    formData.append("file", e.target.files[0]);
    AxiosInstance.post("/texture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress(progressEvent) {
        if (!progressEvent.progress) return;
        let progress = Math.round(progressEvent.progress * 100);
        setUploading(progress);
      },
    })
      .then((res) => {
        setFile([res.data, ...file]);
        setUploading(null);
        setUploadingImage("");
      })
      .catch((err) => console.log("err => ", err));
  }

  useEffect(() => {
    getAllImage();
  }, []);

  return {
    handleImageInputChange,
    file,
    loading,
    uploadingImage,
    uploading,
    deleteImageState,
    setDeleteImageState,
    handleDeleteImage,
  };
}

export default useViewModel;
