import { memo } from "react"
import Search from 'antd/es/input/Search';

export type SearchProps = {
    onSearch: (value: string) => Promise<void>
    button: string
    placeholder: string
}

const SearchForm: React.FC<SearchProps> = ({onSearch, button, placeholder}) => {
return (
    <Search
    style={{ width: 320 }}
    placeholder={placeholder}
    allowClear
    enterButton={button}
    size='middle'
    onSearch={onSearch}
  />
)
}

export default memo(SearchForm)