import React from "react";
import { Menu, Button } from "antd"
import { ICityListProp } from "../../types";
import { CITIES } from "../../constants"
import  {RedoOutlined } from '@ant-design/icons';


export const CityList = ({
    activeId,
    onSelect,
    onReload
}: ICityListProp) => {

    const onSelectItem = (key: string) => {
        onSelect(key)
    }   

    return (
        <Menu  
            defaultSelectedKeys={[activeId]}  
            title="Navigation Three"
            onSelect={({key}) => onSelectItem(`${key}`)}
        >
            {CITIES.map(city => (
                <Menu.Item 
                    key={city.cityId}
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    {city.name}
                    <Button type="link" shape="circle" icon={<RedoOutlined />} size={"small"} onClick={onReload}>
                    </Button>
                </Menu.Item>
            ))} 
        </Menu>
    )

}