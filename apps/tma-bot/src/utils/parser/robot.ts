export function parseRobots(robots: Array<Record<string, any>>): Array<Record<string, any>> {
  const result: Array<Record<string, any>> = []

  for (const robot of robots) {
    const { attributes, ...rest } = robot

    let newAttributes: Record<string, any> = {}
    for (const attr of attributes) {
      newAttributes = { ...newAttributes, [attr.attribute_name]: attr.attribute_value }
    }

    result.push({ ...rest, attributes: newAttributes })
  }

  return result
}

export function parseRobot(robot: Record<string, any>): Record<string, any> {
  let result: Record<string, any> = {}
  const { attributes, ...rest } = robot

  let newAttributes: Record<string, any> = {}
  for (const attr of attributes) {
    newAttributes = { ...newAttributes, [attr.attribute_name]: attr.attribute_value }
  }

  result = { ...rest, attributes: newAttributes }
  return result
}
