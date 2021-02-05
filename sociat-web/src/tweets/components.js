import React, {useState, useEffect} from 'react';

import {loadTweets} from '../lookup'


export function TweetComponent(props) {
  const textAreaRef = React.createRef()
  const [newTweets, setNewTweets] = useState([])
  const handleSubmit = (event) => {
    event.preventDefault()
    const newValue = textAreaRef.current.value
    console.log(newValue)


    // Look at the "future-upgrades" Num1 syntax to make it easier to write
    let tempNewTWeets = [...newTweets]
    tempNewTWeets.unshift({
      content: newValue,
      likes: 0,
      id: Math.floor(Math.random() * (500 - 1) + 1)
    })
    setNewTweets(tempNewTWeets)


    textAreaRef.current.value = ''
  }
  return <div className={props.className}>
            <div className='col-12 mb-3'>
              <form onSubmit={handleSubmit}>
                  <textarea ref={textAreaRef} required={true}className='form-control' name='tweet'>
                  </textarea>
                  <button tyoe='submit' className='btn btn-primary my-3'>Post</button>

              </form>
            </div>
          <TweetList newTweets={newTweets} /> 
          </div>
}


export function TweetList(props) {
    const [tweetsInit, setTweetsInit] = useState([]);
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
      const finalListTweets = [...props.newTweets].concat(tweetsInit)
      if (finalListTweets.length > tweets.length) {
        setTweets(finalListTweets);
      }
    }, [props.newTweets, tweets, tweetsInit])

    useEffect(() => {
      const myCallback = (response, status) => {
        if (status === 200) {
          setTweetsInit(response)
        } else {
          alert('There was an error.')
        }
      }
      loadTweets(myCallback)
    }, [tweetsInit])
    
    return tweets.map((item, index) => {
      return <Tweet tweet={item} className='my-5 py-5 border bg-white text-dark' key={`${index} - ${item}`}/>
    })
  }


export function ActionBtn(props) {
    const {tweet, action} = props
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
    const [userLike, setUserLike] = useState(tweet.userLike === true ? true : false)
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    const handleClick = (event) => {
        event.preventDefault()
        if (action.type === 'like') {
            if (userLike === false) {
                setLikes(likes + 1)
                setUserLike(true)
            } else {
                setLikes(likes - 1)
                setUserLike(false)
            }
        }
    }
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay
    return <button className={className} onClick={handleClick}>{display}</button>
}

  
export function Tweet(props) {
  const {tweet} = props
  const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
  return <div className={className}>
      <p>
      {tweet.id} - {tweet.content}
      </p>
      <div className='btn btn-group'>
      <ActionBtn tweet={tweet} action={{type: 'like', display:'Likes'}}/>
      <ActionBtn tweet={tweet} action={{type: 'unlike', display: 'Unlikes'}}/>
      <ActionBtn tweet={tweet} action={{type: 'retweet', display: 'Retweet'}}/>
      </div>
  </div>
}
  