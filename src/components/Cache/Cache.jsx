import React, { Component } from 'react'
import equal from 'fast-deep-equal'

class Cache extends Component {
  state = {
    store: {},
  }

  /** Does store contain cache data? */
  isStoreEmpty = () => Object.entries(this.state.store).length === 0

  /** Does store contain url? */
  hasUrl = (url) => this.state.store.hasOwnProperty(url)

  /** Does store contain url with matching params? */
  hasParams = (url, params) => this.state.store[url]
    .some((cached) => equal(params, cached.params))

  /** Public method to check if store contains cache for url and params. */
  hasCache = (url, params) => !this.isStoreEmpty()
    && this.hasUrl(url)
    && this.hasParams(url, params)

  /** Public method which returns cache for given url and params.
   * Is unsafe, use after `hasCache` call returns true. */
  getCache = (url, params) => this.state.store[url]
    .find((cached) => equal(params, cached.params))

  /** Public method to remove cache from the store.
   * Is unsafe, use after `hasCache` call returns true. */
  destroyCache = (url, params) => {
    const destroyAll = !url || !params

    if (destroyAll) {
      this.destroyAllCache()
    } else {
      this.destroyCachedEntry(url, params)
    }
  }

  /** Remove all cache from the store. */
  destroyAllCache = () => this.setState({
    store: {},
  })

  /** Removes single cache entry from the store. */
  destroyCachedEntry = (url, params) => {
    const newUrlEntry = this.state.store[url]
      .filter((cached) => !equal(params, cached.params))

    this.setState((prevState) => ({
      store: {
        ...prevState.store,
        [url]: newUrlEntry,
      }
    }))
  }

  /** Public method to save cache object to store.
   * Is unsafe, will overrwrite existing cache.
   * Use after `hasCache` if you don't want this behavior. */
  setCache = (url, params, data) => {
    if (this.hasUrl(url)) {
      if (this.hasCache(url, params)) {
        const newUrlEntry = this.state.store[url]
          .filter((cached) => !equal(params, cached.params))

          this.setState((prevState) => ({
            store: {
              ...prevState.store,
              [url]: [
                newUrlEntry,
                { params, data },
              ],
            }
          }))
      } else {
        this.setState((prevState) => ({
          store: {
            ...prevState.store,
            [url]: [
              ...prevState.store[url],
              { params, data },
            ],
          }
        }))
      }
    } else {
      this.setState((prevState) => ({
        store: {
          ...prevState.store,
          [url]: [{ params, data }],
        }
      }))
    }
  }

  render() {
    return this.props.children({
      store: this.state.store,
      actions: {
        hasCache: this.hasCache,
        getCache: this.getCache,
        setCache: this.setCache,
        destroyCache: this.destroyCache,
      },
    })
  }
}

export default Cache
