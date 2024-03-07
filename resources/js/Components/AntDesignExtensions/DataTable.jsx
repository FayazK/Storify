import { Table } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { dataTableAtom } from '@/Helpers/atom.js'
import { tablePaginatedParams } from '@/Helpers/global_props.js'

export default function DataTable ({ columns, routeName }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [tableParams, setTableParams] = useRecoilState(dataTableAtom)

  const fetchData = useCallback(() => {
    setLoading(true)
    axios({
      url: route(routeName),
      params: tablePaginatedParams(tableParams[routeName]),
      data: tableParams[routeName]?.data ?? {},
      method: tableParams[routeName]?.method ?? 'POST',
    }).then(response => {
      setData(response.data.users)
      let meta = response.data.meta
      let pagination = {
        ...tableParams[routeName]?.pagination,
        current: meta.current_page,
        total: meta.total,
        pageSize: meta.per_page,
        showTotal: (total, range) => {
          return `Showing ${range[0]} to ${range[1]} of ${total} items`
        },
      }

      let params = { ...tableParams[routeName] } ?? {}
      params.pagination = pagination
      setTableParams({ ...tableParams, [routeName]: params })
      console.log(response.data)
    }).catch(error => {
      console.error('An error occurred while fetching data:', error)
    }).finally(() => {
      setLoading(false)
    })
  }, [tableParams[routeName]])

  useEffect(() => {
    fetchData()
  }, [tableParams[routeName]?.refresh])

  const handleTableChange = (pagination, filters, sorter) => {
    const newParams = {
      ...tableParams[routeName],
      pagination,
      filters,
      sorter,
      refresh: !tableParams[routeName]?.refresh,
    }
    setTableParams({ ...tableParams, [routeName]: newParams })
  }// handleTableChange

  return <Table
    columns={columns}
    dataSource={data}
    loading={loading}
    size={'small'}
    onChange={handleTableChange}
    pagination={tableParams[routeName]?.pagination ?? false}
  />

}// DataTable
