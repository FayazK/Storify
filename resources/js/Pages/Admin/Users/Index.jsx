import AdminLayout from "@/Layouts/AdminLayout.jsx";
import DataTable from "@/Components/AntDesignExtensions/DataTable.jsx";

export default function () {
    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
        }
    ];
    return <AdminLayout>
        <DataTable
            routeName={'admin.users.all'}
            columns={columns}
            rowKey={'id'}
        />
    </AdminLayout>
}
