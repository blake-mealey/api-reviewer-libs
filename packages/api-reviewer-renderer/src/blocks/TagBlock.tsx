import React from 'react';

interface TagBlockProps {
  text: string;
}

export const TagBlock: React.FunctionComponent<TagBlockProps> = ({ text }) => {
  return (
    <span
      style={{
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '100px',
        padding: '5px',
      }}
    >
      {text}
    </span>
  );
};
