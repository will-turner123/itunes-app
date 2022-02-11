import Searchbar from "../../components/search"
import Layout from "../../components/layout";
import PrivateRoute from "../../components/privateroute";

export default function SearchPage() {
    return (
        <PrivateRoute>
            <Layout activePage="search">
                <Searchbar/>
            </Layout>
        </PrivateRoute>
  )
}
