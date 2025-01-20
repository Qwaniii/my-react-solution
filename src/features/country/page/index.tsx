import { memo } from "react"
import { useInit, useSolution } from "react-solution";
import { COUNTRIES_STORE } from "../store/token";
import Users from "../containers/users";
import LayoutAdmin from "@src/ui/layout-admin";
import UsersTable from "@src/ui/users-table";

function CountriesPage() {

    const countries = useSolution(COUNTRIES_STORE);
    


    useInit(
        async () => {
          // Инициализация параметров каталога
          await countries.initParams({});
        },
        [],
        { ssr: 'users.init' },
      );
    console.log(countries)
    
    return(
        <LayoutAdmin>
          <UsersTable/>
        </LayoutAdmin>
    )
}

export default memo(CountriesPage)