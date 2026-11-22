const base = require('./electron-builder.config.cjs')

const repository = process.env.ORCA_CUSTOM_RELEASE_REPO
const thumbprint = process.env.ORCA_CUSTOM_CERT_SHA1
if (repository !== 'faiyaadmahabub-hash/orca' || !/^[A-F0-9]{40}$/i.test(thumbprint ?? '')) {
  throw new Error('Set the custom GitHub repository and Windows release signing thumbprint.')
}
if (!/^\d+\.\d+\.\d+$/.test(process.env.ORCA_LOCAL_BUILD_VERSION ?? '')) {
  throw new Error('Set a stable version for the custom Windows release.')
}

module.exports = {
  ...base,
  forceCodeSigning: true,
  win: {
    ...base.win,
    verifyUpdateCodeSignature: true,
    signtoolOptions: {
      certificateSha1: thumbprint,
      publisherName: 'Faiyaad Orca Custom Releases'
    }
  },
  publish: {
    provider: 'github',
    owner: 'faiyaadmahabub-hash',
    repo: 'orca',
    releaseType: 'release'
  }
}
