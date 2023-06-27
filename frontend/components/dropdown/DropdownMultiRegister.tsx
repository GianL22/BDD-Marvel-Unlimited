import { FC, useEffect, useMemo, useState } from 'react'
import { Dropdown } from '@nextui-org/react'

interface Data{
  id: string;
  description: string;
}

interface DropdownRegisterProps {
    listkeys?: Data[];
    width?: number;
    label: string;
    setValue: (value: any)=> void;
}

export const DropdownMultiRegister : FC<DropdownRegisterProps> = ({listkeys = [], width = 100, setValue, label}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const onSelectKey = (value : string) => {
    const newValue: string[] = value.split(',')
    setSelected(newValue)
  }

  const resultsData = useMemo(() => {
    return listkeys
    .filter(item => selected.includes(item.description))
    .map(({ id }) => ({ id }));
  }, [selected]);
  
  useEffect(() => {
    setValue(resultsData);
  }, [selected, resultsData]);
  
  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  return (
    <Dropdown>
      <Dropdown.Button color={selected.length !== 0 ? 'success' : 'primary'} css={{ tt: "capitalize", width : `${width}%`, m: '2px' }}>
        { (selected.length === 0) ? label : selectedValue}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Multiple selection actions"
        color="secondary"
        disallowEmptySelection
        selectionMode="multiple"
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
