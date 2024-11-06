"use client";

import { cx } from "@emotion/css";
import { CSSProperties, ReactNode, useEffect } from "react";
import Modal from "react-modal";

export interface BaseModalProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
  title: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
  footerClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  borderRadius: string;
  padding: string;
  margin: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  closeButtonClassName?: string;
  closeButtonIconSize?: string;
  closeButtonIconClassName?: string;
  overlay?: CSSProperties;
}

export const BaseModal = ({
  children,
  isOpen,
  className,
  title,
  onClose,
  headerClassName,
  titleClassName,
  borderRadius,
  padding,
  margin,
  height,
  maxWidth,
  maxHeight,
  overlay,
}: BaseModalProps) => {
  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <Modal
      closeTimeoutMS={200}
      onRequestClose={onClose}
      ariaHideApp={false}
      className={className}
      isOpen={isOpen}
      style={{
        overlay: {
          background: "rgba(0, 0, 0, 0.56)",
          display: "flex",
          alignItems: "center",
          zIndex: 50,
          ...overlay,
        },
        content: {
          display: "flex",
          flexDirection: "column",
          maxWidth: maxWidth,
          maxHeight: maxHeight,
          height: height,
          borderRadius: borderRadius,
          boxShadow:
            "0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
          flex: "1 1 auto",
          padding: padding,
          border: "none",
          margin: margin,
          left: "0",
          right: "0",
          zIndex: 100,
        },
      }}
    >
      <div
        className={cx(
          "sticky top-0 z-10 flex items-center justify-between",
          headerClassName
        )}
      >
        <span className={cx("w-full", titleClassName)}>{title}</span>
        <div onClick={onClose} className="cursor-pointer text-black">
          X
        </div>
      </div>
      <div className="flex flex-auto overflow-hidden">{children}</div>
    </Modal>
  );
};
