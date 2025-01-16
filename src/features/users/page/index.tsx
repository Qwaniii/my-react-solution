import Head from "@src/content/Head"
import PageLayout from "@src/content/PageLayout"
import { memo } from "react"
import { useInit, useSolution } from "react-solution";
import { USERS_STORE } from "../store/token";
import Users from "../containers/users";
import {Card, Table} from 'antd'
import UsersTable from "@src/ui/users-table";
import LayoutAdmin from "@src/ui/layout-admin";

function UsersPage() {

    const users = useSolution(USERS_STORE);
    


    useInit(
        async () => {
          // Инициализация параметров каталога
          await users.initParams({});
        },
        [],
        { ssr: 'users.init' },
      );
    console.log(users)
    
    return(
        <PageLayout>
            <LayoutAdmin/>
        </PageLayout>
    )
}

export default memo(UsersPage)