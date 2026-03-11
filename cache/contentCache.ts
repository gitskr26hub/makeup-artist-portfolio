let cache: any = null
let lastFetch = 0

const CACHE_TIME = 30 * 60 * 1000 // 30 minutes

export async function getCachedContent(fetchFn: () => Promise<any>) {

    const now = Date.now()

    if (cache && now - lastFetch < CACHE_TIME) {
        return cache
    }

    const data = await fetchFn()

    cache = data
    lastFetch = now

    return data
}