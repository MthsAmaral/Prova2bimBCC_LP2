import { Alert } from "react-bootstrap";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaUsuarios from "./Tabelas/TabelaUsuarios.jsx";
import FormCadUsuarios from "./Formularios/FormCadUsuarios.jsx";

export default function TelaCadastroUsuario(props) {
    const [exibirTabela, setExibirTabela] = useState(true); // Começa exibindo a tabela
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        id: "",
        nickname: "",
        urlAvatar: "",
        dataIngresso: new Date().toISOString().split('T')[0], // data atual
        senha: "",
    });

    return (
        <div>
            <Pagina>
                <Alert className="mt-2 mb-2 success text-center" variant="success">
                    <h2>Cadastro de Usuário</h2>
                </Alert>
                {exibirTabela ? (
                    <TabelaUsuarios
                        setExibirTabela={setExibirTabela} // Permite alternar para a tabela
                        setModoEdicao={setModoEdicao}
                        setUsuarioSelecionado={setUsuarioSelecionado}
                    />
                ) : (
                    <FormCadUsuarios
                        setExibirTabela={setExibirTabela} // Permite alternar para a tabela após o cadastro
                        usuarioSelecionado={usuarioSelecionado}
                        setUsuarioSelecionado={setUsuarioSelecionado}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                    />
                )}
            </Pagina>
        </div>
    );
}
