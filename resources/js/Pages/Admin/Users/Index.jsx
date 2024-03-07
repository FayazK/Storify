import AdminLayout from '@/Layouts/AdminLayout.jsx'
import DataTable from '@/Components/AntDesignExtensions/DataTable.jsx'
import {
  UserTableColumns,
} from '@/Pages/Admin/Users/Partials/UserTableColumns.jsx'
import { useRecoilState } from 'recoil'
import { dataTableAtom } from '@/Helpers/atom.js'
import { useEffect } from 'react'
import { defaultPagination } from '@/Helpers/global_props.js'

const routeName = 'admin.users.all'
export default function () {
  const [tableParams, setTableParams] = useRecoilState(dataTableAtom)
  useEffect(() => {
    let params = tableParams[routeName] ?? {}
    if (!params.pagination) {
      params.pagination = defaultPagination
    }

    setTableParams({ ...tableParams, [routeName]: params })
  }, [])
  return <AdminLayout>
    <DataTable
      routeName={routeName}
      columns={UserTableColumns}
      rowKey={'id'}
    />
  </AdminLayout>
}
