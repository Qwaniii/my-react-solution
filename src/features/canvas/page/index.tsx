import LayoutDraw from "@src/ui/layout/layout-draw"
import Draw from "../components/index"
import { memo, useState } from "react"

const DrawPage = () => {

    const [figure, setFigure] = useState<any>({})

    const elements = [
        {'Красный квадрат ': {width: 100, height: 100, color: 'red'}},
        {'Зеленый квадрат': {width: 50, height: 50, color: 'green'}},
        {'Синий прямоугольник': {width: 10, height: 50, color: 'blue'}},
        {'Черный квадрат': {width:77, height: 77, color: 'black'}},
        {'Круг': {start:77, end: 77, color: 'magenta', radius: 10}},
        {'Треугольник': {width: 10, height: 50, color: 'gray', tre: 'треугольник'}},
        {'Линия': {width: 1, height: 100, color: 'orange', line: 'линия'}},

    ]

    const rectangle: any = {
        type: 'rectangle',
        width: 200,
        height: 50,
        color: 'green'
    };

    const rectangle2: any = {
        type: 'rectangle',
        width: 100,
        height: 100,
        color: 'black'
    };



    return (
        <LayoutDraw>
            <span onClick={() => setFigure( rectangle)}>Квадрат</span>
            <span onClick={() => setFigure(rectangle2)}>Квадрат2</span>
            <Draw elements={figure}/>
        </LayoutDraw>
    )
}

export default memo(DrawPage)