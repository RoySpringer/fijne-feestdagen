import React, { Component } from 'react';
import './App.scss';
import Image from './component/Image' 
import Loader from './component/Loader';
import Polaroid from './component/Polaroid';
// import anise from './img/xmas_assets/hejho_mockup_anise.png';
// import silverPearl from './img/xmas_assets/hejho_mockup_bauble-silver_pearl.png';
// import silverGlitter from './img/xmas_assets/hejho_mockup_bauble-silver-glitter.png';
// import vertical from './img/xmas_assets/hejho_mockup_bouble-vertical.png';
// import stars from './img/xmas_assets/hejho_mockup_bouble-with-stars.png';
// import candy from './img/xmas_assets/hejho_mockup_candy.png';
// import card1 from './img/xmas_assets/hejho_mockup_card1.png';
// import card2 from './img/xmas_assets/hejho_mockup_card2.png';
// import circle from './img/xmas_assets/hejho_mockup_chain-circle.png';
// import clip from './img/xmas_assets/hejho_mockup_clip.png';
// import cloves from './img/xmas_assets/hejho_mockup_cloves.png';
// import cones1 from './img/xmas_assets/hejho_mockup_cones1.png';
// import cones2 from './img/xmas_assets/hejho_mockup_cones2.png';
// import heart from './img/xmas_assets/hejho_mockup_cookie-heart.png';
// import star from './img/xmas_assets/hejho_mockup_decoration-star.png';
// import star2 from './img/xmas_assets/hejho_mockup_decoration-star2.png';
// import decoration1 from './img/xmas_assets/hejho_mockup_decoration1.png';
// import decoration2 from './img/xmas_assets/hejho_mockup_decoration2.png';
// import gift1 from './img/xmas_assets/hejho_mockup_gift1.png';
// import gift2 from './img/xmas_assets/hejho_mockup_gift2.png';
// import light from './img/xmas_assets/hejho_mockup_light.png';
// import nutcracer from './img/xmas_assets/hejho_mockup_nutcracer.png';
// import nuts1 from './img/xmas_assets/hejho_mockup_nuts1.png';
// import nuts2 from './img/xmas_assets/hejho_mockup_nuts2.png';
// import plate from './img/xmas_assets/hejho_mockup_plate.png';
// import stars2 from './img/xmas_assets/hejho_mockup_stars.png';
// import twigPine from './img/xmas_assets/hejho_mockup_twig-pine.png';
// import twigThuja from './img/xmas_assets/hejho_mockup_twig-thuja.png';
// import twig1 from './img/xmas_assets/hejho_mockup_twig1.png';
// import twig2 from './img/xmas_assets/hejho_mockup_twig2.png';
// import red from './img/xmas_assets/hejho_mockup_twine-red.png';
// import twine from './img/xmas_assets/hejho_mockup_twine.png';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.sources = [];
    this.imagesToLoad = 0;
    this.imagesLoaded = 0;
    let rotation = ((Math.random() * 60) - 30);
    this.state = {
      start: "Lieve",
      name: "Test & test",
      wishes: "Fijne Kerstdagen",
      end: "Roy & Priscilla",
      theme: "christmas",
      loader: true,
      textStyle1: {
        zIndex: 1,
        opacity: 0,
        transform: "rotate(" + rotation + "deg) translateY(100px)",
        transition: "all 2s ease"
      },
      textStyle2: {
        zIndex: 1,
        opacity: 0,
        transform: "rotate(" + rotation + "deg) translateY(100px)",
        transition: "all 2s ease 0.5s"
      },
      textStyle3: {
        zIndex: 1,
        opacity: 0,
        transform: "rotate(" + rotation + "deg) translateY(100px)",
        transition: "all 2s ease 1s"
      }
    }

    this.onCardComplete = this.onCardComplete.bind(this);
    
    this.textElementTop = null;
    this.textElementMiddel = null;
    this.textElementBottom = null;
  }

  parseNames() {
    let url = new URL(window.location.href);
    let urlNames = url.pathname.substring(1, url.pathname.length);
    let names = decodeURI(urlNames);
    this.setState({
      name: names
    })
  }
  
  /**************************************/
  /* Component lifecicle methods
  /**************************************/
  componentDidMount() {
    this.parseNames();
  }

  /**************************************/
  /* Eventhandlers
  /**************************************/
  onCardComplete() {
    let regEx = /[+-]?([0-9]*[.])?[0-9]+(?=deg)/gi;
    let currentDeg = this.state.textStyle1.transform.match(regEx);
    let style = {
      ...this.state.textStyle1
    }
    style.transform = "rotate(" + currentDeg + "deg) translateY(0px)";
    style.opacity = 1;
    let style2 = {
      ...style
    }
    style2.transition += " 0.75s";
    let style3 = {
      ...style
    }
    style3.transition += " 1.25s";
    this.setState({
      textStyle1: style,
      textStyle2: style2,
      textStyle3: style3,
    });
  }

  /**************************************/
  /* Renderer
  /**************************************/
  render() {
    let twigPineStyle = {
      top: -150,
      right: -10,
      transform: "rotate(" + ((Math.random() * 40) + 280) + "deg)"
    }
    let twigThujaStyle = {
      top: 30,
      right: -150,
      transform: "rotate(" + (0 - (Math.random() * 80)) + "deg)"
    }
    let silverPearlStyle = {
      top: -30,
      right: 50,
      transform: "rotate(" + ((Math.random() * 80) - 40) + "deg)"
    }
    let silverGlitterStyle = {
      top: -30,
      right: -50,
      transform: "rotate(" + ((Math.random() * 60) - 30) + "deg)"
    }
    let decoration2Style = {
      bottom: -70,
      left: -60,
      transform: "rotate(" + ((Math.random() * 60) - 30) + "deg)"
    }
    let cones2Style = {
      bottom: -70,
      left: window.innerWidth / 3,
      transform: "rotate(" + ((Math.random() * 10) - 15) + "deg)"
    }

    let gift2Style = { 
      bottom: -150,
      right: -50,
      transform: "rotate(" + ((Math.random() * 90) - 45) + "deg)" 
    }

    let cardStyle = {
      left: '50%',
      top: '50%',
      transform: 'translateX(-48%) translateY(-50%)'
    }

    return (
      <div>
        
        <div className="App">
          <div className="layer-2">
            <div className="App-header">
              <div className="cardContainer">
                {this.state.loader ? <Loader onComplete={() => this.setState({loader: false})}/> : null}
                <Image image={require( './img/xmas_assets/hejho_mockup_card2.png')} className="card" alt="" flyIn="top" style={cardStyle} onComplete={this.onCardComplete}></Image>
                <p ref={p => this.textElementTop = p} className="animate-delay-1" style={this.state.textStyle1}>
                  <span className={this.state.theme + "-between"}>{this.state.name !== "" && this.state.start + " " + this.state.name + ","}</span>
                </p>
                <p ref={p => this.textElementMiddel = p} className="animate-delay-2" style={this.state.textStyle2}>
                  <span className={this.state.theme + "-wishes"}>{this.state.wishes}</span><br></br><br></br>
                </p>
                <p ref={p => this.textElementBottom = p} className="animate-delay-3" style={this.state.textStyle3}>
                  <span className={this.state.theme + "-names"}>{this.state.end}</span> 
                </p>
              </div>
            </div>
          </div>
          <div className="layer-1">
            <div className="groupTopLeft">
              <Polaroid image={require('./img/foto-dash.jpg')} 
                styleFrom={{width: "30vw", height: 'auto', transform: 'translate(-300%, 200%) rotate(80deg) scale(2)'}} 
                styleTo={{}}/>
            </div>
            <div className="groupTopRight">
              <Image image={require('./img/xmas_assets/hejho_mockup_twig-pine.png')} className="large" alt="" style={twigPineStyle} flyIn="right"></Image>
              <Image image={require('./img/xmas_assets/hejho_mockup_twig-thuja.png')} className="large" alt="" style={twigThujaStyle} flyIn="right"></Image>
              <Image image={require('./img/xmas_assets/hejho_mockup_bauble-silver_pearl.png')} className="small" alt="" style={silverPearlStyle} flyIn="topRight"></Image>
              <Image image={require('./img/xmas_assets/hejho_mockup_bauble-silver-glitter.png')} className="small" alt="" style={silverGlitterStyle} flyIn="right"></Image>
            </div>
            <div className="groupBottomLeft">
              <Image image={require('./img/xmas_assets/hejho_mockup_decoration2.png')} className="large" alt="" style={decoration2Style} flyIn="bottomLeft"></Image>
              <Image image={require('./img/xmas_assets/hejho_mockup_cones2.png')} className="small" alt="" style={cones2Style} flyIn="bottomLeft"></Image>
            </div>
            <div className="groupBottomRight">
              <Image image={require('./img/xmas_assets/hejho_mockup_gift2.png')} className="xlarge" alt="" style={gift2Style} flyIn="bottomRight"></Image>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

