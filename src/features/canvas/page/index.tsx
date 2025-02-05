import LayoutDraw from "@src/ui/layout/layout-draw"
import Draw from "../components/index"
import { memo, useState } from "react"
import { Button, ColorPicker, Flex, Layout, Radio, RadioChangeEvent, Slider, Space } from "antd"
import {  CaretRightOutlined, StopFilled } from "@ant-design/icons"
import { Content } from "antd/es/layout/layout"

const DrawPage = () => {

    const [figure, setFigure] = useState<any>({type: 'rectangle', color: 'black', width: 10, height: 10})
    const [arc, setFArc] = useState<any>({})

    const callbacks = {
        onFigure: (e: RadioChangeEvent) => setFigure({...figure, type: e.target.value}),
        onColor: (value: any) => setFigure({...figure, color: value!.toHexString()}),
        onSize: (value: number) => setFigure({...figure, width: value, height: value}),
    }

    const options: any = {
        'rectangle': figure,
        'arc': {...figure, radius: figure.height, start: 0, end: Math.PI * 2},
        'tre': {...figure, line: figure.height},
        'line':  {...figure, radius: figure.height, start: 0, end: Math.PI * 2},
        'clear':  figure,
        'play': figure,
        'stop': figure,
            }

    return (
        <LayoutDraw>
            <Flex vertical gap="middle">
                <Radio.Group onChange={callbacks.onFigure} defaultValue="rectangle">
                    <Radio.Button value="rectangle">Квадрат</Radio.Button>
                    <Radio.Button value="arc" >Круг</Radio.Button>
                    <Radio.Button value="tre">Треугольник</Radio.Button>
                    <Radio.Button value="line">Линия</Radio.Button>
                    <Radio.Button value="clear">Очистить</Radio.Button>
                    <Radio.Button value="play"><CaretRightOutlined style={{color: '#4096ff', width: 80, textAlign: 'center'}} /></Radio.Button>
                    <Radio.Button value="stop"> <StopFilled /></Radio.Button>
                </Radio.Group>
            </Flex>
                <ColorPicker onChange={callbacks.onColor} defaultValue="#000000" />
                <Slider onChangeComplete={callbacks.onSize} defaultValue={10} />
                <Draw elements={options[figure.type]}/>
        </LayoutDraw>
    )
}

export default memo(DrawPage)