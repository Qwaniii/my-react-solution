import React, { memo, useState } from 'react';
import { BarsOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import type { GetProp, MenuProps, RadioChangeEvent, TableProps } from 'antd';
import { Button, Dropdown, Form, Radio, Space, Spin, Switch, Table } from 'antd';
import { useExternalState, useSolutionMap } from 'react-solution';
import { USERS_STORE } from '@src/features/users/store/token';
import { TUserData, TUserProfile, TUserRoles } from '@src/features/users/store/types';
import Item from '@src/content/Item';
import UsersDrawer from '@src/components/users-drawer';
import { Link } from 'react-router-dom';

type SizeType = TableProps['size'];
type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;
type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition = NonNullable<TablePagination<any>['position']>[number];
type ExpandableConfig<T extends object> = TableProps<T>['expandable'];
type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

interface DataType {
  _id: string;
  username: string;
  email: string;
  profile?: TUserProfile
}



type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type GetSingle<T> = T extends (infer U)[] ? U : never;

export type UsersTable = {
  onDeleteUser: (_id: string, username: string) => Promise<void> 
  onEdit: (_id: string) => Promise<void> 
}

const UsersTable: React.FC<UsersTable> = ({onDeleteUser, onEdit}) => {

  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<SizeType>('large');
  const [showHeader, setShowHeader] = useState(true);
  const [rowSelection, setRowSelection] = useState<TableRowSelection<DataType> | undefined>({});
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState<string>('unset');
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState<string>('unset');
  const [open, setOpen] = useState(false)


  const { users } = useSolutionMap({
    users: USERS_STORE,
  });
  const usersState = useExternalState(users.state);
  usersState.data.items.map(item => item.key = item._id)

  const handleChange: OnChange = async (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    await users.setParams({page: pagination.current}); 
  }

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  
  const handleClickDpropDown = (key: string, record: {_id: string, username: string}) => {
    switch (key) {
      case 'edit': showDrawer()
      // case 'edit': onEdit(record._id)
        break;
      case 'delete': onDeleteUser(record._id, record.username)
        break;

    }
    
  }


  const items: MenuProps['items'] = [
  {
    label: (
      <a>
        Редактировать
      </a>
    ),
    key: 'edit',
  },
  {
    label: (
      // <a onClick={() => onDeleteUser(record._id, record.username)}>
      <a>
        Удалить
      </a>
    ),
    key: 'delete',
  },
]


  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text, record) => <Link to={'users/' + record._id}>{text}</Link>
    },
    {
      title: 'Логин',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) =>
        a.username &&
        a.username > b.username &&
        b.username
          ? 1
          : -1,
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => {
        switch (text) {
          case 'new':
            return <div>Новый</div>;
          case 'reject':
            return <div style={{ color: 'red'}}>Отклонен</div>;
          case 'confirm':
            return <div style={{ color: 'green'}}>Подтвержден</div>;
          default:
            <div>error</div>
            break;
      }
    }
  },
    {
      title: 'Роль',
      dataIndex: 'roles',
      key: `roles`,
      render: (roles: TUserRoles[]) => (
        <>
          {roles.map(role => {
            return (
              <div key={role._id} style={{color: role.name === 'admin' ? 'red' : 'blue'}}>{role.title}</div>
            )
          })}
        </>
      )
  
    },
    {
      title: 'Действие',
      key: 'action',
      sorter: true,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onDeleteUser(record._id, record.username)}><DeleteOutlined /></a>
          <div>
              <Space>
                <Dropdown menu={{ items, onClick: ({key}) => handleClickDpropDown(key, record) }} trigger={['click']}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <BarsOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </Space>
            </div>
        </Space>
      ),
    },
  ];
  

  const scroll: { x?: number | string; y?: number | string } = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll !== 'unset') {
    scroll.x = '100vw';
  }

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }

  const tableProps: TableProps<DataType> = {
    bordered,
    loading,
    size,
    // expandable,
    showHeader,
    rowSelection,
    scroll,
    tableLayout: tableLayout === 'unset' ? undefined : (tableLayout as TableProps['tableLayout']),
  };



  return (
    <>
      <Table<DataType>
        {...tableProps}
        pagination={{ 
          current: usersState.params.page,
          total: usersState.data.count,
        }}
        loading={{indicator: <Spin/>, spinning: usersState.wait ? true : false}}
        columns={tableColumns}
        dataSource={hasData ? usersState.data.items : []}
        scroll={scroll}
        onChange={handleChange}
      />
      <UsersDrawer open={open} onClose={onClose}/>

    </>
  );
};

export default memo(UsersTable);