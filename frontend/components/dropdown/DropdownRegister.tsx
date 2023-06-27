import { FC } from 'react'
import { Dropdown } from '@nextui-org/react'

interface Data{
  id: string;
  description: string
}

interface DropdownRegisterProps {
    listkeys: Data[];
    selected : string;
    setValue :(value: any) => void;
    width?: number ;
    check?: string
}

export const DropdownRegister : FC<DropdownRegisterProps> = ({listkeys = [], selected, setValue, width = 100, check = ''}) => {

  const onSelectKey = (value : string) => {
    const onValue = listkeys.find((list) => list.description === value)
    if ( !onValue ) return;
    setValue(onValue)
  }
  return (
    <Dropdown >
      <Dropdown.Button color={selected !== check ? 'success' : 'primary'}  css={{ tt: "capitalize", width : `${width}%`, m: '2px' }}>
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
            listkeys.map((key) => <Dropdown.Item key={key.description}>{key.description}</Dropdown.Item>)
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}
