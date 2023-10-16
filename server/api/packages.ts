const internalRepos = new Set([
  'eslint-config',
  'nitro-preset-starter',
  'unjs.github.io',
  'unjs.io',
  'website',
  'nitro-deploys',
  'template',
  'unkit',
  'rollup-plugin-node-deno',
  'renovate-config',
  'lmify',
  'governance',
  '.github',
  // These are not internal but less maintained
  'create-require',
  'externality',
  'ezpass',
  'html-validate-es',
  'is-https',
  'items-promise',
  'redirect-ssl',
  'requrl',
  'shiki-es',
  'workbox-cdn',
])

export default defineEventHandler(async () => {
  const { repos: packages } = await $fetch<{ repos: { repo: string; name: string }[] }>('https://ungh.cc/orgs/unjs/repos')

  const packagesPopulated = await Promise.all(packages
    .filter(package_ => !internalRepos.has(package_.name))
    .map(package_ => fetchPackage(package_)))

  return packagesPopulated
})

async function fetchPackage(package_: { repo: string; name: string }) {
  let npmPackage: string = package_.name
  if (package_.name === 'nitro')
    npmPackage = 'nitropack'

  const [{ contributors }, { downloads }] = await Promise.all([
    $fetch<{ contributors: [] }>(`https://ungh.cc/repos/${package_.repo}/contributors`),
    $fetch<{ downloads: number }>(`https://api.npmjs.org/downloads/point/last-month/${npmPackage}`),
  ])

  return {
    ...package_,
    contributors: contributors.length,
    monthlyDownloads: downloads,
  }
}
