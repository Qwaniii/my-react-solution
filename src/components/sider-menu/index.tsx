import { Menu, MenuProps } from "antd"
import Sider from "antd/es/layout/Sider"
import { memo, useState } from "react"
import { useNavigate } from "react-router";
import {
    FileOutlined,
    PictureFilled,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';

const SiderMenu: React.FC<MenuProps> = ({items}) => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate()


    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu onClick={(e) => navigate(e.key)} selectedKeys={[location.pathname]} theme='dark' defaultSelectedKeys={['/']} mode="inline" items={items}/>
        </Sider>
    )
}

export default memo(SiderMenu)