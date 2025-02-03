import LayoutDraw from "@src/ui/layout/layout-draw"
import Draw from "../components/index"
import { memo, useState } from "react"
import { ColorPicker, Flex, Layout, Radio, RadioChangeEvent, Slider, Space } from "antd"
import { Content } from "antd/es/layout/layout"

const DrawPage = () => {

    const [figure, setFigure] = useState<any>({type: 'rectangle', color: 'black', width: 10, height: 10})
    const [arc, setFArc] = useState<any>({})

    const callbacks = {
        onFigure: (e: RadioChangeEvent) => setFigure({...figure, type: e.target.value}),
        onColor: (value: any) => setFigure({...figure, color: value!.toHexString()}),
        onSize: (value: number) => setFigure({...figure, width: value, height: value})
    }

    console.log(figure)



    return (
        <LayoutDraw>
            <Flex vertical gap="middle">
                <Radio.Group onChange={callbacks.onFigure} defaultValue="rectangle">
                    <Radio.Button value="rectangle">Квадрат</Radio.Button>
                    <Radio.Button value="arc" >Круг</Radio.Button>
                    <Radio.Button value="tre">Треугольник</Radio.Button>
                    <Radio.Button value="line">Линия</Radio.Button>
                </Radio.Group>
            </Flex>
                <ColorPicker onChange={callbacks.onColor} defaultValue="#000000" />
                <Slider onChangeComplete={callbacks.onSize} defaultValue={10} />
                <Draw elements={figure.type == 'rectangle' ? figure : figure.type == 'arc' || 'line' ? {...figure, radius: figure.height, start: 0, end: Math.PI * 2} : figure.type == 'tre' ? {...figure, line: figure.height} : '' }/>
        </LayoutDraw>
    )
}

export default memo(DrawPage)