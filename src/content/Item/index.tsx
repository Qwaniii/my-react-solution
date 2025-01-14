import { memo } from "react"
import { cn as bem } from '@bem-react/classname';


type ItemProps = {
    item: {
        title: string;
        price: number
    }
}

function Item(props: ItemProps) {

    const {item} = props 

    const cn = bem('Item');

    return (
    <div className={cn()}>
        <div className={cn('title')}>
            <div>{item.title}</div>
        </div>
        <div className={cn('actions')}>
            <div className={cn('price')}>
            {(item.price)}
            </div>
        </div>
    </div>
    )
}

export default memo(Item)