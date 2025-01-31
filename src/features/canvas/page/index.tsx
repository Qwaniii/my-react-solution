import LayoutDraw from "@src/ui/layout/layout-draw"
import Draw from "../components/index"
import { memo, useState } from "react"

const DrawPage = () => {

    const [figure, setFigure] = useState()

    const elements = [
        {'Красный квадрат ': {width: 100, height: 100, color: 'red'}},
        {'Зеленый квадрат': {width: 50, height: 50, color: 'green'}},
        {'Синий прямоугольник': {width: 10, height: 50, color: 'blue'}},
        {'Черный квадрат': {width:77, height: 77, color: 'black'}},
        {'Круг': {start:77, end: 77, color: 'magenta', radius: 10}},
        {'Треугольник': {width: 10, height: 50, color: 'gray', tre: 'треугольник'}},
        {'Линия': {width: 1, height: 100, color: 'orange', line: 'линия'}},

    ]



    return (
        <LayoutDraw>
            {elements.map(rect => (
                <span style={{ cursor: 'pointer', border: '1px black solid', margin: '2px'}} onClick={() => setFigure(Object.values(rect)[0])}>{Object.keys(rect)}</span>
            ))}
            <Draw element={figure}/>
        </LayoutDraw>
    )
}

export default memo(DrawPage)