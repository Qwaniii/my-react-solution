import { memo, useCallback } from "react"
import { MODALS, useInit, useSolution } from "react-solution";
import { COUNTRIES_STORE } from "../store/token";
import CountriesTable from "@src/ui/countries-table";
import LayoutCountries from "@src/ui/layout/layout-countries";
import { CONFIRM_MODAL } from "@src/features/modals/confirm/token";
import { COUNTRIES_API } from "../api/token";

function CountriesPage() {

    const countries = useSolution(COUNTRIES_STORE);
    const modals = useSolution(MODALS);
    const countriesApi = useSolution(COUNTRIES_API)

    useInit(
        async () => {
          // Инициализация параметров каталога
          await countries.initParams({});
        },
        [],
        { ssr: 'users.init' },
      );


  const callbacks = {
    openConfirm: useCallback(async (_id: any, title: string) => {
      const result = await modals.open(CONFIRM_MODAL, {
        title: 'Подтвердите действие!',
        message:
          `Вы действительно хотите удалить ${title}`,
      });
      if(result) {
        const deleteId: any = await countriesApi.delete({id: _id})
        console.log(deleteId.data.result._id)
        countries.setDump({
          ...countries.getDump(),
          data: 
          {...countries.getDump().data,
            items: countries.getDump().data.items.filter(item => item._id !== deleteId.data.result._id)
          }
        })
      }
        
    }, []),
  }
      
    console.log(countries)
    
    return(
        <LayoutCountries>
          <CountriesTable onConfirm={callbacks.openConfirm}/>
        </LayoutCountries>
    )
}

export default memo(CountriesPage)