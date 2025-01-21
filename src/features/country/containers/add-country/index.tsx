import LayoutAdmin from "@src/ui/layout-users";
import NewCountry from "@src/ui/new-country";
import { memo } from "react";
import { COUNTRIES_STORE } from "../../store/token";
import { useInit, useSolution } from "react-solution";
import LayoutNewcountry from "@src/ui/layout-newcountry";

function AddCountry() {


      const countries = useSolution(COUNTRIES_STORE);
      
  
  
      // useInit(
      //     async () => {
      //       // Инициализация параметров каталога
      //       await countries.initParams({});
      //     },
      //     [],
      //     { ssr: 'users.init' },
      //   );
    
    return(
        <LayoutNewcountry>
          <NewCountry/>
        </LayoutNewcountry>
    )
}

export default memo(AddCountry)