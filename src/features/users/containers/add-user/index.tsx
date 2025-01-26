import LayoutNewuser from "@src/ui/layout/layout-newuser"
import NewUser from "@src/ui/new-user"
import { memo } from "react"

const AddUser = () => {
    return (
        <LayoutNewuser>
            <NewUser/>
        </LayoutNewuser>
    )
}

export default memo(AddUser)