import Album from "../../components/album"
import { useRouter } from 'next/router'
import Layout from "../../components/layout";
import PrivateRoute from "../../components/privateroute";

export default function ArtistPage() {
    const router = useRouter();
    const {albumId} = router.query;
    return (
      <PrivateRoute>
        <Layout activePage="search">
          <Album albumId={albumId}/>
        </Layout>
      </PrivateRoute>

  )
}
