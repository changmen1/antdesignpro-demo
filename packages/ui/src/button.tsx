"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
  fn?: () => void
}

export const Button = ({ children, className, appName, fn }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={fn}
    >
      {children}
    </button>
  );
};
