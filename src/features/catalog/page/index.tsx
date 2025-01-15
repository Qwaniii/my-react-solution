import Head from "@src/content/Head"
import PageLayout from "@src/content/PageLayout"
import { memo } from "react"
import List from "../containers/list"
import { useInit, useSolution } from "react-solution";
import { ARTICLES_STORE } from "../store/token";
import { useParams } from "react-router";

function CatalogPage() {

    const articles = useSolution(ARTICLES_STORE);
    
    console.log(articles)

    const { categoryId } = useParams<{ categoryId: string }>();

    useInit(
        async () => {
          // Инициализация параметров каталога
          await articles.initParams({});
        },
        [],
        { ssr: 'articles.init' },
      );

    return(
        <PageLayout>
            <Head title='Каталог товаров'/>
            <List/>
        </PageLayout>
    )
}

export default memo(CatalogPage)