import { memo } from "react"
import { useExternalState, useSolutionMap } from "react-solution";
import { USERS_STORE } from "../../store/token";
import Item from "@src/content/Item";


function Users() {

    const { users } = useSolutionMap({
        users: USERS_STORE,
      });
    
      const usersState = useExternalState(users.state);



    return (
        <>
        <ul>
            {usersState.data.items.map((item: any) => (
            <li key={item._id}>
                <Item item={item}/>
            </li>
            ))}
        </ul>
        </>
    )
}

export default memo(Users)
