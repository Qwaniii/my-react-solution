import React, { memo, useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Image, Input, Row, Select, Space, Spin, Upload } from 'antd';
import { ENV, envClient, useExternalState, useInit, useSolution } from 'react-solution';
import { PROFILE_STORE } from '@src/features/profile-store/token';
import { ProfileStoreData, ProfileStoreUser } from '@src/features/profile-store/types';
import { PlusOutlined } from '@ant-design/icons';
import { envServer } from 'react-solution/server';


const { Option } = Select;

const InfoUser: React.FC<ProfileStoreData> = ({data, waiting, avatar}) => {

  const profile = useSolution(PROFILE_STORE);


  const [editUser, setEditUser] = useState(true)

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  useInit(
    async () => {
      if(data?.profile.avatar._id) {
        await profile.loadAvatar(data?.profile.avatar._id);
      }
    },
    [data?.profile.avatar._id],
    { ssr: 'avatar.init' },
  );

  const onFinish = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <Image
        width={200}
        src={`http://query-rest + ${avatar}`}
      />
      <Spin spinning={waiting}>
        <Form clearOnDestroy layout="vertical" disabled={editUser}
        form={form}
        onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Логин"
                rules={[{ required: true, message: 'Please enter user name' }]}
                shouldUpdate
              >
                <Input placeholder="Введите username"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[{ required: true, message: 'Please enter email' }]}
                
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="Введите Email"
                  defaultValue={data?.email}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                // name="phone"
                name={['profile', 'phone']}
                label="Телефон"
                initialValue={data?.profile.phone}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="Введите телефон"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['profile', 'name']}
                label="Имя"
                initialValue={data?.profile.name}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="Введите имя"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['profile', 'gender']}
                label="Пол"
                initialValue={data?.profile.gender}
              >
                <Select placeholder="Выберете пол">
                  <Option value="male">Мужской</Option>
                  <Option value="female">Женский</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* <Form.Item
                name={['profile', 'birthday']}
                initialValue={data?.profile.birthday}
                label="Дата рождения"
              >
                <DatePicker
                  style={{ width: '100%' }}
                  getPopupContainer={(trigger) => trigger.parentElement!}
                />
              </Form.Item> */}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
            <Form.Item label="Аватар" valuePropName="fileList" >
              <Upload action="/upload.do" listType="picture-card">
                <button style={{ border: 0, background: 'none' }} type="button" disabled={editUser}>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
             </Form.Item>
            </Col>
          </Row>
          <Space>
          <Button onClick={() => setEditUser(true)} disabled={editUser}>Отмана</Button>
          <Button onClick={editUser ? () => setEditUser(false) : () => setEditUser(true)} disabled={false} type="primary" htmlType= {editUser ? 'submit' : 'button' }>
            {editUser ? 'Изменить' : 'Сохранить'}
          </Button>
        </Space>
        </Form>
        </Spin>
    </>
  );
};

export default memo(InfoUser);