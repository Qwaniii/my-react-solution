import React, { memo } from 'react';
import { Button, Form, Input } from 'antd';
import type { FormItemProps } from 'antd';
import { COUNTRIES_STORE } from '@src/features/country/store/token';
import { useSolution } from 'react-solution';
import { COUNTRIES_API } from '@src/features/country/api/token';
import { useNavigate } from 'react-router';

const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
}

function toArr(str: string | number | (string | number)[]): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup: React.FC<React.PropsWithChildren<MyFormItemGroupProps>> = ({
  prefix,
  children,
}) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

  return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};

const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};

const NewCountry: React.FC = () => {

  const navigate = useNavigate()
  
  const countries = useSolution(COUNTRIES_API);

  const onFinish = (data: any) => {
    countries.create({data})
    console.log({data})
    navigate('/countries')
  };


        
    
    
        // useInit(
        //     async () => {
        //       // Инициализация параметров каталога
        //       await countries.initParams({});
        //     },
        //     [],
        //     { ssr: 'users.init' },
        //   );

  return (
    <Form clearOnDestroy name="form_item_path" layout="vertical" onFinish={onFinish}>
          <MyFormItem name="title" label="Название">
            <Input />
          </MyFormItem>
          <MyFormItem name="code" label="Код">
            <Input />
          </MyFormItem>
          {/* <MyFormItem name="age" label="Age">
            <Input />
          </MyFormItem> */}

      <Button type="primary" htmlType="submit">
        Создать
      </Button>
    </Form>
  );
};

export default memo(NewCountry);