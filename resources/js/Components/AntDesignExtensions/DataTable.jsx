import { Table } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { dataTableAtom } from '@/Helpers/atom.js'

export default function DataTable ({ columns, route: routeName }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const tableParams = useRecoilValue(dataTableAtom)

  const fetchData = useCallback(() => {
    setLoading(true)
    axios({ url: routeName, params: tableParams[routeName]['params'] ?? {} })
  }, [tableParams[routeName]])

  useEffect(() => {

  }, [tableParams[routeName]])

  return <Table
    columns={columns}
    dataSource={data}
    loading={loading}
  />

}// DataTable
