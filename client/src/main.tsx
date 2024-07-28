import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { NextUIProvider } from "@nextui-org/react";
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <NextUIProvider>
    <RecoilRoot>
      <App/>
    </RecoilRoot>
    </NextUIProvider>,
)