import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Movie.css';
import LinesEllipsis from 'react-lines-ellipsis'
//이전에는 리엑트에 propTypes가 같이 있으나 이제는 같이 설치되지 않음.
//이에 yarn npm등으로 설치하고 임포트 해줘야함.
// class Movie extends Component {

//     static propTypes = {
//         title: PropTypes.string.isRequired,
//         // isRequired를 지정하면 데이터가 있는지 확인해줌.
//         // 이럴떄 유용 -- API통해 정보흫 불러올때 유저이름이라면 string 이며 required여야 함.
//         poster: PropTypes.string
//     }


    

//     render() {
   
//         return (
//             <div>
//                 <Poster poster={this.props.poster} />
//                 <p>{this.props.title}</p>
//             </div>
//         );
//     }
// }


function Movie ({title,poster,genres,synopsis}) {
    return(
        <fragment>
            <div className="Movie">
                <div className="Movie__Columns Movie__Poster">
                    <Poster poster={poster} />
                </div>
                <div clssName="Movie__Columns">
                    <h2 className="Movie__Title">{title}</h2>
                </div>
                <div className="Movie__Columns Movie__Genres">
                    {genres.map((genres,index) => <MovieGenres genres={genres} key={index} />)}
                </div>
                <p className="Movie__Columns Movie__Synopsis">
                    <LinesEllipsis
                        text={synopsis}
                        maxLine='3'
                        ellipsis='...'
                        trimRight
                        baseOn='letters'
                    />
                </p>
            </div>
        </fragment>
    )
}

function MovieGenres ({genres}) {
    return (
        <span>{genres} </span>
    )
}

Movie.propTypes = {
    title: PropTypes.string.isRequired
}

MovieGenres.propTypes = {
    genres: PropTypes.string.isRequired
}


class Poster extends Component {
    static propTypes = {
        poster: PropTypes.string.isRequired
    }
    render() {
        return (
            <img src={this.props.poster} alt="img"/>
        );
    }
}

// function MoviePoster({poster}){

//     return(
//         <img src={poster} alt="Movie Poster"/>
//     )
// }
// 그저 보이기만 하는 컴포넌트라면 해당처럼 작성이 가능
//poster  앞에 this.props. 붙이지 않아도된디.
// 해당은 리턴을 하기위해 사용되며 state, 렌더, 라이프 사이클도 없음.

//해당은 아래와 같이 propType를 사용 가능.

// MoviePoster.propTypes = {
//     poster : PropTypes.string.isRequired
// }

export default Movie;

