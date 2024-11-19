import React from "react";
import { BaseModal } from "./Modal";
import { useMedia } from "react-use";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
};

function ConfirmModal({ isModalOpen, setIsModalOpen, children }: Props) {
  const isMobile = useMedia("(max-width: 767px)", false);

  return (
    <BaseModal
      title="Are you sure"
      titleClassName="text-black text-xl font-semibold"
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      className="m-4 mx-auto flex h-fit justify-center rounded-md !bg-slate-100 p-2  md:p-4 max-w-[300px] z-50"
      borderRadius=""
      padding=""
      margin={isMobile ? "16px" : "auto"}
      overlay={{ backdropFilter: "blur(8px)" }}
      closeButtonClassName="hidden"
    >
      {children}
    </BaseModal>
  );
}

export default ConfirmModal;
