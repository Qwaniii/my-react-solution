import React, { memo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
} from 'antd';
import { useSolution } from 'react-solution';
import { USERS_API } from '@src/features/users/api/token';
import { useNavigate } from 'react-router';


const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const NewUser: React.FC = () => {

  const users = useSolution(USERS_API);
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    const res = await users.create({data: {...values, profile: {}}})
    console.log(res)
    if(res.status === 200 || 201) {
      navigate('/')
    }   
  };


  return (
    <>
      <Form
          name="validate_other"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item name="username" label="Логин" required>
          <Input />
        </Form.Item>
        <Form.Item name="password"  label="Пароль" required >
          <Input.Password type="password"/>
        </Form.Item>
        <Form.Item name="email" label="E-mail" required>
          <Input />
        </Form.Item>
        {/* <Form.Item name="role"  label="Роль">
          <Select defaultValue={'user'}>
            <Select.Option value="user" >Пользователь</Select.Option>
            <Select.Option value="develop" >Разработчик</Select.Option>
            <Select.Option value="teacher" >Преподаватель</Select.Option>
            <Select.Option value="student" >Студент</Select.Option>
          </Select>
        </Form.Item> */}
        <Form.Item label="Фото" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 14 }}>
        <Button type="primary" htmlType="submit">
          Создать
        </Button>
      </Form.Item>
      </Form>
    </>
  );
};

export default memo(NewUser);