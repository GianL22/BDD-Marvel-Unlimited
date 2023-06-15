import { FC, useMemo, useState } from 'react'
import { Dropdown } from '@nextui-org/react'


interface DropdownRegisterProps {
    listkeys: string[];
    selected : string;
    onSelectKey : (key : string) => void;
}

export const DropdownRegister : FC<DropdownRegisterProps> = ({listkeys = [], selected, onSelectKey}) => {
  return (
    <Dropdown >
      <Dropdown.Button flat color={'error'} css={{  tt: "capitalize", width : '100%', m: '2px' }}>
        {selected}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Single selection actions"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={(keys) => onSelectKey(Array.from(keys).toString())}
      >
        {
            listkeys.map((key) => <Dropdown.Item key={key}>{key}</Dropdown.Item>)
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}
