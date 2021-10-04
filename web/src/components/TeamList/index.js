import {Space, Button, Table} from "antd";
import React from "react";

const TeamList = ({loading, teams, editTeam, removeTeam}) => {
    const renderOptions = (id) => (
        <Space>
            <Button onClick={() => removeTeam(id)}>Borrar</Button>
            <Button onClick={() => editTeam(id)}>Editar</Button>
        </Space>
    )

    const columns = [
        {title: 'Id', dataIndex: 'id', key: 'id'},
        {title: 'Nombre', dataIndex: 'name', key: 'name'},
        {title: 'Descripcion', dataIndex: 'description', key: 'description'},
        {
            title: 'Presupuesto ($ CLP)',
            dataIndex: 'budget',
            key: 'budget',
            align: 'right',
            render: (budget) => `$ ${budget}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')},
        {title: 'Miembros (#)', dataIndex: 'members', key: 'members', align: 'right'},
        {title: '', key: 'actions', width: 100, render: ({id}) => renderOptions(id)}
    ]

    return <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={teams}
        pagination={false}
    />
}

export default TeamList;