// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { Routes, Route } from 'react-router-dom'
import Main from './views/Main'
import Create from './views/Create'
import Update from './views/Update'

function App() {
  return (
    <div className="container mt-5">
      <Routes>
        <Route element={<Main />} path="/" />
        <Route element={<Create />} path="/author/new" />
        <Route element={<Update />} path="/author/edit/:id" />
      </Routes>
    </div>
  )
}

export default App
