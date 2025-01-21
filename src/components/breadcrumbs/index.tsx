import React, { PropsWithChildren } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'; // Предполагается, что используете react-router

export type BreadcrumbsProps = {
    paths: {
        label: string
        link?: string | undefined,
    }[],
    styled: {}
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ paths, styled }) => {
  return (
    <Breadcrumb style={styled}>
      {paths.map((path, index) => (
        <Breadcrumb.Item key={index}>
          {path.link ? (
            <Link to={path.link}>{path.label}</Link>
          ) : (
            path.label
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;