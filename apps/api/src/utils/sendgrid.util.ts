const sgMail = require("@sendgrid/mail")
import { render } from "@react-email/render"

import { SendgridConfig } from "@/configs"
import { SITE_TITLE } from "@repo/util/constant"

import LoggerUtil from "./logger.util"

import {
  WelcomeEmailTemplate,
  ResetPasswordEmailTemplate,
  PasswordChangeConfirmationEmailTemplate
} from "@repo/email-template"

sgMail.setApiKey(SendgridConfig.api_key)

const SendWelcomeMail = async (
  to: string,
  full_name: string,
  verify_link: string,
  contact_link: string
) => {
  try {
    const htmlTemplate = render(
      WelcomeEmailTemplate({ site_title: SITE_TITLE, full_name, verify_link, contact_link })
    )

    const textTemplate = render(
      WelcomeEmailTemplate({ site_title: SITE_TITLE, full_name, verify_link, contact_link }),
      { plainText: true }
    )

    const msg = {
      to,
      from: SendgridConfig.email_from,
      subject: `Welcome to ${SITE_TITLE}!`,
      text: textTemplate,
      html: htmlTemplate
    }

    return await sgMail.send(msg)
  } catch (e: any) {
    LoggerUtil.error("SendWelcomeMail error: ", e)
    console.error("SendWelcomeMail error: ", e.message)
    throw new Error(e.message)
  }
}

const SendResetPasswordMail = async (to: string, full_name: string, reset_link: string) => {
  try {
    const htmlTemplate = render(
      ResetPasswordEmailTemplate({
        site_title: SITE_TITLE,
        full_name,
        reset_link,
        support_email: SendgridConfig.email_from
      })
    )

    const textTemplate = render(
      ResetPasswordEmailTemplate({
        site_title: SITE_TITLE,
        full_name,
        reset_link,
        support_email: SendgridConfig.email_from
      }),
      { plainText: true }
    )

    const msg = {
      to,
      from: SendgridConfig.email_from,
      subject: `Welcome to ${SITE_TITLE}!`,
      text: textTemplate,
      html: htmlTemplate
    }

    return await sgMail.send(msg)
  } catch (e: any) {
    LoggerUtil.error("SendResetPasswordMail error: ", e)
    console.error("SendResetPasswordMail error: ", e.message)
    throw new Error(e.message)
  }
}

const SendPasswordChangeConfirmationMail = async (to: string, full_name: string) => {
  try {
    const htmlTemplate = render(
      PasswordChangeConfirmationEmailTemplate({
        site_title: SITE_TITLE,
        full_name,
        support_email: SendgridConfig.email_from
      })
    )

    const textTemplate = render(
      PasswordChangeConfirmationEmailTemplate({
        site_title: SITE_TITLE,
        full_name,
        support_email: SendgridConfig.email_from
      }),
      { plainText: true }
    )

    const msg = {
      to,
      from: SendgridConfig.email_from,
      subject: `Welcome to ${SITE_TITLE}!`,
      text: textTemplate,
      html: htmlTemplate
    }

    return await sgMail.send(msg)
  } catch (e: any) {
    LoggerUtil.error("SendPasswordChangeConfirmationMail error: ", e)
    console.error("SendPasswordChangeConfirmationMail error: ", e.message)
    throw new Error(e.message)
  }
}

export default {
  SendWelcomeMail,
  SendResetPasswordMail,
  SendPasswordChangeConfirmationMail
}
