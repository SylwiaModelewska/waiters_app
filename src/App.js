import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';
import { TablePage } from './components/pages/TablePage';
import { NotFound } from './components/pages/NotFound';
import { Container } from 'react-bootstrap';
import { Header } from './components/views/Header';
import { Footer } from './components/views/Footer';
import { fetchTables } from './redux/tablesRedux';
import { fetchStatuses } from './redux/statusRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);
  useEffect(() => dispatch(fetchStatuses()), [dispatch]);

  return (
    <Container>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/table/:id" element={<TablePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </Container>
  );
};

export default App;