import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { Formik } from "formik"
import * as Yup from "yup"
import TextField from "../components/TextField"
import { calculateProfit } from "../helpers/loan-helpers"

const IndexPage = () => {
  const [profit, setProfit] = useState(0)

  const initialValues = {
    price: 0,
    area: 0,
    maintananceCharge: 0,
    renovationCosts: 0,

    rent: 0,
    maturity: 25,
    interest: 0.8,
    selfFinance: 0,
    transferTax: 0.02,
  }

  const calculateValues = ({
    rent,
    maintananceCharge,
    price,
    renovationCosts,
    transferTax,
  }) => {
    console.log({
      rent,
      maintananceCharge,
      price,
      renovationCosts,
      transferTax,
    })
    setProfit(
      calculateProfit(
        rent,
        maintananceCharge,
        price,
        renovationCosts,
        transferTax
      )
    )
  }

  return (
    <Layout>
      <SEO title="Sijoitusopas.com" />

      <H1>Tuotto- ja rahoituslaskuri</H1>
      <P>
        Tällä sivulla voit laskea asunnon vuokratuoton. Katso myös toinen
        vuokratuottolaskuri, jonka saat ladattua itsellesi.
      </P>

      <Formik
        initialValues={initialValues}
        validationSchema={Validation}
        onSubmit={values => calculateValues(values)}
      >
        {({ handleChange, values, handleSubmit }) => (
          <>
            <Section>
              <H3>Asunnon tiedot</H3>
              <Fields>
                <TextField
                  label="Hinta"
                  value={values.price}
                  onChange={handleChange("price")}
                />
                <TextField
                  label="Hoitovastike"
                  value={values.maintananceCharge}
                  onChange={handleChange("maintananceCharge")}
                />
                <TextField
                  label="Pinta-ala"
                  value={values.area}
                  onChange={handleChange("area")}
                />
              </Fields>
            </Section>

            <Section>
              <H3>Rahoitus</H3>
              <Fields>
                <TextField
                  label="Vuokra"
                  value={values.rent}
                  onChange={handleChange("rent")}
                />
                <TextField
                  label="Laina-aika"
                  value={values.maturity}
                  onChange={handleChange("maturity")}
                />
                <TextField
                  label="Lainan vuosikorko"
                  value={values.interest}
                  onChange={handleChange("interest")}
                />
                <TextField
                  label="Omarahoitusosuus"
                  value={values.selfFinance}
                  onChange={handleChange("selfFinance")}
                />

                <TextField
                  label="Varainsiirtoveroprosentti"
                  value={values.transferTax}
                  onChange={handleChange("transferTax")}
                />
              </Fields>
            </Section>

            <button onClick={handleSubmit}>Tarkista</button>
          </>
        )}
      </Formik>
      <Calculations>
        <p>Pääoman tuotto{profit}</p>
      </Calculations>
    </Layout>
  )
}

export default IndexPage

const H1 = styled.h1`
  color: var(--text-primary);
  font-family: "Nunito", sans-serif;
`

const H3 = styled.h3`
  font-family: "Nunito", sans-serif;
  color: var(--text-primary);
`

const P = styled.p`
  color: var(--text-secondary);
`

const Section = styled.div`
  margin-bottom: 2rem;
`

const Calculations = styled.div`
  color: var(--text-primary);
`

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background-color: var(--secondary-bg);
  box-shadow: 1px 2px 7px 2px #a0a0a014;
`

const Validation = Yup.object().shape({
  price: Yup.number().required(),
  area: Yup.number().required(),
  maintananceCharge: Yup.number(),
  renovationCosts: Yup.number(),
})
