
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<TextareaProps> = ({ className = '', ...props }) => {
  return (
    <textarea
      rows={5}
      className={`w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary resize-y bg-gray-50 hover:bg-white transition-colors ${className}`}
      {...props}
    ></textarea>
  );
};

export default Textarea;
