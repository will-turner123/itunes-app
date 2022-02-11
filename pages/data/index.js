import Charts from '../../components/charts';
import Layout from "../../components/layout";
import PrivateRoute from '../../components/privateroute';

export default function DataPage() {
    return (
        <PrivateRoute>
            <Layout activePage="data">
                <Charts/>
            </Layout>
        </PrivateRoute>
  )
}
