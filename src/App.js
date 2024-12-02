import React, { createContext } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import TelaCadastroUsuario from "./componentes/Telas/TelaCadastroUsuario";
import TelaMenu from "./componentes/Telas/TelaMenu";
import Tela404 from "./componentes/Telas/Tela404";
import store from './redux/store';

// Contexto para o usuário
export const ContextoUsuario = createContext();

function App() {
  const usuario = {
    usuario: "",
    logado: true, // Mantém como logado por padrão
  };

  return (
    <div className="App">
      <Provider store={store}>
        <ContextoUsuario.Provider value={{ usuario }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TelaMenu />} />
              <Route path="/usuario" element={<TelaCadastroUsuario />} />
              <Route path="*" element={<Tela404 />} />
            </Routes>
          </BrowserRouter>
        </ContextoUsuario.Provider>
      </Provider>
    </div>
  );
}

export default App;
