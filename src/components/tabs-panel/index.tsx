import { USERS_STORE } from "@src/features/users/store/token";
import { Button, Flex, Tabs, TabsProps } from "antd"
import { memo } from "react"
import { useSolution } from "react-solution";
import {
    ContactsOutlined,
    FrownOutlined,
    PlusCircleOutlined,
    TwitterOutlined,
    UserSwitchOutlined,
  } from '@ant-design/icons';
import { useNavigate } from "react-router";

export type TabsPanelProps = {
    tabs: TabsProps['items'],
    onTab: (key: string) => Promise<void>;
    defaults: string;
}

const TabsPanel: React.FC<TabsPanelProps> = (props) => {

    const {tabs, onTab, defaults, } = props

      const navigate = useNavigate()

    return (
        <>
            <Tabs
                defaultActiveKey={defaults}
                items={tabs}
                onChange={onTab}
                tabBarExtraContent={<Button type='link' shape="circle"  onClick={() => navigate('/add-user')} icon={<PlusCircleOutlined />} />
            }
            />
        </>
    )
}

export default memo(TabsPanel)