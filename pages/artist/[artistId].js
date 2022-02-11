import Artist from "../../components/artist"
import { useRouter } from 'next/router'
import Layout from "../../components/layout";
import PrivateRoute from "../../components/privateroute";

export default function ArtistPage() {
    const router = useRouter();
    const {artistId} = router.query;
    return (
      <PrivateRoute>
        <Layout activePage="artist">
          <Artist artistId={artistId}/>
        </Layout>
      </PrivateRoute>
  )
}
