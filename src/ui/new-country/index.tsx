import React, { memo, useCallback, useState } from 'react';
import { Alert, Button, Form, Input } from 'antd';
import type { FormItemProps } from 'antd';
import { COUNTRIES_STORE } from '@src/features/country/store/token';
import { MODALS, useSolution } from 'react-solution';
import { COUNTRIES_API } from '@src/features/country/api/token';
import { useNavigate } from 'react-router';

const MyFormItemContext = React.createContext<(string | number)[]>([]);

function toArr(str: string | number | (string | number)[]): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};

const NewCountry: React.FC = () => {

  const [err, setErr] = useState(false)

  const navigate = useNavigate()
  
  const countries = useSolution(COUNTRIES_API);
  const countriesState = useSolution(COUNTRIES_STORE);

  const onFinish = async (data: any) => {
    const res = await countries.create({data})
    console.log(res)
    if(res.status === 200) {
      navigate('/countries')
    }   
  };

  return (
    <Form clearOnDestroy name="form_item_path" layout="vertical" onFinish={onFinish}>
          <MyFormItem name="title" label="Название">
            <Input style={{width:500}} size='large'/>
          </MyFormItem>
          <MyFormItem name="code" label="Код" help={err ? 'Введите code' : ''} validateStatus={err ? 'error' : ''}>
            <Input style={{width:50}} maxLength={2} />
          </MyFormItem>
      <Button type="primary" htmlType="submit">
        Создать
      </Button>
    </Form>
  );
};

export default memo(NewCountry);