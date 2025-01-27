import React, { memo, useCallback, useState } from 'react';
import { BarsOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import type { GetProp, MenuProps, RadioChangeEvent, TableProps } from 'antd';
import { Button, Dropdown, Form, Radio, Space, Spin, Switch, Table } from 'antd';
import { MODALS, useExternalState, useSolution, useSolutionMap } from 'react-solution';
import { USERS_STORE } from '@src/features/users/store/token';
import { TUserData, TUserProfile } from '@src/features/users/store/types';
import Item from '@src/content/Item';
import { COUNTRIES_STORE } from '@src/features/country/store/token';
import { CONFIRM_MODAL } from '@src/features/modals/confirm/token';
import { COUNTRIES_API } from '@src/features/country/api/token';

type SizeType = TableProps['size'];
type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;
type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition = NonNullable<TablePagination<any>['position']>[number];
type ExpandableConfig<T extends object> = TableProps<T>['expandable'];
type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

interface DataType {
  _id: string;
  code: string;
  title: string;
  key?: string
}

const items: MenuProps['items'] = [
  {
    label: (
      <a>
        Редактировать
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a>
        Удалить
      </a>
    ),
    key: '1',
  },
];








// const defaultExpandable: ExpandableConfig<DataType> = {
//   expandedRowRender: (record: DataType) => {},
// };

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type GetSingle<T> = T extends (infer U)[] ? U : never;

export type CountriesTableProps = {
  onConfirm: (_id: any, title: string) => Promise<void>
}

const CountriesTable: React.FC<CountriesTableProps> = ({onConfirm}) => {

  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<SizeType>('large');
  // const [expandable, setExpandable] = useState<ExpandableConfig<DataType>>(defaultExpandable);
  const [showHeader, setShowHeader] = useState(true);
  const [rowSelection, setRowSelection] = useState<TableRowSelection<DataType> | undefined>({});
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState<string>('unset');
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState<string>('unset');


  const { countries } = useSolutionMap({
    countries: COUNTRIES_STORE,
  });


  const countriesState = useExternalState(countries.state);

  countriesState.data.items.map(item => item.key = item._id)

  const handleChange: OnChange = async (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    await countries.setParams({page: pagination.current});
  }

  

  const scroll: { x?: number | string; y?: number | string } = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll !== 'unset') {
    scroll.x = '100vw';
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Страна',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code'
    },
    {
        title: 'Действие',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a onClick={() => onConfirm(record._id, record.title)}><DeleteOutlined /></a>
            <div>
              <Space>
                <Dropdown menu={{ items }} trigger={['click']}>
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
    }
  ];

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
          // position: [top, bottom],
          current: countriesState.params.page,
          total: countriesState.data.count,

        }}
        loading={{indicator: <Spin/>, spinning: countriesState.wait ? true : false}}
        columns={tableColumns}
        dataSource={hasData ? countriesState.data.items : []}
        scroll={scroll}
        onChange={handleChange}
      />

    </>
  );
};

export default memo(CountriesTable);