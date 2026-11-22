import { afterEach, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.resetModules()
})

it('keeps every update channel on the configured fork for a custom desktop build', async () => {
  vi.stubGlobal('ORCA_CUSTOM_RELEASE_REPO', 'faiyaadmahabub-hash/orca')
  const { getReleaseRepoForChannel, MAIN_RELEASE_REPO, RELEASE_CHANNELS } =
    await import('./release-channel')

  expect(MAIN_RELEASE_REPO).toBe('faiyaadmahabub-hash/orca')
  for (const channel of RELEASE_CHANNELS) {
    expect(getReleaseRepoForChannel(channel)).toBe('faiyaadmahabub-hash/orca')
  }
})

it('uses the official stable and daily repositories for a standard build', async () => {
  const { getReleaseRepoForChannel } = await import('./release-channel')
  expect(getReleaseRepoForChannel('stable')).toBe('stablyai/orca')
  expect(getReleaseRepoForChannel('daily')).toBe('stablyai/orca-daily')
})
