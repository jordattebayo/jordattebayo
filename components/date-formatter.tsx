import { parseISO, format } from 'date-fns'
import styled from "styled-components"

type Props = {
  dateString: string
}

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'MM/dd/yyyy')}</time>
}

export default DateFormatter