import { memo } from "react"
import { useExternalState, useSolutionMap } from "react-solution";
import { ARTICLES_STORE } from "../../store/token";
import Item from "@src/content/Item";


function List() {

    const { articles } = useSolutionMap({
        articles: ARTICLES_STORE,
      });
    
      const articlesState = useExternalState(articles.state);



    return (
        <>
        <ul>
            {articlesState.data.items.map((item: any) => (
            <li key={item._id}>
                <Item item={item}/>
            </li>
            ))}
        </ul>
        </>
    )
}

export default memo(List)
