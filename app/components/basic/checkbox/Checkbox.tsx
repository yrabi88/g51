import CheckboxOutlineIcon from '@/app/icons/check-circle-outline.svg'
import CheckboxSolidIcon from '@/app/icons/check-circle-solid.svg'
import Row from '@/app/components/layout/Row'
import Image from 'next/image';

interface Props {
    value?: boolean;
    onChange?: (checked: boolean) => void;
}

export default function Checkbox(props: Props) {

    return (
        <Row className="cursor-pointer items-center shrink-0" onClick={ () => props.onChange?.(!props.value) }>
            { props.value
                ? <Image src={CheckboxSolidIcon} alt="V"/>
                : <Image src={CheckboxOutlineIcon} alt="-" />
            }
        </Row>
    )
}