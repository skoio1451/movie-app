import React, { Component } from 'react';
import './App.css';
import Movie from './Movie.js';




class App extends Component {
    state = {}
    //state를 변경하면 render가 다시 작동한다.

    // componentDidMount() {
    //     setTimeout(() => {
    //         this.setState({
    //         // 직접적으로 greeting 을 건드는것이 아닌 setState 를 통해 접근해야함.
    //             greeting: 'hello Again!'
    //         })
    //     },5000)
    // }
    
    // componentDidMount() {
    //     // setTimeout(function(){
    //     //     console.log('hello');
    //     // },2000 )
    //     // 옛날 자바스크립트
    //     setTimeout(() => {
    //     //시간이 지나가는 구문
    //     //   this.setState({
    //     //       movies: [
    //     //           ...this.state.movies,
    //     //           //...은 비구조화 할당
    //     //           //해당 구문이 없으면 기존의 것이 아래의 것으로 대체된다.
    //     //           //해당구문으로 인해 기존의 것에 새것이 추가됨.
    //     //           {
    //     //               title: "raputa",
    //     //               poster: "https://upload.wikimedia.org/wikipedia/ko/c/c1/Laputa_Castle_in_the_Sky.jpg"
    //     //           }
    //     //       ]
    //     //   })


    //     this.setState({
    //         //state는 바로 접근하면 안되고 해당처럼 this.setState로 접근해야 한다.
    //         movies: [
    //             // ...this.state.movies
    //             // 해당 구문을 사용하면 기존에 선언된 해당 배열을 가지고 오고 추가한다.
    //             // 응용하면 infinite scroll이 가능
    //             // 해당구문을 배열 아래에 놓으면 새로 추가되는것이 상단으로 나옴.
    //             {
    //                 "title":"이웃집 토토로",
    //                 "poster": "https://upload.wikimedia.org/wikipedia/en/0/02/My_Neighbor_Totoro_-_Tonari_no_Totoro_%28Movie_Poster%29.jpg"
    //             },
    //             {
    //                 "title": "아리에티",
    //                 "poster": "https://upload.wikimedia.org/wikipedia/en/e/e7/Karigurashi_no_Arrietty_poster.png"
    //             },
    //             {
    //                 "title": "센과 치히로의 행방불명",
    //                 "poster": "https://upload.wikimedia.org/wikipedia/ko/b/bc/센과_치히로의_행방불명_포스터.jpg"
    //             },
    //             {
    //                 "title": "원령공주",
    //                 "poster": "https://upload.wikimedia.org/wikipedia/ko/7/77/Mononokehime.jpg"
    //             },
    //             {
    //                 "title": "하울의 움직이는 성",
    //                 "poster" : "https://upload.wikimedia.org/wikipedia/en/a/a0/Howls-moving-castleposter.jpg"
    //             }
    //         ]
    //     })

    //     },2000) 
    // }

    componentDidMount() {
     this._getMovies();
    }
    
    _renderMovies = () => {
        const movies = this.state.movies.map(movie => {
            console.log(movie)
            return <Movie 
            title={movie.title} 
            poster={movie.medium_cover_image} 
            genres={movie.genres} 
            synopsis={movie.synopsis}
            key={movie.id} />
        })
        return movies
        
    }
    //해당 구문은 movies라는 variable에 데이터를 저장한것.
    //언더스코어로 사용하는 이유는 리엑트안에 수많은 자체 펑션이 존재하기 떄문에 구분을 위해 붙임


    _getMovies = async () => {
        const movies = await this._callApi()
        // await는 _callApi() 기능이 끝나는것을 확인하고 실행한다.
        this.setState({
            movies
        })
    }

    _callApi = () => {
        return fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
        //컴포넌트가 마운트할때 해당경로의 것을 fetch(끌어옴)
        .then(response => response.json())
        .then(json => json.data.movies)
        //return 구문은 화살표가 포함되어있어서 사용하지 않음
        .catch(err => console.log(err))
        //에러를 잡아 콘솔에 찍어라.
    }

    



  render() {
   
    // return (
    //   <div className="App">
    //     {/* {this.state.movies.map((movie, index)=>{
    //         return <Movie title={movie.title} poster={movie.poster} key={index} />
    //     })} */}

    //     {this.state.movies ? this._renderMovies() : 'Loading' }
    //     {/* 만약 movies varialble이 존재하지않으면 _renderMovies() 를 실행하고 아니면 로딩이라는 글자를 출력 */}
    //     {/*JSX 안에서 사용되는 javascript는 if문이 실행되지 않음.삼항연산자로 가능.*/}
    //   </div>
    // );
    const {movies} = this.state;
    return (
        <div className={movies ? "App" : "App-Loading" }>
        {/* 만약 movies가 있다면 클래스네임이 App, 아니면 App-Loading */}
        {movies ? this._renderMovies() : 'Loading...'}
        </div>
    )

  }
}

export default App;


//렌더 로직
// Render : componentWillMount() -> render() -> componentDidMount()
//업데이트 로직
// UPdate : componetWillReceiveProps() -> shouldComponentUpdate == true -- old props와 새로운 props가 다르면 업데이트 (참) 으로 업데이트 단계로 넘어감. 
//-> componentWillUpdate -> render()-> componentDidUpdate()
//리엑트는 컴포넌트안에 state가 바뀔때마다 render함