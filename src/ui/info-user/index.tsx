import React, { memo, useEffect, useState } from 'react';
import { Alert, Button, Col, DatePicker, Form, Image, Input, message, Row, Select, Space, Spin, Upload } from 'antd';
import { ENV, envClient, HTTP_CLIENT, useExternalState, useInit, useSolution } from 'react-solution';
import { PROFILE_STORE } from '@src/features/profile-store/token';
import { ProfileStoreData, ProfileStoreUser } from '@src/features/profile-store/types';
import { NotificationFilled, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { USERS_API } from '@src/features/users/api/token';
import { FILES_API } from '@src/features/users/files/token';


const { Option } = Select;

const InfoUser: React.FC<ProfileStoreData> = ({data, waiting, avatar}) => {

  const profile = useSolution(PROFILE_STORE);
  const users = useSolution(USERS_API)
  const files = useSolution(FILES_API)

  const [editUser, setEditUser] = useState(true)
  const [ava, setAva] = useState('')

  const [form] = Form.useForm()


  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  useInit(
    async () => {
      if(data?.profile.avatar._id) {
        await profile.loadAvatar(data?.profile.avatar._id);
      } else profile.reset()
      return () => profile.reset()
    },
    [data?.profile.avatar._id],
    { ssr: 'avatar.init' },
  );

  const onLoadPicture = async (file: any) => {
    const res = await files.create({data:file})
    console.log(res.data.result._id)
    setAva(res.data.result._id)
  }

  const onFinish = async (values: any) => {
    try {const res = await users.update({id: data?._id, data: {...values, profile: {...values.profile, avatar: {_id:ava}}}})
    console.log(res)
    if(res.status === 200) {
      setEditUser(true)
      message.success('Сохранено', 3)
      profile.setProfileState(res.data.result)}
    } catch {
      message.error('Ошибка', 3)
    }
  }

  return (
    <>
      <Spin spinning={waiting}>
      {avatar && <Image
        width={200}
        // src={avatar}
        src={`http://query.rest` + avatar}
      />}
      <Space/>
        <Form clearOnDestroy 
        layout="vertical" 
        disabled={editUser}
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
            <Form.Item label="Аватар" name={['profile', 'avatar', `_id: ${ava}`]}>
              {/* <Upload customRequest={(file) => onLoadPicture(file)} listType="picture-card">
                <button style={{ border: 0, background: 'none' }} type="button" disabled={editUser}>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload> */}
              <Upload customRequest={(file) => onLoadPicture(file)}>
                  <Button icon={<UploadOutlined />}>Загрузить</Button>
              </Upload>
             </Form.Item>
            </Col>
          </Row>
          <Space>
          <Button onClick={() => setEditUser(true)} disabled={editUser}>Отмена</Button>
          <Button onClick={editUser ? () => setEditUser(false) : () => form.submit()} disabled={false} type="primary" htmlType= {editUser ? 'submit' : 'button' }>
            {editUser ? 'Изменить' : 'Сохранить'}
          </Button>
        </Space>
        </Form>
        </Spin>
    </>
  );
};

export default memo(InfoUser);