import { useState } from 'react'
import equal from 'fast-deep-equal'

function useCache(initialState = {}) {
  const [store, setStore] = useState(initialState)


  /** Does store contain cache data? */
  const isStoreEmpty = () => Object.entries(store).length === 0

  /** Does store contain url? */
  const hasUrl = (url) => store.hasOwnProperty(url)

  /** Does store contain url with matching params? */
  const hasParams = (url, params) => store[url]
    .some((cached) => equal(params, cached.params))

  /** Public method to check if store contains cache for url and params. */
  const hasCache = (url, params) => !isStoreEmpty()
    && hasUrl(url)
    && hasParams(url, params)

  /** Public method which returns cache for given url and params.
   * Is unsafe, use after `hasCache` call returns true. */
  const getCache = (url, params) => store[url]
    .find((cached) => equal(params, cached.params))

  /** Remove all cache from the store. */
  const destroyAllCache = () => setStore({})

  /** Removes single cache entry from the store. */
  const destroyCachedEntry = (url, params) => {
    const newUrlEntry = store[url]
      .filter((cached) => !equal(params, cached.params))

    setStore((prevState) => ({
      ...prevState.store,
      [url]: newUrlEntry,
    }))
  }

  /** Public method to remove cache from the store.
   * Is unsafe, use after `hasCache` call returns true. */
  const destroyCache = (url, params) => {
    const destroyAll = !url || !params

    if (destroyAll) {
      destroyAllCache()
    } else {
      destroyCachedEntry(url, params)
    }
  }

  /** Public method to save cache object to store.
   * Is unsafe, will overrwrite existing cache.
   * Use after `hasCache` if you don't want this behavior. */
  const setCache = (url, params, data) => {
    if (hasUrl(url)) {
      if (hasCache(url, params)) {
        const newUrlEntry = store[url]
          .filter((cached) => !equal(params, cached.params))

        setStore((prevState) => ({
          ...prevState.store,
          [url]: [
            newUrlEntry,
            { params, data },
          ],
        }))
      } else {
        setStore((prevState) => ({
          ...prevState.store,
          [url]: [
            ...prevState.store[url],
            { params, data },
          ],
        }))
      }
    } else {
      setStore((prevState) => ({
        ...prevState.store,
        [url]: [{ params, data }],
      }))
    }
  }

  return {
    store,
    actions: {
      hasCache,
      getCache,
      setCache,
      destroyCache,
    },
  }
}

export default useCache
