import { FC } from 'react'
import { Radio } from '@nextui-org/react'

type RadioSize = "md" | "xs" | "sm" | "lg" | "xl";

interface RadioRegisterProps {
    listValue: string[];
    label : string;
    valueRadio: string
    onSelectKey: (value: string) => void;
    size?: RadioSize
}

export const RadioRegister : FC<RadioRegisterProps> = ({listValue, label, valueRadio,onSelectKey, size="md"}) => {
  return (
    <Radio.Group orientation="horizontal" value={valueRadio} label={label} onChange={onSelectKey}>
        {
            listValue.map((value)=>(
                <Radio key={value}  value= { value } size= {`${size}`}>
                    {value}
                </Radio>
            ))
        }
    </Radio.Group>
  )
}
