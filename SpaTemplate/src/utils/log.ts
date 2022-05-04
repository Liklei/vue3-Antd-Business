import pkg from '../../package.json'
const projectName = import.meta.env.VITE_GLOB_APP_TITLE

export function warn(message: string) {
  console.warn(`[${projectName} warn]:${message}`)
}

export function error(message: string) {
  throw new Error(`[${projectName} error]:${message}`)
}

export function logVersion(name: string = pkg.name, version: string = pkg.version) {
  console.log(
    `%c ${name} %c V${version} `,
    'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;',
    'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;'
  )
}

export function logImg(
  _img = 'https://static.intsig.net/camcard_company_card/static/img/logo-cc-column.d6052236.png'
) {
  console.log(
    '%c ',
    `font-size: 1px;
    padding: 100px 100px 0 100px;
    background-image: url(${_img});
    background-size: contain;
    background-repeat: no-repeat;
    color: transparent;`
  )
}

export function logCamCardBrand() {
  logVersion()
  logImg()
}
