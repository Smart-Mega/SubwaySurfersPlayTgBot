import { NextFunction, Request, Response } from "express"
import { Fields, formidable } from "formidable"

function convertFieldsToString(fields: Fields) {
  const convertedFields: any = {}

  for (const key in fields) {
    if (key.includes("[]")) {
      convertedFields[key.replace("[]", "")] = fields[key]
    } else if (Array.isArray(fields[key])) {
      convertedFields[key] = fields[key]?.[0]
    } else {
      convertedFields[key] = fields[key]
    }
  }

  return convertedFields
}

function unflatten(data: any) {
  const result = {}

  // Iterate over each item in the original flat object
  for (const [key, value] of Object.entries(data)) {
    // Split the key into parts based on the pattern 'directors[0][property]'
    let keys = key.split(/\[|\]\[|\]/).filter((k) => k !== "")

    // Reference to the current level of depth in the result object
    let current: any = result

    // Process each part of the key except for the last part
    for (let i = 0; i < keys.length - 1; i++) {
      const part = keys[i]
      const nextKey = keys[i + 1]

      // Check if the next part of the key is a numeric index
      if (!isNaN(parseInt(nextKey, 10))) {
        // Ensure the current level is an array
        current[part] = current[part] || []
      } else {
        // Ensure the current level is an object
        current[part] = current[part] || {}
      }

      // Move the reference deeper into the result object
      current = current[part]
    }

    // Set the final value in the deepest level of the result object
    const lastKey = keys[keys.length - 1]
    current[lastKey] = value
  }

  return result
}

export const form = () => (req: Request, res: Response, next: NextFunction) => {
  const form = formidable({
    uploadDir: __dirname,
    maxFileSize: 100 * 1024 * 1024,
    allowEmptyFiles: true,
    multiples: true
  })

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err)
      return
    }
    req.fields = unflatten(convertFieldsToString(fields))
    req.files = files
    next()
  })
}
