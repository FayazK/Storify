export const defaultPagination = {
  current: 1,
  defaultCurrent: 1,
  size: 'default',
  pageSize: 25,
  hideOnSinglePage: true,
  responsive: true,
  showSizeChanger: false,
  showTotal: (total, range) => {
    return `Showing ${range[0]} to ${range[1]} of ${total} items`
  },
}

export const tablePaginatedParams = (params) => {
  return { ...params?.params ?? {}, page: params?.pagination?.current ?? 1 }
}
