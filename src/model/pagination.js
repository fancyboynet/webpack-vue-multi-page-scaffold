import Base from './base'

export default class Pagination extends Base {
  constructor (data = {}, map) {
    super(data, {
      limit: 'pagenum',
      total: 'total',
      page: 'page',
      ...map
    })
    this.limit = this.limit || 10
    this.page = this.page || 1
  }

  isEmpty () {
    return this.total === 0
  }

  isLastPage () {
    return this.total <= (this.limit * this.page)
  }

  createParams () { // 创建请求页码对象
    return {
      pagenum: this.limit,
      page: this.page
    }
  }

  setPage (v) {
    this.page = v
  }

  setLimit (v) {
    this.limit = v
  }

  setTotal (v) {
    this.total = v
  }
}


