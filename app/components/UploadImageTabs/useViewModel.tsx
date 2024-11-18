import { AxiosInstance } from "@/app/api/axios";
import { ITextureImage } from "@/app/types/imageFile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useViewModel() {
  const [file, setFile] = useState<ITextureImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState("");
  const [uploading, setUploading] = useState<number | null>(null);
  const [deleteImageState, setDeleteImageState] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectDeleteImage, setSelectDeleteImage] = useState("");

  const getAllImage = () => {
    AxiosInstance.get("/texture")
      .then((res) => {
        setFile(res.data);
      })
      .catch((err) => console.log("err =>", err))
      .finally(() => setLoading(false));
  };

  const showConfirmDeleteModal = (imagePath: string) => {
    setDeleteModalIsOpen(true);
    setSelectDeleteImage(imagePath);
  };

  const handleDeleteImage = () => {
    let files = file.filter((items) => items.filePath !== selectDeleteImage);
    AxiosInstance.delete("/texture", { data: { pathImage: selectDeleteImage } })
      .then(() => {
        setFile(files);
        toast.success("Image was deleted");
      })
      .catch((err) => toast.error("Error : ", err))
      .finally(() => {
        setSelectDeleteImage("");
        setDeleteModalIsOpen(false);
      });
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
        toast.success("Image was uploaded");
        setUploading(null);
        setUploadingImage("");
      })
      .catch((err) => toast.error("Error : ", err));
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
    showConfirmDeleteModal,
    setDeleteModalIsOpen,
    deleteModalIsOpen,
  };
}

export default useViewModel;
