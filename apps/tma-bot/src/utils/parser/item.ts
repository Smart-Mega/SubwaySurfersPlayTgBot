export function parseItems(items: Array<Record<string, any>>): Array<Record<string, any>> {
  const result: Array<Record<string, any>> = []

  for (const item of items) {
    const { attributes, ...rest } = item

    let newAttributes: Record<string, any> = {}
    for (const attr of attributes) {
      newAttributes = { ...newAttributes, [attr.attribute_name]: attr.attribute_value }
    }

    result.push({ ...rest, attributes: newAttributes })
  }

  return result
}
