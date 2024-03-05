import {Table} from 'antd'
import {useCallback, useEffect, useState} from 'react'
import {useRecoilValue} from 'recoil'
import {dataTableAtom} from '@/Helpers/atom.js'

export default function DataTable({columns, routeName}) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const tableParams = useRecoilValue(dataTableAtom)

    const fetchData = useCallback(() => {
        setLoading(true);
        axios({
            url: route(routeName),
            params: tableParams[routeName]?.params ?? {},
            data: tableParams[routeName]?.data ?? {},
            method: tableParams[routeName]?.method ?? 'POST',
        }).then(response => {
            setData(response.data.users);
            console.log(response);
        }).catch(error => {
            console.error("An error occurred while fetching data:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, [tableParams[routeName]])

    useEffect(() => {
        fetchData()
    }, [tableParams[routeName]])

    useEffect(() => {
        tableParams[routeName].pagination = {
            current: tableParams[routeName]?.pagination?.page ?? 1,
        }
    }, []);

    return <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        size={'small'}
        pagination={tableParams[routeName]?.pagination ?? false}
    />

}// DataTable
