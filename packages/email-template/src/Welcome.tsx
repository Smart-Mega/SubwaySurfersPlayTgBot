import * as React from "react"

import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from "@react-email/components"

interface Props {
  site_title: string
  full_name: string
  verify_link: string
  contact_link: string
}

export default function WelcomeEmailTemplate(props: Readonly<Props>) {
  const { site_title, full_name, verify_link, contact_link } = props

  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Poppins"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2",
            format: "woff2"
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Preview>Welcome to {site_title}</Preview>

      <Tailwind>
        <Body className="bg-[#E9ECEF]">
          <Container className="flex flex-col">
            <Section className="flex justify-center px-6 py-9">
              <Img
                src="https://fundsconnectdev.com/logo.png"
                alt="Logo"
                width="217.6"
                height="24"
              />
            </Section>

            <Section className="flex flex-col rounded-xl bg-white p-6">
              <Text className="text-base">Dear {full_name},</Text>
              <Text className="text-base">Thank you for signing up to {site_title}.</Text>
              <Text className="text-base">
                Please click the button below to verify your email address.
              </Text>

              <Button
                href={verify_link}
                className="my-4 rounded-xl bg-[#00EDB7] px-6 py-4 font-semibold text-white"
              >
                Verify email address
              </Button>

              <Text className="text-base">
                If you did not create an account, no further action is required.
              </Text>
              <Text className="text-base">
                If you have any issues, please do not hesitate to{" "}
                <Link className="font-semibold text-black underline" href={contact_link}>
                  contact support
                </Link>
                .
              </Text>

              <Text className="text-base">
                Thank you,
                <br />
                {site_title} Team
              </Text>
            </Section>

            <Section className="px-6 py-9">
              <Text className="text-center text-sm">
                &copy; {new Date().getFullYear()} {site_title} Technologies Pty Ltd
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
