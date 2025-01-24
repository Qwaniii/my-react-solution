import { memo, useCallback } from "react"
import { MODALS, useInit, useSolution } from "react-solution";
import { USERS_STORE } from "../store/token";
import UsersTable from "@src/ui/users-table";
import LayoutUsers from "@src/ui/layout-users";
import { CONFIRM_MODAL } from "@src/features/modals/confirm/token";
import { USERS_API } from "../api/token";

function UsersPage() {

    const users = useSolution(USERS_STORE);
      const modals = useSolution(MODALS);
      const usersApi = useSolution(USERS_API)


    useInit(
        async () => {
          // Инициализация параметров каталога
          await users.initParams({});
        },
        [],
        { ssr: 'users.init' },
      );
    console.log(users)

 const callbacks = {
    openConfirm: useCallback(async (_id: any, username: string) => {
      const result = await modals.open(CONFIRM_MODAL, {
        title: 'Подтвердите действие!',
        message:
          `Вы действительно хотите удалить ${username}`,
      });
      if(result) {
        const deleteId: any = await usersApi.delete({id: _id})
        console.log(deleteId.data)
        users.setDump({
          ...users.getDump(),
          data: 
          {...users.getDump().data,
            items: users.getDump().data.items.filter(item => item._id !== deleteId.data.result._id),
            allCount: users.getDump().data.allCount - 1,
            count: users.getDump().data.count - 1,
          }
        })
      }
        
    }, []),
    onEdit: useCallback(async (_id: any) => {
        const editUser: any = await usersApi.update({id: _id, data: {username: 'update'}})
      },[]),
  }
      
    
    return(
        <LayoutUsers>
          <UsersTable onDeleteUser={callbacks.openConfirm} onEdit={callbacks.onEdit}/>
        </LayoutUsers>
    )
}

export default memo(UsersPage)