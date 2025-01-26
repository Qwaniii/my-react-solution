import React, { memo, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select, Space, Spin } from 'antd';
import { useExternalState, useSolution } from 'react-solution';
import { PROFILE_STORE } from '@src/features/profile-store/token';
import { ProfileStoreData, ProfileStoreUser } from '@src/features/profile-store/types';


const { Option } = Select;

const InfoUser: React.FC<ProfileStoreData> = ({data, waiting}) => {


  const [editUser, setEditUser] = useState(true)



  return (
    <>
      <Spin spinning={waiting}>
        <Form clearOnDestroy layout="vertical" disabled={editUser}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input placeholder="Введите username" defaultValue={data?.username}/>
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
                name="phone"
                label="Телефон"
                rules={[{ required: true, message: 'Please phone' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="Введите телефон"
                  defaultValue={data?.profile.phone}
                />
                {/* <Select placeholder="Please select an owner">
                  <Option value="xiao">Xiaoxiao Fu</Option>
                  <Option value="mao">Maomao Zhou</Option>
                </Select> */}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: 'Please choose the type' }]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[{ required: true, message: 'Please choose the approver' }]}
              >
                <Select placeholder="Please choose the approver">
                  <Option value="jack">Jack Ma</Option>
                  <Option value="tom">Tom Liu</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[{ required: true, message: 'Please choose the dateTime' }]}
              >
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  getPopupContainer={(trigger) => trigger.parentElement!}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
          <Space>
          <Button disabled={editUser}>Cancel</Button>
          <Button onClick={editUser ? () => setEditUser(false) : () => setEditUser(true)} type="primary">
            {editUser ? 'Изменить' : 'Сохранить'}
          </Button>
        </Space>
        </Spin>
    </>
  );
};

export default memo(InfoUser);