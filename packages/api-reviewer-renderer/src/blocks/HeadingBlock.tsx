import React from 'react';

interface HeadingBlockProps {
  text: string;
  level: 'title' | 'subtitle';
}

export const HeadingBlock: React.FunctionComponent<HeadingBlockProps> = ({
  text,
  level,
  children,
}) => {
  return (
    <div style={{ flexDirection: 'row' }}>
      {level === 'title' ? (
        <h1 style={{ display: 'inline-block', marginRight: '20px' }}>{text}</h1>
      ) : level === 'subtitle' ? (
        <h3 style={{ display: 'inline-block', marginRight: '20px' }}>{text}</h3>
      ) : null}
      {children}
    </div>
  );
};
