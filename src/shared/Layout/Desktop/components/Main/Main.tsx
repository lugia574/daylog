import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Main = ({ children }: Props) => <main>{children}</main>;

export default Main;
