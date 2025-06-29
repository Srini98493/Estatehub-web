import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'red' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled,
  ...props
}, ref) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-none focus:ring-offset-none";
  
  const variants = {
    primary: "bg-gradient-to-b from-[#1aaddd] to-[#117b9d] hover:from-[#117b9d] hover:to-[#1aaddd] text-white shadow-sm focus:ring-[#1aaddd]/25",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-[#117b9d]/25 shadow-sm",
    outline: "border-2 border-[#1aaddd] text-[#1aaddd] hover:bg-[#1aaddd] hover:text-white focus:ring-[#1aaddd]/25",
    red: "bg-red-500 text-white hover:bg-red-600",
    gradient: "bg-gradient-to-b from-[#A0DAFB] to-[#0A8ED9] hover:from-[#0A8ED9] hover:to-[#A0DAFB] text-white shadow-sm",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      ref={ref}
      className={twMerge(
        baseStyles,
        variants[variant],
        sizes[size],
        widthClass,
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
});