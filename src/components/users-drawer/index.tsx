import React, { memo, useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Upload } from 'antd';

export type UserDrawerProps = {
  open: boolean | undefined
  onClose: () => void | undefined
}

const { Option } = Select;

const UsersDrawer: React.FC<UserDrawerProps> = ({open, onClose}) => {

  return (
    <>
      <Drawer
        title="Редактировать пользователя :id"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Отмена</Button>
            <Button onClick={onClose} type="primary">
              Сохранить
            </Button>
          </Space>
        }
      >
          <Form clearOnDestroy 
            layout="vertical" 
        
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
                  // defaultValue={data?.email}
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
                // initialValue={data?.profile.phone}
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
                // initialValue={data?.profile.name}
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
                // initialValue={data?.profile.gender}
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
            <Form.Item label="Аватар" name={['profile', 'avatar']}>
              {/* <Upload customRequest={(file) => onLoadPicture(file)} listType="picture-card">
                <button style={{ border: 0, background: 'none' }} type="button" disabled={editUser}>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload> */}
              <Upload 
              // customRequest={(file) => onLoadPicture(file)}
              >
                  <Button icon={<UploadOutlined />}>Загрузить</Button>
              </Upload>
             </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default memo(UsersDrawer);