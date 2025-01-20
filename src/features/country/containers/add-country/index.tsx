import LayoutAdmin from "@src/ui/layout-admin";
import NewCountry from "@src/ui/new-country";
import { memo } from "react";
import { COUNTRIES_STORE } from "../../store/token";
import { useInit, useSolution } from "react-solution";

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
        <LayoutAdmin>
          <NewCountry/>
        </LayoutAdmin>
    )
}

export default memo(AddCountry)