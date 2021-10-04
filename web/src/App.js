import React, {useState, useEffect} from 'react';
import './App.css';
import {message, Button, Col, PageHeader, Row} from "antd";
import TeamList from "./components/TeamList";
import TeamModal from "./components/TeamModal";
import reqwest from "reqwest";

const App = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [teams, setTeams] = useState(null)
    const [teamId, setTeamId] = useState(null);

    const fetchTeams = () => {
        setLoading(true);
        reqwest({
            url: 'http://localhost:8000/teams',
            method: 'GET',
            type: 'json'
        }).then(data => {
            setTeams(data);
            setLoading(false);
        })
    }

    const newTeam = () => {
        setTeamId(null);
        setModalVisible(true);
    }

    const editTeam = (teamId) => {
        setTeamId(teamId);
        setModalVisible(true);
    }

    const removeTeam = (teamId) => {
        setLoading(true);
        reqwest({
            url: `http://localhost:8000/teams/${teamId}`,
            method: 'DELETE',
            type: 'json'
        }).then(() => {
            fetchTeams();
            message.error('Equipo borrado!');
        })
    }

    useEffect(() => {
        fetchTeams();
    }, [])

    return (
        <Row>
            <Col span={16} offset={4}>
                <PageHeader
                    title="RendaloMaq Engineering Team"
                    extra={[
                      <Button type="primary" onClick={newTeam}>Nuevo equipo</Button>
                    ]}
                >
                    <TeamList
                        loading={loading}
                        teams={teams}
                        editTeam={editTeam}
                        removeTeam={removeTeam}
                    />
                </PageHeader>
            </Col>
            <TeamModal
                teamId={teamId}
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
                refetch={fetchTeams}
            />
        </Row>
    );
}

export default App;
