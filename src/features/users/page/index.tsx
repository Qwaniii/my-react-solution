import { memo } from "react"
import { useInit, useSolution } from "react-solution";
import { USERS_STORE } from "../store/token";
import UsersTable from "@src/ui/users-table";
import LayoutUsers from "@src/ui/layout-users";

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
        <LayoutUsers>
          <UsersTable/>
        </LayoutUsers>
    )
}

export default memo(UsersPage)