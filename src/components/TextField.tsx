import React, { FC } from "react"
import styled from "styled-components"
import { useField } from "formik"

type Props = {
  label: string
}

const TextField: FC<Props> = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props)

  return (
    <Container>
      <Label>{label}</Label>
      <Field {...field} {...props} />
    </Container>
  )
}

export default TextField

const Container = styled.div`
  padding: 0.5rem 0rem;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Label = styled.label`
  color: var(--text-primary);
`

const Field = styled.input.attrs(() => ({
  type: "text",
}))`
  border: 1px solid var(--text-secondary);
  padding: 0.2rem 0.5rem;
  border-radius: 0.2rem;
  text-align: right;
  color: var(--text-primary);

  :focus {
    outline: 1px solid var(--accent-color);
    color: var(--accent-color);
  }
`
