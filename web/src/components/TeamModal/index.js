import React, {useEffect, useState} from 'react';
import {message, Form, Input, InputNumber, Modal} from "antd";
import reqwest from "reqwest";

const TeamModal = ({visible, closeModal, teamId, refetch}) => {
    const [initialValues, setInitialValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const requiredMessage = 'Este campo es requerido';

    useEffect(() => {
        form.resetFields();
        if (teamId) fetchTeam();
    }, [visible])

    const fetchTeam = () => {
        reqwest({
            url: `http://localhost:8000/teams/${teamId}`,
            method: 'GET',
            type: 'json',
        }).then(data => {
            setInitialValues(data);
            form.setFieldsValue(data);
        })
    }

    const handleOk = () => {
        setLoading(true);
        form.validateFields().then(values => {
            reqwest({
                url: `http://localhost:8000/teams${teamId ? `/${teamId}` : ''}`,
                method: teamId ? 'PUT' : 'POST',
                type: 'json',
                data: values
            }).then(() => {
                refetch();
                form.resetFields();
                closeModal();
                setLoading(false);
                message.success(`Equipo ${teamId ? 'editado' : 'agregado'}!`);
            })
        })
    }

    return (
        <Modal
            title={`${teamId ? 'Editar' : 'Nuevo'} equipo`}
            visible={visible}
            onOk={handleOk}
            onCancel={closeModal}
            cancelText="Cancelar"
            okText="Guardar"
            confirmLoading={loading}
            cancelButtonProps={{disabled: loading}}
        >
            <Form
                form={form}
                initialValues={initialValues}
                layout="vertical"
            >
                <Form.Item
                    name="name"
                    label="Nombre"
                    rules={[{required: true, message: requiredMessage}]}
                >
                    <Input placeholder="Nombre del equipo (ej. Arquitectura, Backend)"/>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Descripcion"
                    rules={[{required: true, message: requiredMessage}]}
                >
                    <Input.TextArea showCount maxLength={100}/>
                </Form.Item>
                <Form.Item
                    name="budget"
                    label="Presupuesto"
                    rules={[
                        {required: true, message: requiredMessage}
                    ]}
                >
                    <InputNumber
                        style={{width: '50%'}}
                        min={0}
                        controls={false}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                </Form.Item>
                <Form.Item
                    name="members"
                    label="Cantidad de miembros"
                    rules={[
                        {required: true, message: requiredMessage}
                    ]}
                >
                    <InputNumber min={0}/>
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default TeamModal;