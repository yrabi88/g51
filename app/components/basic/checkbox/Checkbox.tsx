import CheckboxOutlineIcon from '@/app/icons/check-circle-outline.svg'
import CheckboxSolidIcon from '@/app/icons/check-circle-solid.svg'
import Row from '@/app/components/layout/Row'

interface Props {
    value?: boolean;
    onChange?: (checked: boolean) => void;
}

export default function Checkbox(props: Props) {

    return (
        <Row className="cursor-pointer items-center" onClick={ () => props.onChange?.(!props.value) }>
            { props.value ? <CheckboxSolidIcon/> : <CheckboxOutlineIcon /> }
        </Row>
    )
}