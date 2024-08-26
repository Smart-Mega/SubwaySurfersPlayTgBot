import * as React from "react"

import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text
} from "@react-email/components"

interface Props {
  site_title: string
  full_name: string
  support_email: string
}

export default function PasswordChangeConfirmationEmailTemplate(props: Readonly<Props>) {
  const { site_title, full_name, support_email } = props

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
              <Text className="text-base">
                Your {site_title} password has been updated successfully.
              </Text>
              <Text className="text-base">
                If this change wasn't made by you, please contact support immediately at{" "}
                <span className="font-semibold">{support_email}</span>
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
