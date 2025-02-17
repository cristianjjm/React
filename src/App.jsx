import { Route, Routes } from 'react-router-dom'
import './App.css'
import MenuAppBar from './components/MenuAppBar'
import { ImagePage } from './Pages/ImagePage'
import { ComponentsPage } from './Pages/ComponentsPage'
import { TaskPage } from './Pages/TaskPage'
import { LoginPage } from './Pages/LoginPage'
import { LoginProvider } from './context/LoginProvider'
import { ThemeProvider } from './context/ThemeContext'
import { InformesPage } from './Pages/InformesPage'


function App() {
  return (
    <>
    <h1>Callao lacra</h1>
      <ThemeProvider>
        <LoginProvider>
          <MenuAppBar/>
            <Routes>
              <Route path='/Images' element = {<ImagePage/>}></Route>    
              <Route path='/Components' element = {<ComponentsPage/>}></Route>
              <Route path='/Tareas' element = {<TaskPage/>}></Route> 
              <Route path='/Login' element = {<LoginPage/>}></Route>
              <Route path='/Informes' element = {<InformesPage/>}></Route>
              <Route path='/*' element = {<ImagePage/>}></Route>               
            </Routes>
        </LoginProvider>
      </ThemeProvider>
    </>
  )
}

export default App
