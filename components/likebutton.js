import React, { useEffect, useState} from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/auth';


export default function LikeButton({song}) {
    const [liked, setLiked] = useState(false);


    const handleLike = () => {
        let userLikes = {}
        if("userLikes" in localStorage){
            userLikes = JSON.parse(localStorage.getItem("userLikes"));
        }

        // update in localStorage cache if exists
        const cachedAlbums = JSON.parse(localStorage.getItem("cachedAlbums"));
        if(song.collectionId in cachedAlbums){
            const artist = JSON.parse(localStorage.getItem(cachedAlbums[song.collectionId]));
            let albumIndex = undefined;
            artist.albums.every((album, index) => {
                if(album.collectionId === song.collectionId){
                    albumIndex = index;
                    return false
                }
            })
            if(albumIndex !== undefined){
                const songIndex = song.trackNumber-1;
                artist.albums[albumIndex]["songs"][songIndex]["liked"] = !liked;
                localStorage.setItem(song.artistId, JSON.stringify(artist));
            }
        }

        if(!liked){
            song.liked = true;
            userLikes[song.trackId] = song;
            setLiked(true);
        }
        else{
            song.liked = false;
            delete userLikes[song.trackId];
            setLiked(false);
        }

        const currentUser = firebase.auth().currentUser;
        if(currentUser){
            console.log(currentUser.uid, userLikes)
            firebase.firestore().collection('users').doc(currentUser.uid).update({
                likes: userLikes
            })
        }

        localStorage.setItem("userLikes", JSON.stringify(userLikes));
    }

    useEffect(() => {
        // this is most likely to occur during searches when song doesn't have a set liked attribute locally
        if(!("liked" in song)){
            if("userLikes" in localStorage){
                const userLikes = JSON.parse(localStorage.getItem("userLikes"));
                if(song.trackId in userLikes){
                    setLiked(true)
                }
            }
        }
        else if(song.liked) setLiked(true);
    }, [setLiked, song])

    return (
        <IconButton color="primary" onClick={handleLike}>
            {liked ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
        </IconButton>
    )


}
