import { memo } from "react"
import { useInit, useSolution } from "react-solution";
import { COUNTRIES_STORE } from "../store/token";
import CountriesTable from "@src/ui/countries-table";
import LayoutCountries from "@src/ui/layout-countries";

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
        <LayoutCountries>
          <CountriesTable/>
        </LayoutCountries>
    )
}

export default memo(CountriesPage)