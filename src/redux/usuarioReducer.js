import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultarUsuario, excluirUsuario } from "../servicos/servicoUsuario";
import ESTADO from "./estados";

// Thunk para buscar usuários
export const buscarUsuarios = createAsyncThunk('usuario/consultar', async () => {
    try {
        const resultado = await consultarUsuario();
    console.log("Resultado da consulta de usuários:", resultado);
    if (Array.isArray(resultado)) {
        return {
            status: true,
            mensagem: "Usuários recuperados com sucesso",
            listaDeUsuarios: resultado,
        };
    } else {
        return {
            status: false,
            mensagem: "Erro ao recuperar os usuários do backend.",
            listaDeUsuarios: [],
        };
    }
    } catch (erro) {
        return {
            status: false,
            mensagem: `Erro: ${erro.message}`,
            listaDeUsuarios: [],
        };
    }
});

// Thunk para apagar um usuário
export const apagarUsuario = createAsyncThunk('usuario/apagarUsuario', async (usuario) => {
    try {
        const resultado = await excluirUsuario(usuario);
        return {
            status: resultado.status,
            mensagem: resultado.mensagem,
            id: usuario.id, // Devolvendo o ID do usuário para facilitar a remoção
        };
    } catch (erro) {
        return {
            status: false,
            mensagem: `Erro: ${erro.message}`,
        };
    }
});

// Slice do Redux para gerenciar o estado dos usuários
const usuarioReducer = createSlice({
    name: 'usuario',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeUsuarios: [],
    },
    reducers: {}, // Sem reducers síncronos neste caso
    extraReducers: (builder) => {
        builder
            // Buscar usuários
            .addCase(buscarUsuarios.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (buscando usuários)";
            })
            .addCase(buscarUsuarios.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeUsuarios = action.payload.listaDeUsuarios;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeUsuarios = []; // Limpa a lista em caso de erro
                }
            })
            .addCase(buscarUsuarios.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error.message || "Erro ao buscar usuários";
                state.listaDeUsuarios = []; // Limpa a lista em caso de falha
            })
            // Apagar usuário
            .addCase(apagarUsuario.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando exclusão do usuário";
            })
            .addCase(apagarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    // Remove o usuário da lista usando o ID retornado no payload
                    state.listaDeUsuarios = state.listaDeUsuarios.filter(
                        (usuario) => usuario.id !== action.payload.id
                    );
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(apagarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error.message || "Erro ao excluir usuário";
            });
    },
});

export default usuarioReducer.reducer;
