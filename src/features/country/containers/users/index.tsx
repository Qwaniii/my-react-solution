import { memo } from "react"
import { useExternalState, useSolutionMap } from "react-solution";
import { COUNTRIES_STORE } from "../../store/token";
import Item from "@src/content/Item";


function Users() {

    const { countries } = useSolutionMap({
        countries: COUNTRIES_STORE,
      });
    
      const countriesState = useExternalState(countries.state);



    return (
        <>
        <ul>
            {countriesState.data.list.map((item: any) => (
            <li key={item._id}>
                <Item item={item}/>
            </li>
            ))}
        </ul>
        </>
    )
}

export default memo(Users)
