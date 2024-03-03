import { ReactNode } from 'react';
import tw from 'twin.macro';

const V2SexyChameleonText = ({ children, animate = true }: { children: ReactNode; animate?: boolean }) => {
  const style = [
    tw`text-transparent bg-clip-text from-[rgba(199,242,132,1)] to-[rgba(0,190,240,1)] bg-v2-text-gradient`,
    animate ? tw`animate-hue` : tw``,
  ].join(' ');
  return (

    <span
      className={style}
    >
      {children}
    </span>
  );
};

export default V2SexyChameleonText;
