import Library from '../components/library';
import Layout from "../components/layout";
import PrivateRoute from '../components/privateroute';

export default function LibraryPage() {
    return (
        <PrivateRoute>
            <Layout activePage="">
                <Library/>
            </Layout>
        </PrivateRoute>
  )
}
