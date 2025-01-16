async function getIconByName (iconName) {
  try {
    const { [iconName]: Icon } = await import('lucide-react')
    if (!Icon) {
      throw new Error(`Icon not found: ${iconName}`)
    }
    return Icon
  } catch (error) {
    console.error(`Error: ${error.message}`)
    return null
  }
}

async function renderIcon (iconName) {
  const IconComponent = await getIconByName(iconName)

  if (IconComponent) {
    const container = document.createElement('div')
    const iconElement = React.createElement(IconComponent)
    ReactDOM.render(iconElement, container)
    document.body.appendChild(container)
  } else {
    console.log(`${iconName} not found`)
  }
}

export { renderIcon }
