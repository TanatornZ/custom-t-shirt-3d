import React from "react";
import { BaseModal } from "./Modal";
import { useMedia } from "react-use";
import Image from "next/image";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  previewImage: string;
};

function PreviewModal({ isModalOpen, setIsModalOpen, previewImage }: Props) {
  const isMobile = useMedia("(max-width: 767px)", false);

  return (
    <BaseModal
      title="Preview"
      titleClassName="text-black text-xl"
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      className="m-4 mx-auto flex h-fit justify-center rounded-md !bg-slate-100 p-2 md:max-w-[640px] md:p-4 xl:max-w-[1080px] z-50"
      borderRadius=""
      padding=""
      margin={isMobile ? "16px" : "auto"}
      overlay={{ backdropFilter: "blur(8px)" }}
      closeButtonClassName="hidden"
    >
      <div className="w-full  flex flex-col">
        <div className="w-full h-[400px] relative z-20 bg-slate-200 rounded-lg mt-4">
          <Image
            src={previewImage}
            alt="preview-custom-3D-shirt"
            fill
            className="object-contain scale-[2]"
          />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            const link = document.createElement("a");
            if (previewImage) {
              link.setAttribute("download", "canvas.png");
              link.setAttribute(
                "href",
                previewImage.replace("image/png", "image/octet-stream")
              );
            }
            link.click();
          }}
          className="px-4 mt-2 w-fit mx-auto z-50 self-end py-3 bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 active:ring-1 active:ring-blue-600"
        >
          Download
        </div>
      </div>
    </BaseModal>
  );
}

export default PreviewModal;
