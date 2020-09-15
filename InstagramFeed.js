import React from "react"
import axios from "axios"

class InstagramFeed extends React.Component {
    state = {
        all_photos: [],
        displayed_photos: [],
        // Assume there are photos not yet displayed by default.
        additional_photos: true,
        num_photos_displayed: // Set desired number of photos to be displayed upon page load,
    }

    constructor(props) {
        super(props)

        this.retrievePhotos()

        this.retrievePhotos = this.retrievePhotos.bind(this)
        this.handleShowMore = this.handleShowMore.bind(this)
    }

    static number_of_new_photos_to_display = /*INSERT NUMBER OF PHOTOS TO BE LOADED ON EACH RE-RENDER*/ 

    // Life cycle functions below enact an auto-render feature to pull in additional photos once
    // the bottom of the currently displayed feed is reached. One day I'll rewrite this with hooks...
    componentWillMount(){
        window.addEventListener('scroll', this.handleShowMore);
    }
    
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleShowMore);
    }

    // Request media data from Instagram API and store in state
    retrievePhotos() {
        // Feel free to add or remove as you need. More information at https://developers.facebook.com/docs/instagram-basic-display-api/reference/media
        const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username"
        // DO NOT store these values in your React App at deployment or they will be publicly visibile in dev tools. 
        // Recommended to move the entire API call to the backend of your app for best security practice.
        let user_id = /*INSERT INSTAGRAM USER ID HERE*/
        let token = /*INSERT INSTAGRAM API ACCESS TOKEN HERE*/
        // Maximum number of photos to be requested in the API call
        let photo_limit = /*INSERT DESIRED NUMBER OF PHOTOS TO BE FETCHED HERE*/

        axios.get(`https://graph.instagram.com/${user_id}/media?fields=${fields}&access_token=${token}&limit=${photo_limit}`)
        .then(res => {
            this.setState({ 
                all_photos: res.data.data,
                displayed_photos: Object.values(res.data.data).slice(0, this.state.num_photos_displayed),
                num_photos_displayed: this.state.num_photos_displayed + InstagramFeed.number_of_new_photos_to_display
            });
            this.checkForAdditionalPhotos()
        })
        .catch(err => {
            console.log(err)
        })
    }

    checkForAdditionalPhotos() {
        if (this.state.num_photos_displayed < this.state.all_photos.length) {
            this.setState({ additional_photos: true })
        } else {
            this.setState({ additional_photos: false })  
        }
    }

    handleShowMore() {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.scrollingElement.scrollHeight) {
            this.setState({ 
                displayed_photos: Object.values(this.state.all_photos).slice(0, this.state.num_photos_displayed),
                num_photos_displayed: this.state.num_photos_displayed + InstagramFeed.number_of_new_photos_to_display 
            })
            this.checkForAdditionalPhotos()
        }
    }

    render() {
        return(
            // This is your template. Edit in order to display as desired.
            <div id="instafeed">
                { this.state.displayed_photos.map((photo, index) => {
                    return(
                        <div 
                            className="col-xs-12 col-sm-6 col-md-4 col-lg-3" 
                            key={photo.timestamp}
                        >
                            <a href={photo.permalink}>
                                <div className="photo-box">
                                    <div className="image-wrap">
                                        <img 
                                            src={photo.media_type === "VIDEO"
                                                ? photo.thumbnail_url
                                                : photo.media_url
                                            } 
                                            alt={photo.caption} 
                                        />
                                    </div>
                                </div>
                            </a>
                        </div>
                    )
                })}
            </div>
        )
    }
  }

  export default InstagramFeed