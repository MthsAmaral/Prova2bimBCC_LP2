import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { gravarUsuario } from '../../../servicos/servicoUsuario';

export default function FormCadUsuarios(props) {
    const [usuario, setUsuario] = useState(props.usuarioSelecionado || {
        id: "",
        nickname: "",
        urlAvatar: "",
        dataIngresso: new Date().toISOString().split('T')[0],
        senha: "",
    });
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                // Cadastro do usuário
                gravarUsuario(usuario).then((resultado) => {
                    if (resultado.status) {
                        props.setExibirTabela(true);
                        toast.success("Usuário cadastrado com sucesso!");
                    } else {
                        toast.error(resultado.mensagem);
                    }
                });
            } else {
                // Atualização do usuário
                props.setListaDeUsuarios(props.listaDeUsuarios.map((item) =>
                    item.id !== usuario.id ? item : usuario
                ));
                props.setModoEdicao(false);
                props.setUsuarioSelecionado(null);
                props.setExibirTabela(true);
            }
        } else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const { name, value } = evento.target;
        setUsuario({ ...usuario, [name]: value });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="id"
                        name="id"
                        value={usuario.id}
                        disabled={props.modoEdicao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o ID do usuário!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="6">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={usuario.nickname}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o nickname!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>URL do Avatar</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="urlAvatar"
                        name="urlAvatar"
                        value={usuario.urlAvatar}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe a URL do avatar!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Data de Ingresso</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        id="dataIngresso"
                        name="dataIngresso"
                        value={usuario.dataIngresso}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe a data de ingresso!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        id="senha"
                        name="senha"
                        value={usuario.senha}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe a senha!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mt-2 mb-2">
                <Col md={1}>
                    <Button type="submit">
                        {props.modoEdicao ? "Alterar" : "Confirmar"}
                    </Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => props.setExibirTabela(true)}>Voltar</Button>
                </Col>
            </Row>
            <Toaster position="top-right" />
        </Form>
    );
}
