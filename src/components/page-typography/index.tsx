import { Typography } from "antd"
import React, { memo } from "react"

export type PageTypography = {
    title: string;
    desc: string
}


const PageTypography: React.FC<PageTypography> = (props) => {

    const {title, desc} = props

    return (
        <div>         
          <Typography style={{ padding: 0, fontSize: '36px', fontWeight: 'bold' }}>{title}</Typography>
          <Typography style={{ paddingBottom: 10, fontSize: '16px', color: 'gray' }}>{desc}</Typography>
        </div>
    )
}

export default memo(PageTypography)