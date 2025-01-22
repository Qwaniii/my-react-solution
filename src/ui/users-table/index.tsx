import React, { memo, useState } from 'react';
import { BarsOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import type { GetProp, RadioChangeEvent, TableProps } from 'antd';
import { Button, Form, Radio, Space, Spin, Switch, Table } from 'antd';
import { useExternalState, useSolutionMap } from 'react-solution';
import { USERS_STORE } from '@src/features/users/store/token';
import { TUserData, TUserProfile, TUserRoles } from '@src/features/users/store/types';
import Item from '@src/content/Item';

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

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
    sorter: (a, b) =>
      a._id &&
      a._id > b._id &&
      b._id
        ? 1
        : -1,
    // defaultSortOrder: "descend",
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
    // filters: [
    //   {
    //     text: 'London',
    //     value: 'London',
    //   },
    //   {
    //     text: 'New York',
    //     value: 'New York',
    //   },
    // ],
    // onFilter: (value, record) => record.address.indexOf(value as string) === 0,
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
    render: () => (
      <Space size="middle">
        <a><DeleteOutlined /></a>
        <a>
          <Space>
            <BarsOutlined />
          </Space>
        </a>
      </Space>
    ),
  },
];

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type GetSingle<T> = T extends (infer U)[] ? U : never;

const UsersTable: React.FC = () => {

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


  const { users } = useSolutionMap({
    users: USERS_STORE,
  });
  const usersState = useExternalState(users.state);
  usersState.data.items.map(item => item.key = item._id)

  const handleChange: OnChange = async (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    await users.setParams({page: pagination.current});
  }

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

    </>
  );
};

export default memo(UsersTable);