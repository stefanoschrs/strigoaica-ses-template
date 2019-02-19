'use strict'

import * as AWS from 'aws-sdk'

import * as Agathias from 'agathias'

import { Strategy } from 'strigoaica-strategy'

interface ISESTemplate {
  templatesPath: string

  sourceEmail: string
  profile: string
  region: string
}

class SESTemplate implements Strategy {
  templatesPath: string
  type: string

  logger

  sourceEmail: string

  constructor (options: ISESTemplate) {
    this.templatesPath = options.templatesPath
    this.type = 'ses-template'

    this.logger = Agathias.getChild(this.type)

    this.sourceEmail = options.sourceEmail

    AWS.config.credentials = new AWS.SharedIniFileCredentials({
      profile: options.profile
    })
    AWS.config.update({
      region: options.region
    })
  }

  async send (templateId, data: { to: string|string[], from?: string, payload?: any }) {
    this.logger.debug({ templateId, data })

    if (data.to === undefined) {
      return Promise.reject(new Error('Missing parameters'))
    }

    const recipients = Array.isArray(data.to) ? data.to : [data.to]
    const templateConfig = {
      Destination: {
        ToAddresses: recipients
      },
      Source: data.from ||this.sourceEmail,
      Template: templateId,
      TemplateData: JSON.stringify(data.payload || {})
    }

    if (process.env.NODE_ENV !== 'production') {
      this.logger.debug({ templateConfig })
      return Promise.resolve(templateConfig)
    }

    return new Promise((resolve, reject) =>
      new AWS.SES({ apiVersion: '2010-12-01' })
        .sendTemplatedEmail(templateConfig, (err, res) =>
          err ? reject(err) : resolve(res)
        )
    )
  }
}

module.exports = SESTemplate
