import { memo } from "react"
import { useInit, useSolution } from "react-solution";
import { COUNTRIES_STORE } from "../store/token";
import LayoutAdmin from "@src/ui/layout-admin";
import UsersTable from "@src/ui/users-table";
import CountriesTable from "@src/ui/countries-table";

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
          <CountriesTable/>
        </LayoutAdmin>
    )
}

export default memo(CountriesPage)